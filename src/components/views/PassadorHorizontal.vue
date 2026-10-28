<template>
  <section class="passador">
    <!-- Lista horizontal -->
    <div class="lista" ref="lista" @scroll="verificarPosicao">
      <slot></slot>
    </div>

    <!-- Seta para voltar (Vazia por dentro) -->
    <button 
      class="seta esquerda" 
      v-show="podeVoltar" 
      @click="passarEsquerda" 
      aria-label="Eventos anteriores"
    ></button>

    <!-- Seta para avançar (Vazia por dentro) -->
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
  
  // Tolerância de 2px para evitar problemas de arredondamento de pixels em telas de alta densidade (Retina)
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
  
  // Atualiza se a janela mudar de tamanho
  window.addEventListener('resize', verificarPosicao);

  // Monitora se novos itens forem adicionados dinamicamente no slot
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
  position: relative;
  overflow: hidden;
}

.passador::before,
.passador::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 45px;
  z-index: 2;
  pointer-events: none;
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

/* Chrome, Safari e Edge */
.lista::-webkit-scrollbar {
  display: none; 
}

.seta {
  position: absolute;
  top: 50%;
  z-index: 2;
  flex-shrink: 0;
  
  /* Tamanho da área da seta */
  width: 16px;
  height: 16px;
  
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  padding: 0;
  
  /* Desenha o ângulo da seta (A mesma cor nas duas bordas) */
  border-top: 4px solid #fdfdfd;
  border-right: 4px solid #fdfdfd;
  border-bottom: none;
  border-left: none;
  
  transition: border-color 0.2s, transform 0.2s;
}

/* Aponta para a esquerda (Gira 225 graus) e centraliza verticalmente */
.esquerda {
  left: 15px;
  transform: translateY(-50%) rotate(-135deg);
}

/* Aponta para a direita (Gira 45 graus) e centraliza verticalmente */
.direita {
  right: 15px;
  transform: translateY(-50%) rotate(45deg);
}

/* Altera a cor de ambas as bordas no hover simultaneamente */
.seta:hover {
  border-top-color: #2980b9;
  border-right-color: #2980b9;
}
</style>
