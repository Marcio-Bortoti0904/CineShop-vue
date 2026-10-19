```vue
<template>
  <section class="passador">
    <!-- Lista horizontal -->
    <div class="lista" ref="lista" @scroll="verificarPosicao">
      <slot></slot>
    </div>

    <!-- Seta para voltar -->
    <button 
      class="seta esquerda" 
      v-show="podeVoltar" 
      @click="passarEsquerda" 
      aria-label="Eventos anteriores"
    >
      ‹
    </button>

    <!-- Seta para avançar -->
    <button 
      class="seta direita" 
      v-show="podeAvancar" 
      @click="passarDireita" 
      aria-label="Próximos eventos"
    >
      ›
    </button>
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
  lista.value.scrollBy({ left: 300, behavior: 'smooth' });
}

function passarEsquerda() {
  if (!lista.value) return;
  lista.value.scrollBy({ left: -300, behavior: 'smooth' });
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
  width: 100%;
  min-width: 0;
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
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  padding: 0;
  margin: 0;
  border: 1px solid #374151;
  border-radius: 50%;
  background: #0D1117;
  color: #ffffff;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  user-select: none; /* Evita que o usuário selecione o texto da seta com cliques rápidos */
}

.seta:hover {
  background: #ffffff;
  color: #090C10;
}

.esquerda {
  left: 10px;
}

.direita {
  right: 10px;
}
</style>