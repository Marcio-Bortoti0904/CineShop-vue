<template>
  <article class="filme">
    <img
      :src="categoria.imagem"
      :alt="categoria.titulo"
    >
  </article>
</template>

<script setup>
defineProps({
  categoria: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
@import url('../css/base.css');
</style>