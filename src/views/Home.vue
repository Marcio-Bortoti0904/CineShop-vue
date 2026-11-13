<template>
    <header>
      <Header
      :usuario="usuario"
      @abrirPerfil="abrirPerfilOuLogin"
      />
      <div
  v-if="modalAberto"
  class="perfil-overlay"
  @click.self="fecharModal"
>
  <div class="perfil-box">

    <!-- BOTÃO DE FECHAR -->
    <button
      class="fechar"
      @click="fecharModal"
    >
      X
    </button>
    <Login_perfil
      :modal-tipo="modalTipo"
      :login-dados="loginDados"
      @entrar="entrar"
    />
  </div>
</div>
    </header>
    <!-- CONTEÚDO -->
     <main class="conteudo-filmes">
      <section class="conteudo" id="streaming">
      <h2>➣ Streaming</h2>

      <div ref="listaFilmes" class="filmes">
        <PassadorHorizontal>
            <CatCard
            v-for="categoria in categorias"
            :key="categoria.id"
            :categoria="categoria"
          />
        </PassadorHorizontal>
      </div>
    </section>

    <section class="conteudo" id="produtos">
      <h2>➣ Produtos</h2>

      <!-- Os produtos poderão ser adicionados aqui depois. -->
    </section>
</main>
<Mascote />
</template>


<script setup>
import { onMounted, ref, reactive } from 'vue'

// COMPONENTES
import { categorias } from '../data/categoria.js'
import CatCard from '../components/CatCard.vue'
import Header from '../components/Header.vue'
import PassadorHorizontal from '../components/PassadorHorizontal.vue'
import Mascote from '../components/Mascote.vue'
import Login_perfil from './Login_perfil.vue'

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

  // A autenticação real será conectada ao backend.
  alert('Formulário preenchido! Falta conectar ao servidor.')

}

// FECHAR MODAL
function fecharModal() {
  modalAberto.value = false
  modalTipo.value = ''
}

onMounted(() => {
  document.title = 'CineShop - Página inicial'
})
</script>

<style scoped>
@import url('../css/base.css');
@import url('../css/avatar-bot.css');
</style>