import { ref, reactive } from 'vue'
import { api } from '../api.js'

// ===== ESTADO GLOBAL (compartilhado por todas as páginas) =====
export const usuario = ref(null)
export const sessaoCarregada = ref(false)

let promessaSessao = null

// A API devolve "nome"; as telas usam "name"
function normalizar(dados) {
  return dados ? { ...dados, name: dados.nome } : null
}

// Pergunta ao backend quem está logado (roda só uma vez)
export function carregarSessao() {
  if (!promessaSessao) {
    promessaSessao = api('/auth/me')
      .then((dados) => { usuario.value = normalizar(dados) })
      .catch(() => { usuario.value = null })
      .finally(() => { sessaoCarregada.value = true })
  }
  return promessaSessao
}

export function useAuth() {
  carregarSessao()

  // CONTROLE DO MODAL (de cada página)
  const modalAberto = ref(false)
  const modalTipo = ref('')

  // DADOS DO FORMULÁRIO (modo: 'entrar' ou 'cadastro')
  const loginDados = reactive({
    modo: 'entrar',
    nome: '',
    email: '',
    senha: '',
    role: 'user',
    lembrar: true
  })

  function abrirPerfilOuLogin() {
    modalTipo.value = usuario.value ? 'perfil' : 'login'
    modalAberto.value = true
  }

  async function entrar() {
    const cadastro = loginDados.modo === 'cadastro'

    if (cadastro && !loginDados.nome.trim()) {
      alert('Informe seu nome!')
      return
    }

    if (!loginDados.email.trim() || !loginDados.senha) {
      alert('Informe seu e-mail e senha!')
      return
    }

    try {
      const dados = cadastro
        ? await api('/auth/register', {
            method: 'POST',
            body: {
              nome: loginDados.nome,
              email: loginDados.email,
              senha: loginDados.senha,
              role: loginDados.role
            }
          })
        : await api('/auth/login', {
            method: 'POST',
            body: {
              email: loginDados.email,
              senha: loginDados.senha,
              lembrar: loginDados.lembrar
            }
          })

      usuario.value = normalizar(dados)
      loginDados.senha = ''
      fecharModal()
    } catch (erro) {
      alert(erro.message)
    }
  }

  async function sair() {
    try {
      await api('/auth/logout', { method: 'POST' })
    } catch {
      // mesmo com erro, limpa o estado local
    }
    usuario.value = null
    fecharModal()
  }

  function fecharModal() {
    modalAberto.value = false
    modalTipo.value = ''
  }

  return {
    usuario,
    modalAberto,
    modalTipo,
    loginDados,
    abrirPerfilOuLogin,
    entrar,
    sair,
    fecharModal
  }
}