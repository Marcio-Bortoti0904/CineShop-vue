import { ref, reactive } from 'vue'

export function useAuth() {
  // USUÁRIO
  const usuario = ref(null)

  // CONTROLE DO MODAL
  const modalAberto = ref(false)
  const modalTipo = ref('')

  // DADOS DO LOGIN
  const loginDados = reactive({
    nome: '',
    email: '',
    senha: '',
    role: 'user'
  })

  // ABRIR LOGIN OU PERFIL
  function abrirPerfilOuLogin() {
    if (!usuario.value) {
      modalTipo.value = 'login'
    } else {
      modalTipo.value = 'perfil'
    }
    modalAberto.value = true
  }

  // RECEBER TENTATIVA DE LOGIN
  function entrar() {
    if (!loginDados.nome.trim()) {
      alert('Informe seu nome!')
      return
    }

    if (!loginDados.email.trim() || !loginDados.senha) {
      alert('Informe seu e-mail e senha!')
      return
    }

    alert('Formulário preenchido! Falta conectar ao servidor.')
  }

  // FECHAR MODAL
  function fecharModal() {
    modalAberto.value = false
    modalTipo.value = ''
  }

  // Retorna tudo para ser usado no arquivo .vue
  return {
    usuario,
    modalAberto,
    modalTipo,
    loginDados,
    abrirPerfilOuLogin,
    entrar,
    fecharModal
  }
}
