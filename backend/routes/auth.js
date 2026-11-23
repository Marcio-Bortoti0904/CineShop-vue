const express = require('express')
const bcrypt = require('bcrypt')
const conexao = require('../db')
const { exigirLogin } = require('../middleware/auth')

const router = express.Router()

// foto_perfil é NOT NULL na tabela usuario: usamos uma imagem padrão no cadastro
const FOTO_PADRAO = '/imagem/avatar-padrao.png'

// Dados do usuário que podem ir para o frontend (nunca a senha)
function dadosPublicos(u) {
    return {
        id: u.id,
        nome: u.nome,
        email: u.email,
        tipo: u.tipo,
        foto: u.foto_perfil,
        role: u.tipo === 'VENDEDOR' ? 'seller' : 'user'
    }
}

// POST /api/auth/register  { nome, email, senha, role: 'user' | 'seller', nomeLoja?, telefone? }
router.post('/register', async (req, res) => {
    const { nome, email, senha, role, nomeLoja, telefone } = req.body
    if (!nome?.trim() || !email?.trim() || !senha) {
        return res.status(400).json({ mensagem: 'Informe nome, e-mail e senha.' })
    }
    if (senha.length < 6) {
        return res.status(400).json({ mensagem: 'A senha deve ter pelo menos 6 caracteres.' })
    }
    const tipo = role === 'seller' ? 'VENDEDOR' : 'COMUM'
    const emailLimpo = email.trim().toLowerCase()

    const con = await conexao.getConnection()
    try {
        await con.beginTransaction()
        const [existe] = await con.query('SELECT 1 FROM usuario WHERE email = ?', [emailLimpo])
        if (existe.length) {
            await con.rollback()
            return res.status(409).json({ mensagem: 'E-mail já cadastrado.' })
        }
        const hash = await bcrypt.hash(senha, 10)
        const [r] = await con.query(
            'INSERT INTO usuario (nome, email, senha_hash, foto_perfil, tipo) VALUES (?, ?, ?, ?, ?)',
            [nome.trim(), emailLimpo, hash, FOTO_PADRAO, tipo]
        )
        // Especialização: usuario_comum OU vendedor
        if (tipo === 'VENDEDOR') {
            await con.query('INSERT INTO vendedor (usuario_id, nome_loja, telefone) VALUES (?, ?, ?)',
                [r.insertId, nomeLoja?.trim() || `Loja de ${nome.trim()}`, telefone || null])
        } else {
            await con.query('INSERT INTO usuario_comum (usuario_id) VALUES (?)', [r.insertId])
        }
        // Cada usuário tem uma lista de favoritos (tabela favoritos, 1:1)
        await con.query('INSERT INTO favoritos (usuario_id) VALUES (?)', [r.insertId])
        await con.commit()

        req.session.usuario = { id: r.insertId, tipo }
        res.status(201).json(dadosPublicos({ id: r.insertId, nome: nome.trim(), email: emailLimpo, tipo, foto_perfil: FOTO_PADRAO }))
    } catch (erro) {
        await con.rollback()
        console.error(erro)
        res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.' })
    } finally {
        con.release()
    }
})

// POST /api/auth/login  { email, senha, lembrar? }
router.post('/login', async (req, res) => {
    const { email, senha, lembrar } = req.body
    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Informe e-mail e senha.' })
    }
    try {
        const [linhas] = await conexao.query('SELECT * FROM usuario WHERE email = ?', [email.trim().toLowerCase()])
        const u = linhas[0]
        // Mesma mensagem para e-mail inexistente e senha errada (não revela qual falhou)
        if (!u || !(await bcrypt.compare(senha, u.senha_hash))) {
            return res.status(401).json({ mensagem: 'E-mail ou senha inválidos.' })
        }
        req.session.usuario = { id: u.id, tipo: u.tipo }
        // Login automático (UC007): cookie persistente de 30 dias
        if (lembrar) req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
        res.json(dadosPublicos(u))
    } catch (erro) {
        console.error(erro)
        res.status(500).json({ mensagem: 'Erro ao fazer login.' })
    }
})

// GET /api/auth/me
router.get('/me', async (req, res) => {
    if (!req.session.usuario) return res.status(401).json({ mensagem: 'Não autenticado.' })
    try {
        const [linhas] = await conexao.query('SELECT * FROM usuario WHERE id = ?', [req.session.usuario.id])
        if (!linhas.length) return res.status(401).json({ mensagem: 'Não autenticado.' })
        res.json(dadosPublicos(linhas[0]))
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao carregar usuário.' })
    }
})

// POST /api/auth/logout
router.post('/logout', exigirLogin, (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.json({ mensagem: 'Sessão encerrada.' })
    })
})

module.exports = router