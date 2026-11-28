<template>
  <div class="pixelshop-page">
    <CabecalhoLoja
      :usuario="usuario"
      @abrirPerfil="abrirPerfilOuLogin"
      :busca="busca"
      :quantidade-carrinho="quantidadeCarrinho"
      :usuario-label="usuarioLabel"
      @atualizar-busca="busca = $event"
      @abrir-carrinho="abrirCarrinho"
      @abrir-perfil="abrirPerfil"
    />

    <div class="perfil-box">
        <Login_perfil
          :modal-tipo="modalTipo"
          :login-dados="loginDados"
          :usuario="usuario"
          @entrar="entrar"
          @sair="sair"
        />
      </div>

    <main class="conteudo-filmes">
      <div class="row">
        <h1>{{ tela === 'shop' ? 'PRODUTOS' : 'MEUS PRODUTOS' }}</h1>
      </div>
    </main>

    <!-- Janelas de conteúdo -->
    <ModalLoja
      :aberto="modalAberto"
      :tipo="modalTipo"
      @fechar="fecharModal"
    >
      <!-- DETALHES DO PRODUTO -->
      <div v-if="modalTipo === 'detalhes' && produtoAtual">
        <div class="det">
          <div>
            <div class="ph">
              <img
                v-if="produtoAtual.img"
                :src="produtoAtual.img"
                :alt="produtoAtual.name"
              >
              <span v-else>{{ iconeCategoria(produtoAtual.cat) }}</span>
            </div>

            <p class="muted">
              <span v-if="produtoAtual.upd" class="tag-static">
                ATUALIZADO
              </span>
            </p>
          </div>

          <div>
            <span class="cat">{{ produtoAtual.cat }}</span>
            <h3>{{ produtoAtual.name }}</h3>

            <div class="price">
              {{ formatarPreco(precoFinal(produtoAtual)) }}
              <span v-if="produtoAtual.disc" class="old">
                {{ formatarPreco(produtoAtual.price) }}
              </span>
            </div>

            <p :class="produtoAtual.stock <= 0 ? 'no' : 'ok'">
              {{
                produtoAtual.stock <= 0
                  ? '✖ INDISPONÍVEL – Estoque: 0'
                  : `✔ Em estoque: ${produtoAtual.stock} un.`
              }}
            </p>

            <div class="stars">
              <button
                v-for="estrela in 5"
                :key="estrela"
                :class="{ on: estrela <= Math.round(mediaAvaliacoes(produtoAtual)) }"
                @click="avaliarProduto(estrela)"
              >
                ★
              </button>
            </div>

            <div class="muted">
              Média {{ mediaAvaliacoes(produtoAtual).toFixed(1) }}
              ({{ produtoAtual.r.length }} avaliações)
              – clique para avaliar
            </div>
          </div>
        </div>

        <h3 class="descricao-titulo">DESCRIÇÃO</h3>
        <p>{{ produtoAtual.desc }}</p>

        <button
          class="btn"
          :disabled="produtoAtual.stock <= 0"
          @click="adicionarCarrinho(produtoAtual)"
        >
          🛒
          {{ produtoAtual.stock <= 0 ? 'SEM ESTOQUE' : 'ADICIONAR AO CARRINHO' }}
        </button>

        <button
          v-if="usuario?.role === 'seller'"
          class="btn gold"
          @click="abrirFormulario(produtoAtual)"
        >
          ✏ EDITAR
        </button>
      </div>

      <!-- PERFIL DO USUÁRIO -->
      <div v-else-if="modalTipo === 'perfil'">
        <h3>👾 PERFIL</h3>

        <template v-if="usuario?.role === 'seller'">
          <button class="btn" @click="abrirEstatisticas">
            📊 ESTATÍSTICAS
          </button>

          <button class="btn red" @click="abrirFormulario()">
            + CRIAR PRODUTO
          </button>
        </template>

        <p v-else class="muted">
          Navegue, avalie e compre produtos.
        </p>

        <br>

        <button class="btn gold" @click="sair">
          SAIR
        </button>
      </div>

      <!-- ESTATÍSTICAS -->
      <div v-else-if="modalTipo === 'estatisticas'">
        <h3>📊 VENDAS DO MÊS</h3>

        <div class="stats">
          <div class="stat">
            Faturamento
            <b>{{ formatarPreco(totalVendas) }}</b>
          </div>

          <div class="stat">
            Unidades
            <b>{{ totalUnidades }}</b>
          </div>

          <div class="stat">
            Pedidos
            <b>{{ vendas.length }}</b>
          </div>

          <div class="stat">
            Top categoria
            <b class="categoria-top">{{ categoriaMaisVendida }}</b>
          </div>
        </div>

        <h3>VENDAS POR CATEGORIA</h3>

        <div class="bars">
          <div
            v-for="(valor, categoria) in vendasPorCategoria"
            :key="categoria"
            class="bar"
          >
            <span>{{ categoria }}</span>
            <i :style="{ width: (valor / maiorVendaCategoria * 55) + '%' }"></i>
            <b>{{ formatarPreco(valor) }}</b>
          </div>
        </div>

        <br>

        <button class="btn red" @click="abrirFormulario()">
          + CRIAR PRODUTO
        </button>
      </div>

      <!-- FORMULÁRIO DE PRODUTO -->
      <div v-else-if="modalTipo === 'formulario'">
        <h3>
          {{ produtoEmEdicao ? 'EDITAR PRODUTO' : 'NOVO PRODUTO' }}
        </h3>

        <div class="f">
          <label>FOTO (RETANGULAR)</label>

          <input type="file" accept="image/*" @change="selecionarImagem">

          <div class="ph">
            <img
              v-if="formProduto.img"
              :src="formProduto.img"
              alt="Pré-visualização do produto"
            >
            <span v-else>🖼</span>
          </div>
        </div>

        <div class="f">
          <label>NOME</label>
          <input v-model="formProduto.name">
        </div>

        <div class="f">
          <label>CATEGORIA</label>
          <select v-model="formProduto.cat">
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
          <input v-model.number="formProduto.price" type="number" min="0" step="0.01">
        </div>

        <div class="f">
          <label>DESCONTO (%)</label>
          <input v-model.number="formProduto.disc" type="number" min="0" max="90">
        </div>

        <div class="f">
          <label>ESTOQUE (QTD)</label>
          <input v-model.number="formProduto.stock" type="number" min="0">
        </div>

        <div class="f">
          <label>DESCRIÇÃO</label>
          <textarea v-model="formProduto.desc" rows="4"></textarea>
        </div>

        <button class="btn red" @click="salvarProduto">
          {{ produtoEmEdicao ? 'SALVAR' : 'PUBLICAR' }}
        </button>
      </div>

      <!-- CARRINHO -->
      <div v-else-if="modalTipo === 'carrinho'">
        <h3>🛒 CARRINHO</h3>

        <div v-if="carrinho.length === 0">
          <p>Carrinho vazio.</p>
        </div>

        <template v-else>
          <div
            v-for="item in carrinhoDetalhado"
            :key="item.id"
            class="ci"
          >
            <div class="ph">
              <img v-if="item.img" :src="item.img" :alt="item.name">
              <span v-else>{{ iconeCategoria(item.cat) }}</span>
            </div>

            <div class="item-info">
              <b>{{ item.name }}</b>
              <br>
              {{ formatarPreco(precoFinal(item)) }}
            </div>

            <button class="btn" @click="alterarQuantidade(item.id, -1)">-</button>
            {{ item.quantidade }}
            <button class="btn" @click="alterarQuantidade(item.id, 1)">+</button>
          </div>

          <div class="f">
            <label>ENTREGA</label>

            <div class="opt">
              <button
                v-for="opcao in opcoesEntrega"
                :key="opcao.dias"
                class="btn"
                :class="{ sel: entregaDias === opcao.dias }"
                @click="entregaDias = opcao.dias"
              >
                {{ opcao.rotulo }}
              </button>
            </div>
          </div>

          <p>
            🚚 Chegada em <b>{{ entregaDias }} dias úteis</b>
            – previsão: {{ dataEntrega }}
          </p>

          <p>Frete: {{ formatarPreco(valorFrete) }}</p>

          <h3 class="price">
            TOTAL {{ formatarPreco(totalCarrinho + valorFrete) }}
          </h3>

          <br>

          <button class="btn red" @click="confirmarCompra">
            ✔ CONFIRMAR COMPRA
          </button>
        </template>
      </div>
    </ModalLoja>

    <NotificacaoLoja :mensagem="notificacao" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '../data/avatar.js'
