<template>
  <article
    class="produto"
    :class="{ completo }"
    :role="completo ? 'button' : undefined"
    :tabindex="completo ? 0 : undefined"
    @click="$emit('abrir')"
    @keydown.enter="$emit('abrir')"
  >

    <!-- IMAGEM -->
    <div class="imagem-produto">
      <img
        v-if="imagem"
        :src="imagem"
        :alt="nome"
      >

      <span v-else class="emoji">
        {{ emojisCategoria[produto.cat] || '📦' }}
      </span>

      <span v-if="completo && desconto" class="tag">
        -{{ desconto }}%
      </span>

      <span v-if="completo && alertaEstoque && produto.stock <= 5" class="tag low">
        ESTOQUE {{ produto.stock }}
      </span>
    </div>

    <!-- INFORMAÇÕES -->
    <div class="informacoes">

      <span v-if="completo && produto.cat" class="categoria">
        {{ produto.cat }}
      </span>

      <h3>{{ nome }}</h3>

      <p v-if="completo && produto.desc" class="descricao">
        {{ produto.desc }}
      </p>

      <div v-if="temPreco" class="linha-preco">
        <span class="preco">{{ moeda(precoFinal) }}</span>

        <span v-if="desconto" class="antigo">
          {{ moeda(preco) }}
        </span>
      </div>

      <div v-if="completo" class="estrelas">
        <span
          v-for="estrela in 5"
          :key="estrela"
        >
          {{ estrela <= Math.round(media) ? '★' : '☆' }}
        </span>

        <span class="mudo">({{ totalAvaliacoes }})</span>
      </div>

    </div>

  </article>
</template>

<script setup>
import { computed } from 'vue'

import { emojisCategoria } from '/src/data/emojis.js'

// Aceita os dois formatos de produto:
//  - Landing page (data/produtos.js): { imagem, nome, preco }
//  - Loja (API):                      { img, name, price, disc, cat, desc, stock }
const props = defineProps({
  produto: {
    type: Object,
    required: true
  },

  // false = card simples (imagem, nome e preço); true = card da loja
  completo: {
    type: Boolean,
    default: false
  },

  // nota média e quantidade de avaliações (só no card completo)
  media: {
    type: Number,
    default: 0
  },

  totalAvaliacoes: {
    type: Number,
    default: 0
  },

  // mostra o aviso de estoque baixo (visão do vendedor)
  alertaEstoque: {
    type: Boolean,
    default: false
  }
})

defineEmits(['abrir'])

const nome = computed(() => props.produto.nome ?? props.produto.name)
const imagem = computed(() => props.produto.imagem ?? props.produto.img)
const bruto = computed(() => props.produto.preco ?? props.produto.price)
const temPreco = computed(() => bruto.value !== undefined && bruto.value !== null && bruto.value !== '')
const preco = computed(() => Number(bruto.value) || 0)
const desconto = computed(() => props.produto.disc || 0)
const precoFinal = computed(() => preco.value * (1 - desconto.value / 100))

function moeda(valor) {
  return 'R$ ' + Number(valor || 0).toFixed(2).replace('.', ',')
}
</script>

<style scoped>
/* ===== CARD SIMPLES (landing page) ===== */
.produto {
  flex: 0 0 240px;
  background: rgb(177, 176, 176);
  border: 10px solid #1F2937;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.produto:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-color: rgb(83, 86, 214);
}

.imagem-produto {
  width: 220px;
  height: 230px;

  margin: 0 auto;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #1F2937;
}

.imagem-produto img {
  max-width: 100%;
  max-height: 100%;

  object-fit: contain;
}

.emoji {
  font-size: 60px;
}

.informacoes {
  padding: 12px;
}

.informacoes h3 {
  margin: 0 0 8px;

  color: #1F2937;

  font-size: 20px;
}

.preco {
  margin: 0;

  color: #222;

  font-size: 22px;
  font-weight: bold;
}

.antigo {
  margin-left: 6px;
  color: #555;
  text-decoration: line-through;
}

/* ===== CARD COMPLETO (loja PixelShop) =====
   As cores vêm das variáveis da página (--card, --ink...); os valores
   depois da vírgula são usados se a variável não existir. */
.produto.completo {
  flex: none;
  width: 100%;
  background: var(--card, #2F3D58);
  border: 4px solid var(--ink, #0D1220);
  box-shadow: 6px 6px 0 var(--ink, #0D1220);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  color: var(--text, #F2F5FA);
}

.produto.completo:hover {
  border-color: var(--red, #E8525A);
}

.produto.completo:focus-visible {
  outline: 4px solid var(--gold, #F4C20D);
  outline-offset: 2px;
}

.produto.completo .imagem-produto {
  aspect-ratio: 4 / 3;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  border: 4px solid var(--ink, #0D1220);
  background: var(--line, #55678A);
  overflow: hidden;
  position: relative;
}

.produto.completo .imagem-produto img {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  object-fit: cover;
  image-rendering: pixelated;
}

.produto.completo .informacoes {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.produto.completo .informacoes h3 {
  margin: 0;
  color: inherit;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.5;
  word-break: break-word;
}

.categoria {
  display: inline-block;
  width: max-content;
  background: var(--cyan, #27C3D3);
  color: var(--ink, #0D1220);
  padding: 2px 8px;
  font-size: 19px;
  border: 3px solid var(--ink, #0D1220);
}

.descricao {
  margin: 0;
  color: var(--muted, #B9C3D6);
}

.produto.completo .preco {
  font-family: "Press Start 2P", monospace;
  font-size: 12px;
  font-weight: 400;
  color: var(--gold, #F4C20D);
}

.produto.completo .antigo {
  font-family: "VT323", monospace;
  font-size: 20px;
  color: var(--muted, #B9C3D6);
}

.estrelas {
  color: var(--gold, #F4C20D);
  letter-spacing: 2px;
}

.mudo {
  color: var(--muted, #B9C3D6);
}

.tag {
  position: absolute;
  top: 4px;
  left: 4px;
  background: var(--red, #E8525A);
  color: #fff;
  font: 9px "Press Start 2P", monospace;
  padding: 4px 6px;
  border: 3px solid var(--ink, #0D1220);
}

.tag.low {
  background: var(--gold, #F4C20D);
  color: var(--ink, #0D1220);
  left: auto;
  right: 4px;
}
</style>
