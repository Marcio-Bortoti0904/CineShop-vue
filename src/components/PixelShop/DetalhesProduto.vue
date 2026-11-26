<template>
  <div v-if="produto">

    <div class="det">
      <div>
        <div class="ph">
          <img
            v-if="produto.img"
            :src="produto.img"
            :alt="produto.name"
          >

          <span v-else>{{ emoji }}</span>

          <span v-if="produto.disc" class="tag">
            -{{ produto.disc }}%
          </span>
        </div>

        <p class="muted">
          Vendido por {{ produto.loja || 'Loja CineShop' }}
        </p>
      </div>

      <div>
        <span class="cat">{{ produto.cat }}</span>

        <h3>{{ produto.name }}</h3>

        <div class="price">
          {{ moeda(precoFinal) }}

          <span v-if="produto.disc" class="old">
            {{ moeda(produto.price) }}
          </span>
        </div>

        <p :class="produto.stock <= 0 ? 'no' : 'ok'">
          {{
            produto.stock <= 0
              ? '✖ INDISPONÍVEL – Estoque: 0'
              : `✔ Em estoque: ${produto.stock} un.`
          }}
        </p>

        <div class="stars">
          <button
            v-for="estrela in 5"
            :key="estrela"
            :class="{ on: estrela <= Math.round(media) }"
            :aria-label="`Avaliar com ${estrela} estrelas`"
            @click="$emit('avaliar', estrela)"
          >
            ★
          </button>
        </div>

        <div class="muted">
          Média {{ media.toFixed(1) }}
          ({{ totalAvaliacoes }} avaliações)
        </div>
      </div>
    </div>

    <h3 class="description-title">DESCRIÇÃO</h3>

    <p>{{ produto.desc }}</p>

    <button
      class="btn"
      :disabled="produto.stock <= 0"
      @click="$emit('adicionar')"
    >
      🛒 ADICIONAR AO CARRINHO
    </button>

    <button
      v-if="ehDono"
      class="btn gold"
      @click="$emit('editar')"
    >
      ✏ EDITAR
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  produto: {
    type: Object,
    required: true
  },

  media: {
    type: Number,
    default: 0
  },

  totalAvaliacoes: {
    type: Number,
    default: 0
  },

  emoji: {
    type: String,
    default: '📦'
  },

  ehDono: {
    type: Boolean,
    default: false
  }
})

defineEmits(['avaliar', 'adicionar', 'editar'])

const precoFinal = computed(() => {
  return props.produto.price * (1 - props.produto.disc / 100)
})

function moeda(valor) {
  return 'R$ ' + Number(valor || 0).toFixed(2).replace('.', ',')
}
</script>

<style scoped>
.det {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.ph {
  aspect-ratio: 4 / 3;
  width: 100%;
  border: 4px solid var(--ink, #0D1220);
  background: var(--line, #55678A);
  display: grid;
  place-items: center;
  font-size: 60px;
  overflow: hidden;
  position: relative;
}

.ph img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
}

.tag {
  position: absolute;
  top: 4px;
  left: 4px;
  background: var(--red, #E8525A);
  color: white;
  padding: 4px 6px;
  border: 3px solid var(--ink, #0D1220);
  font-size: 9px;
}

.cat {
  display: inline-block;
  background: var(--cyan, #27C3D3);
  color: var(--ink, #0D1220);
  padding: 2px 8px;
  font-size: 19px;
  border: 3px solid var(--ink, #0D1220);
}

.price {
  color: var(--gold, #F4C20D);
  font-size: 12px;
  margin: 8px 0;
}

.old {
  color: var(--muted, #B9C3D6);
  font-size: 20px;
  text-decoration: line-through;
}

.ok {
  color: var(--green, #5BD16F);
}

.no {
  color: var(--red, #E8525A);
}

.muted {
  color: var(--muted, #B9C3D6);
}

.stars {
  display: flex;
  gap: 2px;
  margin-top: 8px;
}

.stars button {
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 30px;
  color: var(--line, #55678A);
}

.stars button.on {
  color: var(--gold, #F4C20D);
}

.description-title {
  margin-top: 16px;
}

.btn {
  background: var(--cyan, #27C3D3);
  color: var(--ink, #0D1220);
  border: 4px solid var(--ink, #0D1220);
  box-shadow: 4px 4px 0 var(--ink, #0D1220);
  padding: 9px 12px;
  cursor: pointer;
  font-size: 10px;
  margin: 4px;
}

.btn.gold {
  background: var(--gold, #F4C20D);
}

.btn:disabled {
  background: var(--line, #55678A);
  cursor: not-allowed;
}

@media (max-width: 620px) {
  .det {
    grid-template-columns: 1fr;
  }
}
</style>