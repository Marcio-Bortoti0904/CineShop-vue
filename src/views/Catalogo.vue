<template>
  <header>
    <Header
      :usuario="usuario"
      @abrirPerfil="abrirPerfilOuLogin"
    />
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
</template>

<script setup>
import { filmes } from '../data/filmes.js';

import FilmeCard from '../components/Filmecard.vue';
import PassadorHorizontal from '../components/PassadorHorizontal.vue';
import Header from '../components/Header.vue'
const cont = [...filmes].sort(() => Math.random() - 0.5);

const series = cont.filter(filme => filme.tipo === 'serie');
const lancamentos = cont.filter(filme => filme.lancamento?.includes('2026'));
const acao = cont.filter(filme => filme.genero?.includes('Ação') && filme.tipo ==='filme');

// ABRIR LOGIN OU PERFIL
function abrirPerfilOuLogin() {

  if (!usuario.value) {
    modalTipo.value = 'login'
  } else {
    modalTipo.value = 'perfil'
  }

  modalAberto.value = true
}
</script>

<style scoped>
@import url('../css/base.css');
</style>
