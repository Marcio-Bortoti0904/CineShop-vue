<template>
  <section class="conteudo">
          <h1>➣ Lançamentos</h1>
          <div class="passador">
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard
                  v-for="filme in filmes"
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
                  v-for="filme in filmes"
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
import FilmeCard from './Filmecard.vue';
import PassadorHorizontal from './PassadorHorizontal.vue';
</script>

<style scoped>
@import url('../css/base.css');
</style>