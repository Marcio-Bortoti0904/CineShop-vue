const express = require('express')
const conexao = require('../db')
const { exigirComprador } = require('../middleware/auth')
const router = express.Router()
router.use(exigirComprador)

// O carrinho fica no frontend. Ao finalizar, o frontend envia os itens.
// Regra do banco: cada pedido pertence a UM vendedor, então o carrinho é
// dividido em um pedido por vendedor.
// POST /api/pedidos  { itens: [{ idProduto, quantidade }], descricao? }
router.post('/', async (req, res) => {
    const itensEnviados = Array.isArray(req.body.itens) ? req.body.itens : []
    if (!itensEnviados.length) return res.status(400).json({ mensagem: 'Carrinho vazio.' })

    // junta itens repetidos e valida quantidades
    const qtdPorProduto = new Map()
    for (const i of itensEnviados) {
        const id = Number(i.idProduto)
        const q = Number(i.quantidade)
        if (!Number.isInteger(id) || !Number.isInteger(q) || q < 1) {
            return res.status(400).json({ mensagem: 'Item de pedido inválido.' })
        }
        qtdPorProduto.set(id, (qtdPorProduto.get(id) || 0) + q)
    }

    const con = await conexao.getConnection()
    try {
        await con.beginTransaction()

        // lê e trava os produtos para evitar vender mais que o estoque
        const porVendedor = new Map()
        for (const [id, qtd] of qtdPorProduto) {
            const [p] = await con.query(
                'SELECT id, vendedor_id, nome, preco, desconto, estoque FROM produto WHERE id = ? FOR UPDATE', [id])
            if (!p.length) {
                await con.rollback()
                return res.status(404).json({ mensagem: `Produto ${id} não encontrado.` })
            }
            const prod = p[0]
            if (qtd > prod.estoque) {
                await con.rollback()
                return res.status(409).json({ mensagem: `Estoque insuficiente para "${prod.nome}".` })
            }
            prod.quantidade = qtd
            prod.precoFinal = Math.round(Number(prod.preco) * (1 - prod.desconto / 100) * 100) / 100
            if (!porVendedor.has(prod.vendedor_id)) porVendedor.set(prod.vendedor_id, [])
            porVendedor.get(prod.vendedor_id).push(prod)
        }

        const criados = []
        for (const [vendedorId, itens] of porVendedor) {
            const [ped] = await con.query(
                'INSERT INTO pedido (usuario_id, vendedor_id, descricao) VALUES (?, ?, ?)',
                [req.session.usuario.id, vendedorId, req.body.descricao || null])
            await con.query(
                "INSERT INTO historico_status_pedido (pedido_id, status, descricao) VALUES (?, 'PENDENTE', 'Pedido simulado criado')",
                [ped.insertId])
            let total = 0
            for (const i of itens) {
                await con.query(
                    `INSERT INTO item_pedido (pedido_id, produto_id, vendedor_id, quantidade, preco_unitario)
                     VALUES (?, ?, ?, ?, ?)`,
                    [ped.insertId, i.id, vendedorId, i.quantidade, i.precoFinal])
                await con.query('UPDATE produto SET estoque = estoque - ? WHERE id = ?', [i.quantidade, i.id])
                total += i.precoFinal * i.quantidade
            }
            criados.push({ idPedido: ped.insertId, vendedorId, total: Math.round(total * 100) / 100 })
        }

        await con.commit()
        res.status(201).json({ pedidos: criados })
    } catch (erro) {
        await con.rollback()
        console.error(erro)
        res.status(500).json({ mensagem: 'Erro ao finalizar o pedido.' })
    } finally {
        con.release()
    }
})

// GET /api/pedidos  - histórico do comprador, com o status mais recente
router.get('/', async (req, res) => {
    const [l] = await conexao.query(
        `SELECT pe.id, pe.data_pedido AS data, v.nome_loja AS loja,
                (SELECT h.status FROM historico_status_pedido h
                  WHERE h.pedido_id = pe.id ORDER BY h.data_status DESC, h.id DESC LIMIT 1) AS status,
                (SELECT SUM(ip.quantidade * ip.preco_unitario) FROM item_pedido ip WHERE ip.pedido_id = pe.id) AS total
         FROM pedido pe JOIN vendedor v ON v.usuario_id = pe.vendedor_id
         WHERE pe.usuario_id = ? ORDER BY pe.data_pedido DESC`, [req.session.usuario.id])
    res.json(l.map(p => ({ ...p, total: Number(p.total || 0) })))
})

module.exports = router