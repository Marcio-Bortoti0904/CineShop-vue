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

.passador::before {
  left: 0;
  background: linear-gradient(
    to right,
    #01053b,
    transparent
  );
}

.passador::after {
  right: 0;
  background: linear-gradient(
    to left,
    #01053b,
    transparent,
    pixelated
  );
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
  border: 1px solid #0a36fa; 
  border-radius: 50%;
  background: #0066ff;
  color: #ffffff;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  user-select: none;
}

.seta:hover {
  background: #fafafa;
  color: #000000;
  border-color: #1100ff;
  filter: drop-shadow(0 0 12px rgba(250, 10, 22, 0.9));
}

.esquerda {
  left: 10px;
}

.direita {
  right: 10px;
}
</style>