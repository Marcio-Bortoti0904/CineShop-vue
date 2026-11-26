<template>
  <div class="ov" @click.self="$emit('fechar')">
    <div class="box">

      <button class="btn red x" @click="$emit('fechar')">
        X
      </button>

      <h3>🛒 CARRINHO</h3>

      <div
        v-for="item in carrinho"
        :key="item.id"
        class="ci"
      >
        <div class="ph">
          <img v-if="item.img" :src="item.img" :alt="item.name">
          <span v-else>{{ emojis[item.cat] || '📦' }}</span>
        </div>

        <div class="cart-product">
          <b>{{ item.name }}</b>
          <br>
          {{ moeda(precoFinal(item)) }}
        </div>

        <button class="btn" @click="$emit('alterar-quantidade', item.id, -1)">
          -
        </button>

        {{ item.q }}

        <button class="btn" @click="$emit('alterar-quantidade', item.id, 1)">
          +
        </button>

        <button class="btn red" @click="$emit('remover-item', item.id)">
          🗑
        </button>
      </div>

      <p v-if="carrinho.length === 0">
        Carrinho vazio.
      </p>

      <template v-if="carrinho.length">
        <div class="f">
          <label>ENTREGA</label>

          <div class="opt">
            <button
              v-for="opcao in opcoesFrete"
              :key="opcao.dias"
              class="btn"
              :class="{ sel: opcao.dias === frete }"
              @click="$emit('update:frete', opcao.dias)"
            >
              {{ opcao.rotulo }}
            </button>
          </div>
        </div>

        <p>
          🚚 Chegada em <b>{{ frete }} dias úteis</b>
          – previsão: {{ dataEntrega }}
        </p>

        <p>
          Frete: {{ valorFrete ? moeda(valorFrete) : 'Grátis' }}
        </p>

        <h3 class="price">
          TOTAL {{ moeda(totalCarrinho + valorFrete) }}
        </h3>

        <br>

        <button class="btn red" @click="$emit('confirmar-compra')">
          ✔ CONFIRMAR COMPRA
        </button>
      </template>

    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  carrinho: {
    type: Array,
    required: true
  },

  frete: {
    type: Number,
    required: true
  },

  opcoesFrete: {
    type: Array,
    required: true
  },

  dataEntrega: {
    type: String,
    required: true
  },

  valorFrete: {
    type: Number,
    required: true
  },

  totalCarrinho: {
    type: Number,
    required: true
  },

  emojis: {
    type: Object,
    default: () => ({})
  }
})

defineEmits([
  'update:frete',
  'alterar-quantidade',
  'remover-item',
  'confirmar-compra',
  'fechar'
])

function precoFinal(produto) {
  return produto.price * (1 - produto.disc / 100)
}

function moeda(valor) {
  return 'R$ ' + Number(valor || 0).toFixed(2).replace('.', ',')
}
</script>

<style scoped>
.ov {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  background: rgba(5, 8, 16, 0.7);
}

.box {
  position: relative;
  width: min(760px, 100%);
  max-height: 92vh;
  overflow: auto;
  padding: 16px;
  background: var(--bg, #3B4A66);
  color: var(--text, #F2F5FA);
  border: 6px solid var(--ink, #0D1220);
  box-shadow: 8px 8px 0 var(--ink, #0D1220);
}

.x {
  position: absolute;
  top: 8px;
  right: 8px;
}

.ci {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px;
  margin-bottom: 10px;
  background: var(--card, #2F3D58);
  border: 4px solid var(--ink, #0D1220);
}

.ph {
  width: 64px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--line, #55678A);
  border: 4px solid var(--ink, #0D1220);
  font-size: 30px;
}

.ph img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-product {
  flex: 1;
  min-width: 100px;
}

.f {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 12px 0;
}

.f label {
  font-size: 9px;
}

.opt {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.opt .btn {
  flex: 1;
}

.btn {
  background: var(--cyan, #27C3D3);
  color: var(--ink, #0D1220);
  border: 4px solid var(--ink, #0D1220);
  box-shadow: 4px 4px 0 var(--ink, #0D1220);
  padding: 9px 12px;
  cursor: pointer;
  font-size: 10px;
}

.btn.red {
  background: var(--red, #E8525A);
  color: white;
}

.btn.sel {
  background: var(--gold, #F4C20D);
}

.price {
  color: var(--gold, #F4C20D);
  font-size: 12px;
}

@media (max-width: 620px) {
  .box {
    padding: 14px;
  }
}
</style>
