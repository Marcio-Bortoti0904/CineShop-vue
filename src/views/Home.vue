<template>
    <Loading />
    <header>
      <Header
      :usuario="usuario"
      @abrirPerfil="abrirPerfilOuLogin"
      />
      <div
  v-if="modalAberto"
  class="perfil-overlay"
  @click.self="modalAberto = false"
>
  <div class="perfil-box">

    <!-- BOTÃO DE FECHAR -->
    <button
      class="fechar"
      @click="modalAberto = false"
    >
      X
    </button>

    <!-- LOGIN -->
    <template v-if="modalTipo === 'login'">

      <h2>ENTRAR NO CINESHOP</h2>

      <label>NOME</label>
      <input
        v-model="loginDados.nome"
        placeholder="Seu nome"
      >

      <label>E-MAIL</label>
      <input
        v-model="loginDados.email"
        type="email"
        placeholder="voce@email.com"
      >

      <label>SENHA</label>
      <input
        v-model="loginDados.senha"
        type="password"
        placeholder="Sua senha"
      >

      <button @click="entrar">
        ENTRAR
      </button>

    </template>

    <!-- PERFIL -->
    <template v-else-if="modalTipo === 'perfil'">

      <h2>MEU PERFIL</h2>

      <p>👾 {{ usuario.name }}</p>

      <p>
        {{ usuario.role === 'seller' ? 'VENDEDOR' : 'USUÁRIO' }}
      </p>

      <button @click="sair">
        SAIR
      </button>

    </template>

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
    <!-- MASCOTE VOLY -->
    <div class="mascot-container">
      <div class="mascot-bubble pixel-border">
        Olá! Sou a Voly. Precisa de ajuda?
      </div>

      <div class="mascot-image-wrapper">
        <img
          src="/imagem/Voly.png"
          alt="Mascote Voly"
          class="mascot-img"
        >
      </div>
    </div>
  
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'

// COMPONENTES
import { categorias } from '../data/categoria.js'
import { usuario } from '../data/usuario.js'

import CatCard from '../components/CatCard.vue'
import Header from '../components/Header.vue'
import Loading from './Loading.vue'
import PassadorHorizontal from '../components/PassadorHorizontal.vue'

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

<style scoped>
@import url('../css/base.css');
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