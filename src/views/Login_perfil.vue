<template v-else-if="modalTipo === 'login'">
          <h3>LOGIN</h3>

          <div class="f">
            <label>NOME</label>
            <input v-model="loginDados.nome" placeholder="Seu nome">
          </div>

          <div class="f">
            <label>E-MAIL</label>
            <input
              v-model="loginDados.email"
              type="email"
              placeholder="voce@email.com"
            >
          </div>

          <div class="f">
            <label>SENHA</label>
            <input
              v-model="loginDados.senha"
              type="password"
              placeholder="••••••"
            >
          </div>

          <div class="f">
            <label>VOCÊ QUER SER:</label>

            <div class="opt">
              <button
                class="btn"
                :class="{ sel: loginDados.role === 'user' }"
                @click="loginDados.role = 'user'"
              >
                👤 USUÁRIO
              </button>

              <button
                class="btn"
                :class="{ sel: loginDados.role === 'seller' }"
                @click="loginDados.role = 'seller'"
              >
                🏪 VENDEDOR
              </button>
            </div>
          </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'

// COMPONENTES
import { usuario } from '../data/usuario.js'

// CONTROLE DOS MODAIS
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

// REALIZAR LOGIN
function entrar() {

  if (!loginDados.nome.trim()) {
    alert('Informe seu nome!')
    return
  }

  usuario.value = {
    name: loginDados.nome.trim(),
    role: loginDados.role
  }

  modalAberto.value = false
}

// SAIR DA CONTA
function sair() {
  usuario.value = null
  modalAberto.value = false
}

// CONFIGURAÇÕES INICIAIS DA PÁGINA
onMounted(() => {

  document.title = 'CineShop - Página inicial'

  const loadingScreen = document.getElementById('loading-screen')

  if (loadingScreen) {

    setTimeout(() => {
      loadingScreen.classList.add('fade-out')
    }, 1500)

    setTimeout(() => {
      loadingScreen.style.display = 'none'
    }, 2000)

  }

})
</script>

<style setup>
/* FUNDO ESCURO DO MODAL */
.perfil-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;

  background: rgba(0, 0, 0, 0.75);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
}

/* CAIXA DO PERFIL */
.perfil-box {
  position: relative;

  width: min(450px, 100%);

  background: #121212;
  color: white;

  border: 4px solid black;
  box-shadow: 8px 8px 0 black;

  padding: 35px 25px;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* TÍTULO */
.perfil-box h2 {
  font-family: "Press Start 2P", monospace;
  font-size: 14px;
  line-height: 1.6;
}

/* CAMPOS */
.perfil-box input {
  background: #262626;
  color: white;

  border: 3px solid #444;

  padding: 10px;
  font-size: 16px;
}

/* BOTÕES */
.perfil-box button {
  background: #FFD600;
  color: black;

  border: 3px solid black;

  padding: 10px;
  cursor: pointer;

  font-family: "Press Start 2P", monospace;
  font-size: 10px;
}

/* FECHAR MODAL */
.perfil-box .fechar {
  position: absolute;
  top: 8px;
  right: 8px;

  background: #E8525A;
  color: white;

  padding: 6px 10px;
}
</style>
