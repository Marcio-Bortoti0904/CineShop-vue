<template>
  <div class="produtos-page">
    <!-- Cabeçalho -->
    <header class="top">
      <div class="logo"><b>C</b>ine<i>Shop</i></div>

      <div class="search">
        <input
          v-model="termoBusca"
          type="search"
          placeholder="Buscar produtos..."
          aria-label="Buscar produtos"
        >
      </div>

      <div class="user">
        <span>Você</span>
        <div class="avatar" aria-hidden="true">👾</div>
      </div>
    </header>

    <main>
      <div class="bar">
        <h2>Produtos</h2>
        <button class="btn red" type="button" @click="abrirDrawer">
          + Criar produto
        </button>
      </div>

      <!-- Lista de produtos -->
      <div class="grid">
        <button
          v-for="produto in produtosFiltrados"
          :key="produto.id"
          class="card"
          type="button"
          :aria-label="`Abrir ${produto.nome}`"
          @click="abrirModal(produto)"
        >
          <div class="ph">
            <img
              v-if="produto.foto"
              :src="produto.foto"
              :alt="produto.nome"
            >
            <span v-else>{{ produto.emoji || '🎮' }}</span>
          </div>

          <h3>{{ produto.nome }}</h3>
          <p>{{ produto.descricao }}</p>

          <div class="price">{{ formatarPreco(produto.preco) }}</div>

          <div class="meta">
            <span class="stars" aria-label="Avaliação média">
              <span
                v-for="estrela in 5"
                :key="estrela"
                :class="estrela <= Math.round(mediaAvaliacoes(produto)) ? 'on' : 'off'"
              >★</span>
            </span>
            <span>{{ textoAvaliacao(produto) }}</span>
          </div>
        </button>

        <div v-if="produtosFiltrados.length === 0" class="empty px">
          Nenhum produto encontrado
        </div>
      </div>
    </main>

    <!-- Fundo escuro dos painéis -->
    <div
      v-if="drawerAberto || modalAberto"
      class="layer"
      @click="fecharTudo"
    ></div>

    <!-- Modal de detalhes e avaliação -->
    <section
      v-if="modalAberto && produtoSelecionado"
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mTitle"
    >
      <button
        class="x"
        type="button"
        aria-label="Fechar"
        @click="fecharTudo"
      >X</button>

      <div class="ph">
        <img
          v-if="produtoSelecionado.foto"
          :src="produtoSelecionado.foto"
          :alt="produtoSelecionado.nome"
        >
        <span v-else>{{ produtoSelecionado.emoji || '🎮' }}</span>
      </div>

      <h3 id="mTitle">{{ produtoSelecionado.nome }}</h3>
      <p>{{ produtoSelecionado.descricao }}</p>
      <div class="price">{{ formatarPreco(produtoSelecionado.preco) }}</div>

      <div class="meta modal-meta">
        <span class="stars" aria-label="Avaliação média">
          <span
            v-for="estrela in 5"
            :key="estrela"
            :class="estrela <= Math.round(mediaAvaliacoes(produtoSelecionado)) ? 'on' : 'off'"
          >★</span>
        </span>
        <span>{{ textoAvaliacao(produtoSelecionado) }}</span>
      </div>

      <h3>Sua avaliação</h3>

      <div class="rate">
        <button
          v-for="estrela in 5"
          :key="estrela"
          type="button"
          :class="{ on: estrela <= minhaAvaliacao }"
          :aria-label="`${estrela} estrela${estrela > 1 ? 's' : ''}`"
          :aria-pressed="minhaAvaliacao === estrela"
          @click="avaliarProduto(estrela)"
        >★</button>
      </div>

      <p class="rating-message">
        {{
          minhaAvaliacao
            ? `Você avaliou com ${minhaAvaliacao} de 5.`
            : 'Toque nas estrelas para avaliar.'
        }}
      </p>
    </section>

    <!-- Painel lateral para cadastrar produto -->
    <aside
      class="drawer"
      :class="{ on: drawerAberto }"
      aria-label="Criar produto"
      :aria-hidden="!drawerAberto"
    >
      <button
        class="x"
        type="button"
        aria-label="Fechar"
        @click="fecharTudo"
      >X</button>

      <h2>Novo produto</h2>

      <form @submit.prevent="publicarProduto">
        <label for="fName">Nome</label>
        <input
          id="fName"
          v-model.trim="novoProduto.nome"
          maxlength="40"
          required
        >

        <label for="fPhoto">Foto do produto</label>
        <input
          id="fPhoto"
          ref="campoFoto"
          type="file"
          accept="image/*"
          @change="selecionarFoto"
        >

        <div class="prev">
          <img
            v-if="fotoPreview"
            :src="fotoPreview"
            alt="Pré-visualização do produto"
          >
          <span v-else>Sem foto</span>
        </div>

        <label for="fDesc">Descrição</label>
        <textarea
          id="fDesc"
          v-model.trim="novoProduto.descricao"
          maxlength="300"
          required
        ></textarea>

        <label for="fPrice">Preço (R$)</label>
        <input
          id="fPrice"
          v-model="novoProduto.preco"
          type="number"
          min="0"
          step="0.01"
          inputmode="decimal"
          placeholder="0,00"
          required
        >

        <div v-if="mensagemErro" class="err" role="alert">
          {{ mensagemErro }}
        </div>

        <button class="btn publish-btn" type="submit">
          Publicar produto
        </button>
      </form>
    </aside>

    <!-- Mensagem temporária -->
    <div
      v-if="mensagemToast"
      class="toast"
      role="status"
      aria-live="polite"
    >
      {{ mensagemToast }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const formatadorBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

// Produtos iniciais
const produtos = ref([
  {
    id: 1,
    nome: 'Pôster Clássico Ação',
    descricao: 'Pôster 60x90 cm em papel fosco, arte retrô dos anos 80.',
    preco: 49.90,
    emoji: '🎬',
    somaAvaliacoes: 46,
    quantidadeAvaliacoes: 10,
    foto: ''
  },
  {
    id: 2,
    nome: 'Balde de Pipoca Colecionável',
    descricao: 'Balde de 2 litros com tampa e estampa pixel art. Edição limitada.',
    preco: 79.90,
    emoji: '🍿',
    somaAvaliacoes: 38,
    quantidadeAvaliacoes: 9,
    foto: ''
  },
  {
    id: 3,
    nome: 'Action Figure Super-Herói',
    descricao: 'Boneco articulado de 18 cm com capa removível e base de exibição.',
    preco: 129.90,
    emoji: '🦸',
    somaAvaliacoes: 87,
    quantidadeAvaliacoes: 19,
    foto: ''
  },
  {
    id: 4,
    nome: 'Fita VHS Terror Cult',
    descricao: 'Réplica de fita VHS com caixa original, ideal para decoração.',
    preco: 34.50,
    emoji: '📼',
    somaAvaliacoes: 21,
    quantidadeAvaliacoes: 6,
    foto: ''
  }
])

// Controle da pesquisa
const termoBusca = ref('')

const produtosFiltrados = computed(() => {
  const termo = termoBusca.value.toLowerCase().trim()

  return produtos.value.filter(produto => {
    return (
      produto.nome.toLowerCase().includes(termo) ||
      produto.descricao.toLowerCase().includes(termo)
    )
  })
})

// Formatação e cálculo das avaliações
function formatarPreco(preco) {
  return formatadorBRL.format(preco)
}

function mediaAvaliacoes(produto) {
  if (produto.quantidadeAvaliacoes === 0) {
    return 0
  }

  return produto.somaAvaliacoes / produto.quantidadeAvaliacoes
}

function textoAvaliacao(produto) {
  if (produto.quantidadeAvaliacoes === 0) {
    return 'Sem avaliações'
  }

  const media = mediaAvaliacoes(produto)
    .toFixed(1)
    .replace('.', ',')

  return `${media} de 5 (${produto.quantidadeAvaliacoes})`
}

// Controle do modal
const modalAberto = ref(false)
const produtoSelecionado = ref(null)
const minhaAvaliacao = ref(0)

// Guarda a avaliação individual feita nesta sessão
const minhasAvaliacoes = ref({})

function abrirModal(produto) {
  produtoSelecionado.value = produto
  minhaAvaliacao.value = minhasAvaliacoes.value[produto.id] || 0
  modalAberto.value = true
}

function avaliarProduto(nota) {
  const produto = produtoSelecionado.value

  if (!produto) return

  const avaliacaoAnterior = minhasAvaliacoes.value[produto.id]

  // Se já havia uma avaliação, remove a nota anterior da soma.
  if (avaliacaoAnterior) {
    produto.somaAvaliacoes -= avaliacaoAnterior
  } else {
    produto.quantidadeAvaliacoes++
  }

  produto.somaAvaliacoes += nota
  minhasAvaliacoes.value[produto.id] = nota
  minhaAvaliacao.value = nota

  mostrarToast('Avaliação registrada')
}

// Controle do painel de cadastro
const drawerAberto = ref(false)

const novoProduto = ref({
  nome: '',
  descricao: '',
  preco: ''
})

const fotoPreview = ref('')
const campoFoto = ref(null)
const mensagemErro = ref('')

let proximoId = 5

function abrirDrawer() {
  mensagemErro.value = ''
  drawerAberto.value = true
}

function selecionarFoto(evento) {
  const arquivo = evento.target.files[0]

  if (!arquivo) {
    fotoPreview.value = ''
    return
  }

  if (!arquivo.type.startsWith('image/')) {
    mensagemErro.value = 'Selecione um arquivo de imagem válido.'
    evento.target.value = ''
    fotoPreview.value = ''
    return
  }

  const leitor = new FileReader()

  leitor.onload = () => {
    fotoPreview.value = leitor.result
    mensagemErro.value = ''
  }

  leitor.onerror = () => {
    mensagemErro.value = 'Não foi possível carregar essa imagem.'
  }

  leitor.readAsDataURL(arquivo)
}

function publicarProduto() {
  const nome = novoProduto.value.nome.trim()
  const descricao = novoProduto.value.descricao.trim()
  const preco = Number(novoProduto.value.preco)

  if (!nome || !descricao || novoProduto.value.preco === '' || !Number.isFinite(preco) || preco < 0) {
    mensagemErro.value = 'Preencha nome, descrição e preço válido.'
    return
  }

  produtos.value.unshift({
    id: proximoId++,
    nome,
    descricao,
    preco,
    foto: fotoPreview.value,
    emoji: '🎮',
    somaAvaliacoes: 0,
    quantidadeAvaliacoes: 0
  })

  novoProduto.value = {
    nome: '',
    descricao: '',
    preco: ''
  }

  fotoPreview.value = ''
  mensagemErro.value = ''

  if (campoFoto.value) {
    campoFoto.value.value = ''
  }

  fecharTudo()
  mostrarToast('Produto publicado')
}

// Fechamento dos painéis
function fecharTudo() {
  modalAberto.value = false
  drawerAberto.value = false
}

// Mensagem temporária
const mensagemToast = ref('')
let temporizadorToast

function mostrarToast(mensagem) {
  mensagemToast.value = mensagem

  clearTimeout(temporizadorToast)

  temporizadorToast = setTimeout(() => {
    mensagemToast.value = ''
  }, 2000)
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

:root {
  --bg: #3B4A66;
  --bar: #26324A;
  --card: #2F3D58;
  --ink: #0D1220;
  --text: #F2F5FA;
  --muted: #B9C3D6;
  --red: #E8525A;
  --cyan: #27C3D3;
  --gold: #F4C20D;
  --line: #55678A;
}

* {
  box-sizing: border-box;
}

.produtos-page {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font: 24px/1.15 "VT323", ui-monospace, monospace;
  background-image:
    linear-gradient(rgba(0, 0, 0, .08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, .08) 1px, transparent 1px);
  background-size: 8px 8px;
  padding-bottom: 30px;
}

.produtos-page h1,
.produtos-page h2,
.produtos-page h3,
.produtos-page .px {
  font-family: "Press Start 2P", "VT323", monospace;
  font-weight: 400;
  line-height: 1.5;
}

.produtos-page button,
.produtos-page input,
.produtos-page textarea {
  font: inherit;
  color: inherit;
}

.produtos-page :focus-visible {
  outline: 4px solid var(--gold);
  outline-offset: 2px;
}

.top {
  background: var(--bar);
  border-bottom: 6px solid var(--ink);
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  flex-wrap: wrap;
}

.logo {
  font-family: "Press Start 2P", monospace;
  font-size: 20px;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo b {
  background: var(--red);
  padding: 6px 8px;
  border: 4px solid var(--ink);
}

.logo i {
  font-style: normal;
  color: var(--cyan);
}

.search {
  flex: 1 1 280px;
  max-width: 560px;
}

.search input {
  width: 100%;
  background: var(--ink);
  border: 4px solid var(--line);
  padding: 10px 14px;
}

.search input::placeholder {
  color: var(--muted);
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Press Start 2P", monospace;
  font-size: 11px;
}

.avatar {
  width: 44px;
  height: 44px;
  background: #F28BA8;
  border: 4px solid var(--ink);
  display: grid;
  place-items: center;
  font-size: 22px;
}

.produtos-page main {
  max-width: 1180px;
  margin: 0 auto;
  padding: 28px 20px 60px;
}

.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.produtos-page h2 {
  font-size: 16px;
  margin: 0;
}

.produtos-page h2::before {
  content: "> ";
  color: var(--red);
}

.btn {
  background: var(--cyan);
  color: var(--ink) !important;
  border: 4px solid var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  padding: 10px 16px;
  cursor: pointer;
  font-family: "Press Start 2P", monospace !important;
  font-size: 11px !important;
}

.btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--ink);
}

.btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--ink);
}

