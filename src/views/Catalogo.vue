<template>
  <header>
    <Header
      :usuario="usuario"
      @abrirPerfil="abrirPerfilOuLogin"
      :busca="busca"
      :quantidade-carrinho="quantidadeCarrinho"
      :usuario-label="usuarioLabel"
      @atualizar-busca="busca = $event"
      @abrir-carrinho="abrirCarrinho"
      @abrir-perfil="abrirPerfil"
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
      :usuario="usuario"
      @entrar="entrar"
      @sair="sair"
    />
  </div>
</div>
  </header>
  <main class="conteudo-filmes">
    <section class="conteudo">
      <h1>➣ Lançamentos</h1>
        <div ref="listaFilmes" class="filmes">
          <PassadorHorizontal>
            <FilmeCard
            v-for="filme in lancamentos"
            :key="filme.id"
            :filme="filme"
            />
          </PassadorHorizontal>
        </div>
        <h1>➣ Filmes de Ação</h1>
        <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                  v-for="filme in acao"
                  :key="filme.id"
                  :filme="filme"
                />
              </PassadorHorizontal>
              </div>

            <h1>➣ Séries para maratonar</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                v-for="filme in series"
                :key="filme.id"
                :filme="filme"
                />
            </PassadorHorizontal>
            </div>

            <h1>➣ Ficção científica</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                v-for="filme in ficcao"
                :key="filme.id"
                :filme="filme"
                />
            </PassadorHorizontal>
            </div>

            <h1>➣ Animação</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                v-for="filme in animacoes"
                :key="filme.id"
                :filme="filme"
                />
            </PassadorHorizontal>
            </div>

            <h1>➣ Terror e suspense</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                v-for="filme in terror"
                :key="filme.id"
                :filme="filme"
                />
            </PassadorHorizontal>
            </div>

            <h1>➣ Drama</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                v-for="filme in drama"
                :key="filme.id"
                :filme="filme"
                />
            </PassadorHorizontal>
            </div>

            <h1>➣ Romance</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                v-for="filme in romance"
                :key="filme.id"
                :filme="filme"
                />
            </PassadorHorizontal>
            </div>
    </section>
  </main>
  <Mascote />
</template>

<script setup>
import { onMounted} from 'vue'
import { useAuth } from '../data/avatar.js'
import { filmes } from '../data/filmes.js';

import FilmeCard from '../components/card/Filmecard.vue';
import PassadorHorizontal from '../components/objetos/PassadorHorizontal.vue';
import Header from '../components/cabecalho/Header.vue'
import Login_perfil from './Login_perfil.vue'
import Mascote from '../components/mascote/Mascote.vue'

const cont = [...filmes].sort(() => Math.random() - 0.5);

// Categorias
const ficcao = cont.filter(
  filme => filme.genero?.includes('Ficção científica')
);

const animacoes = cont.filter(
  filme => filme.genero?.includes('Animação')
);

const terror = cont.filter(
  filme => filme.genero?.includes('Terror')
);

const drama = cont.filter(
  filme => filme.genero?.includes('Drama')
);

const romance = cont.filter(
  filme => filme.genero?.includes('Romance')
);
const series = cont.filter(
  filme => filme.tipo === 'serie'
);
const lancamentos = cont.filter(filme => filme.lancamento?.includes('2026'));
const acao = cont.filter(filme => filme.genero?.includes('Ação') && filme.tipo ==='filme');

const {
  usuario,
  modalAberto,
  modalTipo,
  loginDados,
  abrirPerfilOuLogin,
  entrar,
  fecharModal
} = useAuth()

onMounted(() => {
  document.title = 'CineShop - Página inicial'
})
</script>

<style scoped>
@import url('/src/css/base.css');
@import url('../css/avatar-bot.css');
</style>