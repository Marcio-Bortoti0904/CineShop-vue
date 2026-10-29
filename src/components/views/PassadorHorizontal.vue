<template>
  <section class="passador">
    <!-- Seta para voltar -->
    <button 
      class="seta esquerda" 
      v-show="podeVoltar" 
      @click="passarEsquerda" 
      aria-label="Eventos anteriores"
    ></button>

    <!-- Lista horizontal -->
    <div class="lista" ref="lista" @scroll="verificarPosicao">
      <slot></slot>
    </div>

    <!-- Seta para avançar -->
    <button 
      class="seta direita" 
      v-show="podeAvancar" 
      @click="passarDireita" 
      aria-label="Próximos eventos"
    ></button>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const lista = ref(null);
const podeVoltar = ref(false);
const podeAvancar = ref(false);
let observador = null;

function verificarPosicao() {
  if (!lista.value) return;
  podeVoltar.value = lista.value.scrollLeft > 2;
  const fimAlcancado = lista.value.scrollLeft + lista.value.clientWidth >= lista.value.scrollWidth - 2;
  podeAvancar.value = !fimAlcancado;
}

function passarDireita() {
  if (!lista.value) return;
  lista.value.scrollBy({ left: 600, behavior: 'smooth' });
}

function passarEsquerda() {
  if (!lista.value) return;
  lista.value.scrollBy({ left: -600, behavior: 'smooth' });
}

onMounted(async () => {
  await nextTick();
  verificarPosicao();
  window.addEventListener('resize', verificarPosicao);

  if (lista.value) {
    observador = new MutationObserver(verificarPosicao);
    observador.observe(lista.value, { childList: true, subtree: true });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', verificarPosicao);
  if (observador) observador.disconnect();
});
</script>

<style scoped>
.passador {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  gap: 10px; /* Espaço entre as setas e a lista de filmes */
}

.lista {
  display: flex;
  gap: 10px;
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
}

.lista::-webkit-scrollbar {
  display: none; 
}

.seta {
  /* Deixando estático no Flexbox para garantir que apareçam na tela */
  position: relative;
  flex-shrink: 0;
  z-index: 10;
  
  width: 20px;
  height: 20px;
  
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  padding: 0;
  
  border-top: 5px solid #fdfdfd;
  border-right: 5px solid #fdfdfd;
  border-bottom: none;
  border-left: none;
  
  transition: border-color 0.2s, transform 0.2s;
}

.esquerda {
  transform: rotate(-135deg);
}

.direita {
  transform: rotate(45deg);
}

.seta:hover {
  border-top-color: #2980b9;
  border-right-color: #2980b9;
}
</style>