.btn.red {
  background: var(--red);
  color: #fff !important;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.card {
  background: var(--card);
  border: 4px solid var(--ink);
  box-shadow: 6px 6px 0 var(--ink);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  cursor: pointer;
  width: 100%;
}

.card:hover {
  border-color: var(--red);
}

.ph {
  aspect-ratio: 4 / 3;
  width: 100%;
  border: 4px solid var(--ink);
  background: var(--line);
  display: grid;
  place-items: center;
  font-size: 64px;
  overflow: hidden;
  image-rendering: pixelated;
}

.ph img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card h3 {
  font-size: 12px;
  margin: 0;
  word-break: break-word;
}

.card p {
  margin: 0;
  color: var(--muted);
  flex: 1;
  display: -webkit-box;
  overflow: hidden;
}

.price {
  font-family: "Press Start 2P", monospace;
  font-size: 14px;
  color: var(--gold);
}

.stars {
  display: inline-flex;
  gap: 2px;
  font-size: 26px;
  letter-spacing: 0;
  white-space: nowrap;
}

.stars .on {
  color: var(--gold);
}

.stars .off {
  color: var(--line);
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  color: var(--muted);
}

.empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: var(--muted);
}

.layer {
  position: fixed;
  inset: 0;
  background: rgba(5, 8, 16, .65);
  z-index: 20;
}