import CabecalhoLoja from '../components/cabecalho/Header.vue'
import Login_perfil from './Login_perfil.vue'

const {
  usuario,
  modalAberto,
  modalTipo,
  loginDados,
  abrirPerfilOuLogin,
  entrar,
  sair,
  fecharModal
} = useAuth()
// --------------------------------------------------
// 1. CATEGORIAS
// --------------------------------------------------

const categorias = [
  'Todos',
  'Games',
  'Anime',
  'Desenhos',
  'Filmes e Séries',
  'Colecionáveis',
  'HQs e Mangás'
]

const icones = {
  Games: '🎮',
  Anime: '🍥',
  Desenhos: '🐭',
  'Filmes e Séries': '🎬',
  Colecionáveis: '🗿',
  'HQs e Mangás': '📚'
}

function iconeCategoria(categoria) {
  return icones[categoria] || '📦'
}

// --------------------------------------------------
// 2. PRODUTOS
// --------------------------------------------------

let proximoId = 10

const produtos = ref([
  {
    id: 1,
    name: 'Controle Retrô Pixel',
    cat: 'Games',
    desc: 'Controle sem fio estilo 8-bit, compatível com PC e consoles retrô.',
    price: 149.9,
    disc: 20,
    stock: 12,
    upd: false,
    r: [5, 4, 5, 4],
    img: ''
  },
  {
    id: 2,
    name: 'Action Figure Ninja',
    cat: 'Anime',
    desc: 'Figure articulado de 18 cm com acessórios e base de exibição.',
    price: 219.9,
    disc: 0,
    stock: 5,
    upd: false,
    r: [5, 5, 4],
    img: ''
  },
  {
    id: 3,
    name: 'Caneca Desenho Clássico',
    cat: 'Desenhos',
    desc: 'Caneca de cerâmica 350 ml com estampa de desenho animado dos anos 90.',
    price: 39.9,
    disc: 10,
    stock: 30,
    upd: true,
    r: [4, 4, 3],
    img: ''
  },
  {
    id: 4,
    name: 'Pôster Sci-Fi Cult',
    cat: 'Filmes e Séries',
    desc: 'Pôster A2 em papel fosco premium de ficção científica.',
    price: 59.9,
    disc: 0,
    stock: 0,
    upd: false,
    r: [4, 5],
    img: ''
  },
  {
    id: 5,
    name: 'Pelúcia Monstrinho',
    cat: 'Colecionáveis',
    desc: 'Pelúcia macia de 25 cm, edição limitada colecionável.',
    price: 89.9,
    disc: 15,
    stock: 8,
    upd: false,
    r: [5, 5, 5, 4],
    img: ''
  },
  {
    id: 6,
    name: 'Mangá Vol. 1 – Aventura',
    cat: 'HQs e Mangás',
    desc: 'Primeiro volume da saga de aventura, capa brochura com sobrecapa.',
    price: 34.9,
    disc: 0,
    stock: 20,
    upd: false,
    r: [4, 3, 5],
    img: ''
  }
])

