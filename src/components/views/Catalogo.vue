<template>
  <section class="eventos-page">
    <h1>Tudo sobre filmes e séries</h1>
      <FilmeCard
        v-for="filme in filmes"
        :key="filme.id"
        :filme="filme"
      />

  </section>
</template>

<script setup>
import FilmeCard from './Filmecard.vue'
import { filmes } from '../data/filmes.js'
</script>