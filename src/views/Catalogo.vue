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
import { onMounted} from 'vue'
import { useAuth } from '../data/avatar.js'
import { filmes } from '../data/filmes.js';

import FilmeCard from '../components/card/Filmecard.vue';
import PassadorHorizontal from '../components/objetos/PassadorHorizontal.vue';
import Header from '../components/cabecalho/Header.vue'
import Login_perfil from './Login_perfil.vue'
import Mascote from '../components/mascote/Mascote.vue'

const cont = [...filmes].sort(() => Math.random() - 0.5);

const series = cont.filter(filme => filme.tipo === 'serie');
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
