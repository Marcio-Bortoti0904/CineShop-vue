<template>
  <main class="pagina-filme">
    <Header />
    <DestaqueFilme
      v-if="dadosFilme"
      :filme="dadosFilme"
      @assistir="assistirFilme"
    />

    <PlayerFilme
      v-if="playerVisivel && dadosFilme"
      ref="playerRef"
      :archive-id="dadosFilme.archiveId"
    />

    <p v-if="!dadosFilme">
      Filme não encontrado.
    </p>
  </main>
</template>


<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'

import { filmes } from '../data/filmes.js'

import Header from '../components/cabecalho/Header.vue'
import DestaqueFilme from '../components/streaming/DestaqueFilme.vue'
import PlayerFilme from '../components/streaming/PlayerFilme.vue'

// Acessa os parâmetros da rota.
const route = useRoute()

// Localiza o filme selecionado no catálogo.
const dadosFilme = computed(() => {

  return filmes.find(
    filme => filme.id === Number(route.params.id)
  )

})

// Controla o player.
const playerVisivel = ref(false)

const playerRef = ref(null)

// Abre o filme.
async function assistirFilme() {

  // Verifica se o filme pode ser reproduzido.
  if (!dadosFilme.value?.disponivel) {
    alert('Este filme ainda não está disponível.')
    return
  }

  playerVisivel.value = true

  await nextTick()

  playerRef.value?.rolarAtePlayer()
}
</script>


<style scoped>
.pagina-filme {
  min-height: 100vh;

  background: #141414;
  color: white;

  font-family: Arial, sans-serif;

  position: relative;
}
</style>