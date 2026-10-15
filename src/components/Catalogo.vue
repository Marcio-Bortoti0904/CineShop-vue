<template>
  <section class="eventos-page">
    <h1>Eventos Culturais</h1>
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

<style scoped>

</style>