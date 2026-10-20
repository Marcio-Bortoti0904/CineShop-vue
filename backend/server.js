const express = require('express')
const cors = require('cors')
require('dotenv').config()

const conexao = require('./db')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API do CineShop funcionando!'
    })
})

app.get('/teste-banco', async (req, res) => {
    try {
        const [resultado] = await conexao.query(
            'SELECT DATABASE() AS banco'
        )

        res.json({
            mensagem: 'Conexão com o MySQL realizada!',
            banco: resultado[0].banco
        })
    } catch (erro) {
        console.error('Erro ao conectar ao MySQL:', erro.message)

        res.status(500).json({
            mensagem: 'Não foi possível conectar ao banco de dados.'
        })
    }
})

const porta = process.env.PORT || 3000

app.listen(porta, () => {
    console.log(`Servidor do CineShop rodando na porta ${porta}`)
})