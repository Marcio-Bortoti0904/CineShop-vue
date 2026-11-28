<template>
  <main class="conteudo-filmes">
    <section ref="player" class="player-container">
      <h2>Assistir filme</h2>
      <!-- Player oficial do Internet Archive -->
      <iframe
      :src="`https://archive.org/embed/${archiveId}`"
      title="Reprodutor de filmes do CineShop"
      allowfullscreen
      webkitallowfullscreen
      mozallowfullscreen
      ></iframe>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

// Referência ao elemento que contém o player.
const player = ref(null)

// Recebe o identificador do filme.
const props = defineProps({
  archiveId: {
    type: String,
    required: true
  }
})

// Rola a página até o player.
function rolarAtePlayer() {
  player.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

// Permite que a página principal acesse a função.
defineExpose({
  rolarAtePlayer
})
</script>

<style scoped>
.player-container {
  padding: 40px 5%;
  background: #141414;
}

.player-container h2 {
  color: white;
  margin-bottom: 20px;
}

iframe {
  width: 100%;
  max-width: 1000px;
  aspect-ratio: 16 / 9;

  display: block;

  border: none;
  border-radius: 8px;
  background: black;
}
</style>