// --------------------------------------------------
// 3. VENDAS DE EXEMPLO
// --------------------------------------------------

const vendas = ref([
  { pid: 1, qty: 3, cat: 'Games', v: 358.9 },
  { pid: 2, qty: 2, cat: 'Anime', v: 439.8 },
  { pid: 5, qty: 4, cat: 'Colecionáveis', v: 305.6 },
  { pid: 3, qty: 6, cat: 'Desenhos', v: 215.5 },
  { pid: 6, qty: 3, cat: 'HQs e Mangás', v: 104.7 }
])

// --------------------------------------------------
// 4. ESTADOS DA LOJA
// --------------------------------------------------
const carrinho = ref([])

const categoriaSelecionada = ref('Todos')
const tela = ref('shop')

const entregaDias = ref(2)

const produtoAtual = ref(null)
const produtoEmEdicao = ref(null)

const notificacao = ref('')
let temporizadorNotificacao = null

const formProduto = ref({
  name: '',
  cat: 'Games',
  desc: '',
  price: 0,
  disc: 0,
  stock: 1,
  img: ''
})

// --------------------------------------------------
// 5. CÁLCULOS
// --------------------------------------------------

function precoFinal(produto) {
  return produto.price * (1 - produto.disc / 100)
}

function mediaAvaliacoes(produto) {
  if (!produto.r.length) return 0

  const soma = produto.r.reduce((total, nota) => total + nota, 0)

  return soma / produto.r.length
}

