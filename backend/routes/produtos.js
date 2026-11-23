const express = require('express')
const conexao = require('../db')
const { exigirVendedor } = require('../middleware/auth')
const router = express.Router()
router.use(exigirVendedor)

// GET /api/vendedor/vendas  - relatório básico (V005); ignora pedidos cancelados
router.get('/vendas', async (req, res) => {
    const [porProduto] = await conexao.query(
        `SELECT p.id AS pid, p.nome,
                (SELECT cp.nome FROM produto_categoria pc
                   JOIN categoria_produto cp ON cp.id = pc.categoria_produto_id
                  WHERE pc.produto_id = p.id ORDER BY cp.nome LIMIT 1) AS cat,
                SUM(ip.quantidade) AS qty, SUM(ip.quantidade * ip.preco_unitario) AS v
         FROM item_pedido ip
         JOIN produto p ON p.id = ip.produto_id
         WHERE ip.vendedor_id = ?
           AND NOT EXISTS (SELECT 1 FROM historico_status_pedido h
                            WHERE h.pedido_id = ip.pedido_id AND h.status = 'CANCELADO')
         GROUP BY p.id, p.nome ORDER BY v DESC`, [req.session.usuario.id])
    const dados = porProduto.map(x => ({ ...x, qty: Number(x.qty), v: Number(x.v) }))
    res.json({
        porProduto: dados,
        totalUnidades: dados.reduce((s, x) => s + x.qty, 0),
        totalValor: dados.reduce((s, x) => s + x.v, 0)
    })
})

module.exports = router