.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(560px, 92vw);
  max-height: 90vh;
  overflow: auto;
  background: var(--card);
  border: 4px solid var(--ink);
  box-shadow: 8px 8px 0 var(--ink);
  padding: 18px;
  z-index: 30;
}

.modal h3 {
  font-size: 14px;
  margin: 14px 0 8px;
}

.modal-meta {
  margin-top: 8px;
}

.rate button {
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 38px;
  padding: 0 2px;
  color: var(--line);
}

.rate button.on {
  color: var(--gold);
}

.rating-message {
  color: var(--muted);
}

.x {
  float: right;
  background: var(--red);
  color: #fff !important;
  border: 4px solid var(--ink);
  cursor: pointer;
  width: 38px;
  height: 38px;
  font-family: "Press Start 2P", monospace !important;
  font-size: 12px !important;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(400px, 100vw);
  background: var(--bar);
  border-left: 6px solid var(--ink);
  padding: 20px;
  transform: translateX(100%);
  transition: transform .2s;
  z-index: 40;
  overflow: auto;
}

.drawer.on {
  transform: translateX(0);
}

.drawer h2 {
  margin-bottom: 16px;
}

.drawer label {
  display: block;
  margin: 14px 0 6px;
  color: var(--cyan);
}

.drawer input,
.drawer textarea {
  width: 100%;
  background: var(--ink);
  border: 4px solid var(--line);
  padding: 8px 10px;
}

.drawer textarea {
  min-height: 110px;
  resize: vertical;
}

.prev {
  aspect-ratio: 4 / 3;
  border: 4px dashed var(--line);
  display: grid;
  place-items: center;
  color: var(--muted);
  overflow: hidden;
  margin-top: 6px;
}

.prev img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.err {
  color: var(--red);
  min-height: 1.2em;
  margin-top: 10px;
}

.publish-btn {
  margin-top: 8px;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  background: var(--ink);
  border: 4px solid var(--cyan);
  padding: 10px 18px;
  z-index: 60;
}

@media (prefers-reduced-motion: reduce) {
  .drawer {
    transition: none;
  }

  .btn:hover,
  .btn:active {
    transform: none;
  }
}

@media (max-width: 600px) {
  .logo {
    font-size: 15px;
  }

  .user span {
    display: none;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  }
}
</style>
