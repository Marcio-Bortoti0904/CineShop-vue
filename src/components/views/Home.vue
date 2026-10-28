<template>
  <main>
    <Loading />
    <header>
      <Header />
    </header>
    <!-- CONTEÚDO -->
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
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { categorias } from '../data/categoria.js'
import CatCard from './CatCard.vue'
import Header from './Header.vue'
import Loading from './Loading.vue'
import PassadorHorizontal from './PassadorHorizontal.vue'

onMounted(() => {
  document.title = 'CineShop - Página inicial'

  const loadingScreen = document.getElementById('loading-screen')

  setTimeout(() => {
    loadingScreen.classList.add('fade-out')
  }, 1500)

  setTimeout(() => {
    loadingScreen.style.display = 'none'
  }, 2000)
})
</script>

<style scoped>
@import url('../css/base.css');
</style>