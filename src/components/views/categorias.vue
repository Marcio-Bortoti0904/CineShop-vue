<template>
  <section class="categorias-page">

    <div class="lista-categorias">
      <CatCard
        v-for="categoria in categorias"
        :key="categoria.id"
        :categoria="categoria"
      />
    </div>

  </section>
</template>

<script setup>
import CatCard from './CatCard.vue'
import { categorias } from '../data/categoria.js'
</script>

<style scoped>

.categorias-page {
  padding: 30px;
}

.lista-categorias {
  display: grid;

  grid-template-columns: repeat(
    auto-fill,
    minmax(280px, 1fr)
  );

  gap: 20px;
}

</style>