function formatarPreco(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',')
}

// Produtos que correspondem à categoria e à pesquisa.
const produtosFiltrados = computed(() => {
  const termo = busca.value.toLowerCase()

  return produtos.value.filter(produto => {
    const categoriaCorreta =
      categoriaSelecionada.value === 'Todos' ||
      produto.cat === categoriaSelecionada.value

    const textoProduto =
      (produto.name + produto.desc + produto.cat).toLowerCase()

    return categoriaCorreta && textoProduto.includes(termo)
  })
})

const quantidadeCarrinho = computed(() => {
  return carrinho.value.reduce((total, item) => total + item.q, 0)
})

const carrinhoDetalhado = computed(() => {
  return carrinho.value.map(item => {
    const produto = produtos.value.find(p => p.id === item.id)

    return produto ? { ...produto, quantidade: item.q } : null
  }).filter(Boolean)
})

const totalCarrinho = computed(() => {
  return carrinhoDetalhado.value.reduce((total, item) => {
    return total + precoFinal(item) * item.quantidade
  }, 0)
})

const valorFrete = computed(() => {
  if (carrinho.value.length === 0) return 0
  if (entregaDias.value === 2) return 24.9
  if (entregaDias.value === 5) return 9.9

  return 0
})

const opcoesEntrega = [
  { dias: 2, rotulo: '⚡ EXPRESSA' },
  { dias: 5, rotulo: '📦 NORMAL' },
  { dias: 8, rotulo: '🐢 ECONÔMICA' }
]

const dataEntrega = computed(() => {
  const data = new Date()

  data.setDate(data.getDate() + entregaDias.value)

  return data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit'
  })
})

const usuarioLabel = computed(() => {
  if (!usuario.value) return 'ENTRAR'

  return usuario.value.role === 'seller' ? 'VENDEDOR' : 'USUÁRIO'
})

// --------------------------------------------------
// 6. ESTATÍSTICAS
// --------------------------------------------------

const totalVendas = computed(() => {
  return vendas.value.reduce((total, venda) => total + venda.v, 0)
})

const totalUnidades = computed(() => {
  return vendas.value.reduce((total, venda) => total + venda.qty, 0)
})

const vendasPorCategoria = computed(() => {
  const resultado = {}

  vendas.value.forEach(venda => {
    resultado[venda.cat] = (resultado[venda.cat] || 0) + venda.v
  })

  return resultado
})

const maiorVendaCategoria = computed(() => {
  return Math.max(...Object.values(vendasPorCategoria.value), 1)
})

const categoriaMaisVendida = computed(() => {
  const categoriasVendidas = Object.entries(vendasPorCategoria.value)

  categoriasVendidas.sort((a, b) => b[1] - a[1])

  return categoriasVendidas.length ? categoriasVendidas[0][0] : '-'
})

// --------------------------------------------------
// 7. NOTIFICAÇÕES E MODAIS
// --------------------------------------------------

function mostrarNotificacao(mensagem) {
  notificacao.value = mensagem

  clearTimeout(temporizadorNotificacao)

  temporizadorNotificacao = setTimeout(() => {
    notificacao.value = ''
  }, 2200)
}

// --------------------------------------------------
// 8. DETALHES E AVALIAÇÕES
// --------------------------------------------------

function abrirDetalhes(id) {
  produtoAtual.value = produtos.value.find(p => p.id === id)

  abrirModal('detalhes')
}

