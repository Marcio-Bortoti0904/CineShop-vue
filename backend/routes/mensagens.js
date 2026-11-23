const express = require('express')
const conexao = require('../db')
const { exigirLogin } = require('../middleware/auth')
const router = express.Router()
router.use(exigirLogin)

// Procura o chat que tem exatamente estes dois participantes
async function acharChat(con, a, b) {
    const [l] = await con.query(
        `SELECT p1.chat_id FROM chat_participante p1
         JOIN chat_participante p2 ON p2.chat_id = p1.chat_id
         WHERE p1.usuario_id = ? AND p2.usuario_id = ? LIMIT 1`, [a, b])
    return l.length ? l[0].chat_id : null
}

// GET /api/mensagens/conversas  - interlocutores do usuário logado
router.get('/conversas', async (req, res) => {
    const [l] = await conexao.query(
        `SELECT u.id, u.nome, c.id AS chatId, c.data_ultima_atividade AS ultima
         FROM chat_participante eu
         JOIN chat c ON c.id = eu.chat_id
         JOIN chat_participante outro ON outro.chat_id = c.id AND outro.usuario_id <> eu.usuario_id
         JOIN usuario u ON u.id = outro.usuario_id
         WHERE eu.usuario_id = ? ORDER BY c.data_ultima_atividade DESC`, [req.session.usuario.id])
    res.json(l)
})

// GET /api/mensagens/:idOutro
router.get('/:idOutro', async (req, res) => {
    const chatId = await acharChat(conexao, req.session.usuario.id, req.params.idOutro)
    if (!chatId) return res.json([])
    const [l] = await conexao.query(
        `SELECT id, remetente_id AS de, conteudo AS texto, data_hora AS data
         FROM mensagem WHERE chat_id = ? ORDER BY data_hora, id`, [chatId])
    res.json(l)
})

// POST /api/mensagens/:idOutro  { texto }  (UC027) - conversa só entre comprador e vendedor
router.post('/:idOutro', async (req, res) => {
    const texto = (req.body.texto || '').trim()
    if (!texto) return res.status(400).json({ mensagem: 'Digite uma mensagem.' })
    const eu = req.session.usuario
    const idOutro = Number(req.params.idOutro)

    const [o] = await conexao.query('SELECT tipo FROM usuario WHERE id = ?', [idOutro])
    if (!o.length) return res.status(404).json({ mensagem: 'Destinatário não encontrado.' })
    if (o[0].tipo === eu.tipo) return res.status(400).json({ mensagem: 'O chat é entre comprador e vendedor.' })

    const con = await conexao.getConnection()
    try {
        await con.beginTransaction()
        let chatId = await acharChat(con, eu.id, idOutro)
        if (!chatId) {
            const [c] = await con.query('INSERT INTO chat () VALUES ()')
            chatId = c.insertId
            await con.query('INSERT INTO chat_participante (chat_id, usuario_id) VALUES (?, ?), (?, ?)',
                [chatId, eu.id, chatId, idOutro])
        }
        await con.query('INSERT INTO mensagem (chat_id, remetente_id, conteudo) VALUES (?, ?, ?)', [chatId, eu.id, texto])
        await con.query('UPDATE chat SET data_ultima_atividade = CURRENT_TIMESTAMP WHERE id = ?', [chatId])
        await con.commit()
        res.status(201).json({ mensagem: 'Enviada.', chatId })
    } catch (e) {
        await con.rollback()
        console.error(e)
        res.status(500).json({ mensagem: 'Erro ao enviar mensagem.' })
    } finally {
        con.release()
    }
})

module.exports = router