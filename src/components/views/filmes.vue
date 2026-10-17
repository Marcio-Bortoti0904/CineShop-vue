<template>
    <section class="filmes-page">
  
      <div class="lista-filmes">
        <Filmecard
          v-for="filme in filmes"
          :key="filme.id"
          :evento="filme"
        />
      </div>
    </section>
  </template>
  
<script setup>
import Filmecard from './Filmecard.vue'
import { filmes } from '../data/filmes.js'

</script>
  
<style scoped>
.lista-filmes {
  display: grid;
  
  grid-template-columns: repeat(
    auto-fill,
    minmax(280px, 1fr)
  );
  gap: 20px;
}
</style>