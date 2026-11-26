<template>
  <div class="ov drawer" @click.self="$emit('fechar')">
    <div class="box">

      <button class="btn red x" @click="$emit('fechar')">
        X
      </button>

      <h3>
        {{ produto ? 'EDITAR PRODUTO' : 'NOVO PRODUTO' }}
      </h3>

      <div class="f">
        <label>FOTO (RETANGULAR)</label>

        <input
          type="file"
          accept="image/*"
          @change="selecionarImagem"
        >

        <div class="ph">
          <img
            v-if="formulario.img"
            :src="formulario.img"
            alt="Prévia do produto"
          >

          <span v-else>🖼</span>
        </div>
      </div>

      <div class="f">
        <label>NOME</label>
        <input v-model="formulario.name">
      </div>

      <div class="f">
        <label>CATEGORIA</label>

        <select v-model="formulario.cat">
          <option
            v-for="categoria in categorias.slice(1)"
            :key="categoria"
            :value="categoria"
          >
            {{ categoria }}
          </option>
        </select>
      </div>

      <div class="f">
        <label>PREÇO (R$)</label>

        <input
          v-model.number="formulario.price"
          type="number"
          min="0"
          step="0.01"
        >
      </div>

      <div class="f">
        <label>DESCONTO (%)</label>

        <input
          v-model.number="formulario.disc"
          type="number"
          min="0"
          max="90"
        >
      </div>

      <div class="f">
        <label>ESTOQUE (QTD)</label>

        <input
          v-model.number="formulario.stock"
          type="number"
          min="0"
        >
      </div>

      <div class="f">
        <label>DESCRIÇÃO</label>

        <textarea
          v-model="formulario.desc"
          rows="4"
        ></textarea>
      </div>

      <button class="btn red" @click="salvar">
        {{ produto ? 'SALVAR' : 'PUBLICAR' }}
      </button>

      <button
        v-if="produto"
        class="btn gold"
        @click="$emit('excluir')"
      >
        🗑 EXCLUIR
      </button>

    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  produto: {
    type: Object,
    default: null
  },

  categorias: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['salvar', 'excluir', 'fechar'])

const formulario = reactive({
  name: '',
  cat: 'Games',
  desc: '',
  price: '',
  disc: 0,
  stock: 1,
  img: ''
})

// Preenche o formulário quando for editar.
// Se não houver produto, prepara um formulário vazio.
watch(
  () => props.produto,
  (produto) => {
    Object.assign(
      formulario,
      produto
        ? {
            name: produto.name,
            cat: produto.cat,
            desc: produto.desc,
            price: produto.price,
            disc: produto.disc,
            stock: produto.stock,
            img: produto.img
          }
        : {
            name: '',
            cat: 'Games',
            desc: '',
            price: '',
            disc: 0,
            stock: 1,
            img: ''
          }
    )
  },
  { immediate: true }
)

// Reduz a imagem antes de enviar para o backend.
function comprimirImagem(arquivo, larguraMaxima = 480) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader()

    leitor.onerror = reject

    leitor.onload = () => {
      const imagem = new Image()

      imagem.onerror = reject

      imagem.onload = () => {
        const escala = Math.min(1, larguraMaxima / imagem.width)

        const canvas = document.createElement('canvas')

        canvas.width = Math.round(imagem.width * escala)
        canvas.height = Math.round(imagem.height * escala)

        canvas.getContext('2d').drawImage(
          imagem,
          0,
          0,
          canvas.width,
          canvas.height
        )

        resolve(canvas.toDataURL('image/jpeg', 0.7))
      }

      imagem.src = leitor.result
    }

    leitor.readAsDataURL(arquivo)
  })
}

async function selecionarImagem(evento) {
  const arquivo = evento.target.files?.[0]

  if (!arquivo) return

  try {
    formulario.img = await comprimirImagem(arquivo)
  } catch {
    alert('Não foi possível ler a imagem.')
  }
}

function salvar() {
  emit('salvar', { ...formulario })
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

.drawer {
  align-items: stretch;
  justify-content: flex-end;
  padding: 0;
}

.box {
  position: relative;
  width: min(430px, 100%);
  height: 100%;
  max-height: none;
  overflow: auto;
  padding: 16px;
  background: var(--bg, #3B4A66);
  color: var(--text, #F2F5FA);
  border: 6px solid var(--ink, #0D1220);
}

.x {
  position: absolute;
  top: 8px;
  right: 8px;
}

.f {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.f label {
  font-size: 9px;
}

.f input,
.f textarea,
.f select {
  width: 100%;
  background: var(--ink, #0D1220);
  color: var(--text, #F2F5FA);
  border: 4px solid var(--line, #55678A);
  padding: 8px 12px;
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
}

.ph img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.btn.red {
  background: var(--red, #E8525A);
  color: white;
}

.btn.gold {
  background: var(--gold, #F4C20D);
}
</style>
