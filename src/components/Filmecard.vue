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

.filme {
  flex: 0 0 220px;

  background: #0D1117;

  border: 1px solid #1F2937;
  border-radius: 10px;

  overflow: hidden;

  transition: transform 0.2s ease, border-color 0.2s ease;

  cursor: pointer;
}

.filme:hover {
  border-color: #eff4f5;
}

.filme img {
  width: 100%;

  aspect-ratio: 2 / 3;

  object-fit: cover;
  object-position: center;

  display: block;
}
</style>