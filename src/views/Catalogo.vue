<template>
  <header>
    <Header />
  </header>
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
          </div>
    </section>
</template>

<script setup>
import { filmes } from '../data/filmes.js'
<<<<<<< HEAD:src/views/Catalogo.vue
import FilmeCard from '../components/Filmecard.vue';
import PassadorHorizontal from '../components/PassadorHorizontal.vue';
import Header from '../components/Header.vue'
=======
import FilmeCard from './Filmecard.vue';
import PassadorHorizontal from './PassadorHorizontal.vue';
import Header from './Header.vue'
>>>>>>> e23b354c50cf4a0ecec664c9874677525f307386:src/components/views/Catalogo.vue
const cont = [...filmes].sort(() => Math.random() - 0.5);

const series = cont.filter(filme => filme.tipo === 'serie');
const lancamentos = cont.filter(filme => filme.lancamento?.includes('2026'));
const acao = cont.filter(filme => filme.genero?.includes('Ação') && filme.tipo ==='filme');
</script>

<style scoped>
@import url('../css/base.css');
</style>
