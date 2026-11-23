const express = require('express')
const conexao = require('../db')
const { exigirLogin } = require('../middleware/auth')
const router = express.Router()
router.use(exigirLogin)

// Estrutura: favoritos (1 por usuário) -> favorito_produto / favorito_conteudo
const TIPOS = {
    conteudo: { tabela: 'favorito_conteudo', coluna: 'conteudo_id' },
    produto: { tabela: 'favorito_produto', coluna: 'produto_id' }
}

// Devolve o id da lista de favoritos do usuário (cria se ainda não existir)
async function idFavoritos(usuarioId) {
    const [l] = await conexao.query('SELECT id FROM favoritos WHERE usuario_id = ?', [usuarioId])
    if (l.length) return l[0].id
    const [r] = await conexao.query('INSERT INTO favoritos (usuario_id) VALUES (?)', [usuarioId])
    return r.insertId
}

// GET /api/favoritos  -> { conteudos: [ids], produtos: [ids] }
router.get('/', async (req, res) => {
    const fav = await idFavoritos(req.session.usuario.id)
    const [c] = await conexao.query('SELECT conteudo_id AS id FROM favorito_conteudo WHERE favoritos_id = ?', [fav])
    const [p] = await conexao.query('SELECT produto_id AS id FROM favorito_produto WHERE favoritos_id = ?', [fav])
    res.json({ conteudos: c.map(x => x.id), produtos: p.map(x => x.id) })
})

// PUT /api/favoritos/:tipo/:id  (tipo = conteudo | produto)
router.put('/:tipo/:id', async (req, res) => {
    const cfg = TIPOS[req.params.tipo]
    if (!cfg) return res.status(400).json({ mensagem: 'Tipo inválido (use conteudo ou produto).' })
    try {
        const fav = await idFavoritos(req.session.usuario.id)
        await conexao.query(`INSERT IGNORE INTO ${cfg.tabela} (favoritos_id, ${cfg.coluna}) VALUES (?, ?)`, [fav, req.params.id])
        res.status(201).json({ mensagem: 'Adicionado aos favoritos.' })
    } catch (e) {
        res.status(404).json({ mensagem: 'Item não encontrado.' })
    }
})

// DELETE /api/favoritos/:tipo/:id
router.delete('/:tipo/:id', async (req, res) => {
    const cfg = TIPOS[req.params.tipo]
    if (!cfg) return res.status(400).json({ mensagem: 'Tipo inválido (use conteudo ou produto).' })
    const fav = await idFavoritos(req.session.usuario.id)
    await conexao.query(`DELETE FROM ${cfg.tabela} WHERE favoritos_id = ? AND ${cfg.coluna} = ?`, [fav, req.params.id])
    res.json({ mensagem: 'Removido dos favoritos.' })
})

module.exports = router