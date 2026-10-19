<template>

    <article class="filme">
  
      <img
        :src="filme.imagem"
        :alt="filme.titulo"
      >
  
    </article>
  
  </template>
  
  <script setup>
  defineProps({
    filme: {
      type: Object,
      required: true
    }
  })
  
  </script>
  
<style scoped>
@import url('../css/base.css');
</style>