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
  <main class="conteudo-filmes">
    <section class="conteudo">
          <h1>➣ Lançamentos</h1>
          <div class="passador">
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard
                  v-for="filme in lancamentos"
                  :key="filme.id"
                  :filme="filme"
                />
              </PassadorHorizontal>
            </div>
            <span class="fumaca fumaca-esquerda" aria-hidden="true"></span>
            <span class="fumaca fumaca-direita" aria-hidden="true"></span>
          </div>
          <div class="catalogo">
            <h1>➣ Ação</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                  v-for="filme in acao"
                  :key="filme.id"
                  :filme="filme"
                />
              </PassadorHorizontal>
              </div>

            <h1>➣ Séries</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                v-for="filme in series"
                :key="filme.id"
                :filme="filme"
                />
            </PassadorHorizontal>
            </div> 
            </div>
    </section>
  </main>
  <Mascote />
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'

import { filmes } from '../data/filmes.js';

import FilmeCard from '../components/Filmecard.vue';
import PassadorHorizontal from '../components/PassadorHorizontal.vue';
import Header from '../components/Header.vue'
import Login_perfil from './Login_perfil.vue'
import Mascote from '../components/Mascote.vue'

const cont = [...filmes].sort(() => Math.random() - 0.5);

const series = cont.filter(filme => filme.tipo === 'serie');
const lancamentos = cont.filter(filme => filme.lancamento?.includes('2026'));
const acao = cont.filter(filme => filme.genero?.includes('Ação') && filme.tipo ==='filme');

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