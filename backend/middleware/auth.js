// Middlewares de autenticação/autorização baseados em sessão
// tipo na sessão: 'COMUM' ou 'VENDEDOR' (igual à coluna usuario.tipo)
function exigirLogin(req, res, next) {
    if (!req.session.usuario) {
        return res.status(401).json({ mensagem: 'Faça login para continuar.' })
    }
    next()
}

function exigirVendedor(req, res, next) {
    if (!req.session.usuario || req.session.usuario.tipo !== 'VENDEDOR') {
        return res.status(403).json({ mensagem: 'Acesso restrito a vendedores.' })
    }
    next()
}

function exigirComprador(req, res, next) {
    if (!req.session.usuario || req.session.usuario.tipo !== 'COMUM') {
        return res.status(403).json({ mensagem: 'Acesso restrito a usuários comuns.' })
    }
    next()
}

module.exports = { exigirLogin, exigirVendedor, exigirComprador }
