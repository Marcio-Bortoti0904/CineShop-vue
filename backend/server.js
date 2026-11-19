const express = require('express')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()

const conexao = require('./db')
const app = express()

// CORS: frontend em outro endereço (Vite) enviando cookie de sessão
const origensPermitidas = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',')
app.use(cors({ origin: origensPermitidas, credentials: true }))
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET || 'troque-este-segredo-no-env',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' }
}))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/filmes', require('./routes/filmes'))
app.use('/api/produtos', require('./routes/produtos'))
app.use('/api/favoritos', require('./routes/favoritos'))
app.use('/api/carrinho', require('./routes/carrinho'))
app.use('/api/pedidos', require('./routes/pedidos'))
app.use('/api/vendedor', require('./routes/vendedor'))
app.use('/api/mensagens', require('./routes/mensagens'))

app.get('/', (req, res) => res.json({ mensagem: 'API do CineShop funcionando!' }))

app.get('/teste-banco', async (req, res) => {
    try {
        const [r] = await conexao.query('SELECT DATABASE() AS banco')
        res.json({ mensagem: 'Conexão com o MySQL realizada!', banco: r[0].banco })
    } catch (erro) {
        console.error('Erro ao conectar ao MySQL:', erro.message)
        res.status(500).json({ mensagem: 'Não foi possível conectar ao banco de dados.' })
    }
})

const porta = process.env.PORT || 3000
app.listen(porta, () => console.log(`Servidor do CineShop rodando na porta ${porta}`))