function avaliarProduto(nota) {
  if (!usuario.value) {
    mostrarNotificacao('Entre para avaliar')
    return
  }

  produtoAtual.value.r.push(nota)

  mostrarNotificacao('Obrigado pela avaliação!')

  abrirDetalhes(produtoAtual.value.id)
}

// --------------------------------------------------
// 9. LOGIN E PERFIL
// --------------------------------------------------

function abrirFormulario(produto = null) {
  // A edição e o cadastro usam o mesmo formulário.
  produtoEmEdicao.value = produto

  // Preenche o formulário com os dados do produto selecionado.
  if (produto) {
    formProduto.value = { ...produto }
  } else {
    formProduto.value = {
      name: '',
      cat: 'Games',
      desc: '',
      price: 0,
      disc: 0,
      stock: 1,
      img: ''
    }
  }

  abrirModal('formulario')
}

function selecionarImagem(evento) {
  const arquivo = evento.target.files[0]

  if (!arquivo) return

  const leitor = new FileReader()

  leitor.onload = () => {
    formProduto.value.img = leitor.result
  }

  leitor.readAsDataURL(arquivo)
}

function salvarProduto() {
  const dados = formProduto.value

  if (!dados.name.trim() || !(dados.price >= 0)) {
    mostrarNotificacao('Preencha nome e preço')
    return
  }

  const produto = {
    ...dados,
    name: dados.name.trim(),
    price: Number(dados.price),
    disc: Math.min(90, Math.max(0, Number(dados.disc) || 0)),
    stock: Math.max(0, Number(dados.stock) || 0)
  }

  if (!produtoEmEdicao.value) {
    produtos.value.unshift({
      id: ++proximoId,
      upd: false,
      r: [],
      ...produto
    })

    fecharModal()
    mostrarNotificacao('Produto publicado!')
  } else {
    const indice = produtos.value.findIndex(
      p => p.id === produtoEmEdicao.value.id
    )

    if (indice !== -1) {
      produtos.value[indice] = {
        ...produto,
        id: produtoEmEdicao.value.id,
        upd: true,
        r: produtoEmEdicao.value.r
      }
    }

    fecharModal()
    mostrarNotificacao('Produto atualizado!')
  }

  produtoEmEdicao.value = null
}

// --------------------------------------------------
// 11. CARRINHO
// --------------------------------------------------

function abrirCarrinho() {
  if (!usuario.value) {
    abrirModal('login')
    return
  }

  abrirModal('carrinho')
}

function adicionarCarrinho(produto) {
  if (!usuario.value) {
    abrirModal('login')
    return
  }

  const item = carrinho.value.find(c => c.id === produto.id)

  if (item) {
    if (item.q < produto.stock) {
      item.q++
    } else {
      mostrarNotificacao('Limite do estoque')
      return
    }
  } else {
    carrinho.value.push({
      id: produto.id,
      q: 1
    })
  }

  fecharModal()

  mostrarNotificacao('Adicionado ao carrinho')
}

function alterarQuantidade(id, alteracao) {
  const item = carrinho.value.find(c => c.id === id)

  if (!item) return

  const produto = produtos.value.find(p => p.id === id)

  if (alteracao > 0 && item.q >= produto.stock) {
    mostrarNotificacao('Limite do estoque')
    return
  }

  item.q += alteracao

  if (item.q <= 0) {
    carrinho.value = carrinho.value.filter(c => c.id !== id)
  }
}

function confirmarCompra() {
  if (!carrinho.value.length) return

  carrinho.value.forEach(item => {
    const produto = produtos.value.find(p => p.id === item.id)

    if (!produto) return

    // Atualiza o estoque.
    produto.stock = Math.max(0, produto.stock - item.q)

    // Registra a venda simulada.
    vendas.value.push({
      pid: produto.id,
      qty: item.q,
      cat: produto.cat,
      v: precoFinal(produto) * item.q
    })
  })

  const prazo = entregaDias.value

  carrinho.value = []

  fecharModal()

  mostrarNotificacao(
    'Compra confirmada! Chega em ' + prazo + ' dias úteis'
  )
}
</script>

<style scoped>
@import url('/src/css/base.css');
@import url('/src/css/avatar-bot.css');

.pixelshop-page {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-size: 22px;
  line-height: 1.15;
}

.pixelshop-page button,
.pixelshop-page input,
.pixelshop-page textarea,
.pixelshop-page select {
  font: inherit;
  color: inherit;
}

.pixelshop-page button {
  cursor: pointer;
}

.pixelshop-page button:focus-visible,
.pixelshop-page input:focus-visible,
.pixelshop-page textarea:focus-visible,
.pixelshop-page select:focus-visible {
  outline: 4px solid var(--gold);
  outline-offset: 2px;
}

.loja-conteudo {
  max-width: 1180px;
  margin: 0 auto;
  padding: 22px 16px 60px;
}

.pixelshop-page h2,
.pixelshop-page h3,
.pixelshop-page label {
  font-weight: 400;
  line-height: 1.5;
}

.pixelshop-page h2 {
  font-size: 14px;
  margin: 0;
}

.pixelshop-page h2::before {
  content: "> ";
  color: var(--red);
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
  color: white;
}

.btn {
  background: var(--cyan);
  color: var(--ink) !important;
  border: 4px solid var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  padding: 9px 12px;
  cursor: pointer;
  font-size: 10px !important;
  margin: 3px;
}

.btn:hover {
  transform: translate(-2px, -2px);
}

.btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--ink);
}

.btn.red {
  background: var(--red);
  color: white !important;
}

.btn.gold {
  background: var(--gold);
}

.btn:disabled {
  background: var(--line);
  color: var(--muted) !important;
  cursor: not-allowed;
  transform: none;
}

.opt {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.opt .btn {
  flex: 1;
}

.opt .btn.sel {
  background: var(--gold);
}

.det {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.det h3 {
  font-size: 11px;
  margin: 10px 0;
  overflow-wrap: anywhere;
}

.ph {
  aspect-ratio: 4 / 3;
  width: 100%;
  border: 4px solid var(--ink);
  background: var(--line);
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

.cat {
  display: inline-block;
  background: var(--cyan);
  color: var(--ink);
  padding: 2px 8px;
  font-size: 19px;
  border: 3px solid var(--ink);
  width: max-content;
}

.tag-static {
  display: inline-block;
  background: var(--red);
  color: white;
  padding: 4px 6px;
  border: 3px solid var(--ink);
  font-size: 9px;
}

.price {
  font-size: 12px;
  color: var(--gold);
  margin: 8px 0;
}

.old {
  text-decoration: line-through;
  color: var(--muted);
  font-size: 20px;
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
  color: var(--line);
  padding: 0 2px;
}

.stars button.on {
  color: var(--gold);
}

.muted {
  color: var(--muted);
}

.ok {
  color: var(--green);
}

.no {
  color: var(--red);
}

.descricao-titulo {
  margin-top: 16px;
  font-size: 11px;
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
  background: var(--ink);
  border: 4px solid var(--line);
  padding: 8px 12px;
  color: var(--text);
}

.f textarea {
  resize: vertical;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin: 16px 0;
}

.stat {
  background: var(--card);
  border: 4px solid var(--ink);
  padding: 10px;
}

.stat b {
  display: block;
  font-size: 14px;
  color: var(--gold);
  margin-top: 6px;
  overflow-wrap: anywhere;
}

.stat .categoria-top {
  font-size: 10px;
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
}

.bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.bar span {
  width: 110px;
  font-size: 19px;
}

.bar i {
  display: block;
  min-width: 2px;
  height: 18px;
  background: var(--red);
  border: 3px solid var(--ink);
}

.bar b {
  font-size: 16px;
}

.ci {
  display: flex;
  gap: 10px;
  align-items: center;
  border: 4px solid var(--ink);
  background: var(--card);
  padding: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.ci .ph {
  width: 64px;
  font-size: 30px;
  aspect-ratio: 1;
}

.item-info {
  flex: 1;
  min-width: 100px;
}

@media (max-width: 620px) {
  .det {
    grid-template-columns: 1fr;
  }

  .loja-conteudo {
    padding: 16px 12px 40px;
  }
}
</style>