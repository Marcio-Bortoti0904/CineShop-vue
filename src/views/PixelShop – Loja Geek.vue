<template>
  <div class="pixel-shop">

    <header class="top">

  <!-- LOGOTIPO -->
  <div class="logo">
    <b>PX</b>PIXEL<i>SHOP</i>
  </div>

  <!-- COMPONENTE DE PESQUISA -->
  <Busca
    v-model="busca"
    placeholder="🔍 Buscar produtos..."
  />

  <div class="right">

    <!-- ACESSO AO CARRINHO -->
    <button class="btn gold" @click="abrirCarrinho">
      🛒 <span>{{ quantidadeCarrinho }}</span>
    </button>

    <!-- COMPONENTE DE PERFIL -->
    <Perfil
      :usuario="usuario"
      @abrir="abrirPerfilOuLogin"
    />

  </div>

</header>

    <main>
      <div class="row">
        <h2>{{ view === 'shop' ? 'PRODUTOS' : 'MEUS PRODUTOS' }}</h2>

        <span v-if="usuario && usuario.role === 'seller'">
          <button class="btn" @click="abrirEstatisticas">
            📊 PERFIL
          </button>

          <button class="btn red" @click="abrirFormulario()">
            + CRIAR
          </button>
        </span>
      </div>

      <div class="chips">
        <button
          v-for="categoria in categorias"
          :key="categoria"
          class="chip"
          :class="{ on: categoriaAtual === categoria }"
          @click="categoriaAtual = categoria"
        >
          {{ categoria }}
        </button>
      </div>

      <div class="grid">
        <button
          v-for="produto in produtosFiltrados"
          :key="produto.id"
          class="card"
          @click="abrirDetalhes(produto)"
        >
          <div class="ph">
            <img
              v-if="produto.img"
              :src="produto.img"
              :alt="produto.name"
            >

            <span v-else>
              {{ emojis[produto.cat] || '📦' }}
            </span>

            <span v-if="produto.disc" class="tag">
              -{{ produto.disc }}%
            </span>
          </div>

          <span class="cat">{{ produto.cat }}</span>

          <h3>{{ produto.name }}</h3>

          <p>{{ produto.desc }}</p>

          <div>
            <span class="price">
              {{ moeda(precoFinal(produto)) }}
            </span>

            <span v-if="produto.disc" class="old">
              {{ moeda(produto.price) }}
            </span>
          </div>

          <div class="st">
            <span
              v-for="estrela in 5"
              :key="estrela"
            >
              {{ estrela <= Math.round(media(produto)) ? '★' : '☆' }}
            </span>

            <span class="muted">
              ({{ produto.r.length }})
            </span>
          </div>
        </button>

        <p v-if="produtosFiltrados.length === 0">
          Nenhum produto encontrado.
        </p>
      </div>
    </main>

    <!-- MODAL PRINCIPAL -->
    <div
      v-if="modalAberto"
      class="ov"
      @click.self="fecharModal"
    >
      <div class="box">

        <button class="btn red x" @click="fecharModal">
          X
        </button>

        <!-- DETALHES DO PRODUTO -->
        <template
          v-if="modalTipo === 'detalhes' && produtoSelecionado"
        >
          <div class="det">
            <div>
              <div class="ph">
                <img
                  v-if="produtoSelecionado.img"
                  :src="produtoSelecionado.img"
                  :alt="produtoSelecionado.name"
                >

                <span v-else>
                  {{ emojis[produtoSelecionado.cat] || '📦' }}
                </span>

                <span
                  v-if="produtoSelecionado.disc"
                  class="tag"
                >
                  -{{ produtoSelecionado.disc }}%
                </span>
              </div>

              <p class="muted">
                <span
                  v-if="produtoSelecionado.upd"
                  class="tag static-tag"
                >
                  ATUALIZADO
                </span>
              </p>
            </div>

            <div>
              <span class="cat">
                {{ produtoSelecionado.cat }}
              </span>

              <h3>{{ produtoSelecionado.name }}</h3>

              <div class="price">
                {{ moeda(precoFinal(produtoSelecionado)) }}

                <span
                  v-if="produtoSelecionado.disc"
                  class="old"
                >
                  {{ moeda(produtoSelecionado.price) }}
                </span>
              </div>

              <p
                :class="produtoSelecionado.stock <= 0 ? 'no' : 'ok'"
              >
                {{ produtoSelecionado.stock <= 0
                  ? '✖ INDISPONÍVEL – Estoque: 0'
                  : `✔ Em estoque: ${produtoSelecionado.stock} un.` }}
              </p>

              <div class="stars">
                <button
                  v-for="estrela in 5"
                  :key="estrela"
                  :class="{
                    on: estrela <= Math.round(media(produtoSelecionado))
                  }"
                  @click="avaliarProduto(estrela)"
                >
                  ★
                </button>
              </div>

              <div class="muted">
                Média {{ media(produtoSelecionado).toFixed(1) }}
                ({{ produtoSelecionado.r.length }} avaliações)
              </div>
            </div>
          </div>

          <h3 class="description-title">DESCRIÇÃO</h3>

          <p>{{ produtoSelecionado.desc }}</p>

          <button
            class="btn"
            :disabled="produtoSelecionado.stock <= 0"
            @click="adicionarCarrinho(produtoSelecionado)"
          >
            🛒 ADICIONAR AO CARRINHO
          </button>

          <button
            v-if="usuario?.role === 'seller'"
            class="btn gold"
            @click="abrirFormulario(produtoSelecionado)"
          >
            ✏ EDITAR
          </button>
        </template>

        <!-- LOGIN -->
        <template v-else-if="modalTipo === 'login'">
          <h3>LOGIN</h3>

          <div class="f">
            <label>NOME</label>
            <input v-model="loginDados.nome" placeholder="Seu nome">
          </div>

          <div class="f">
            <label>E-MAIL</label>
            <input
              v-model="loginDados.email"
              type="email"
              placeholder="voce@email.com"
            >
          </div>

          <div class="f">
            <label>SENHA</label>
            <input
              v-model="loginDados.senha"
              type="password"
              placeholder="••••••"
            >
          </div>

          <div class="f">
            <label>VOCÊ QUER SER:</label>

            <div class="opt">
              <button
                class="btn"
                :class="{ sel: loginDados.role === 'user' }"
                @click="loginDados.role = 'user'"
              >
                👤 USUÁRIO
              </button>

              <button
                class="btn"
                :class="{ sel: loginDados.role === 'seller' }"
                @click="loginDados.role = 'seller'"
              >
                🏪 VENDEDOR
              </button>
            </div>
          </div>

          <button class="btn red" @click="entrar">
            ENTRAR
          </button>
        </template>

        <!-- PERFIL -->
        <template v-else-if="modalTipo === 'perfil' && usuario">
          <h3>PERFIL</h3>

          <p>
            👾 {{ usuario.name }} –
            {{ usuario.role === 'seller' ? 'Vendedor' : 'Usuário' }}
          </p>

          <template v-if="usuario.role === 'seller'">
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

          <br><br>

          <button class="btn gold" @click="sair">
            SAIR
          </button>
        </template>

        <!-- ESTATÍSTICAS -->
        <template v-else-if="modalTipo === 'estatisticas'">
          <h3>📊 VENDAS DO MÊS</h3>

          <div class="stats">
            <div class="stat">
              Faturamento
              <b>{{ moeda(totalVendas) }}</b>
            </div>

            <div class="stat">
              Unidades
              <b>{{ unidadesVendidas }}</b>
            </div>

            <div class="stat">
              Pedidos
              <b>{{ vendas.length }}</b>
            </div>

            <div class="stat">
              Top categoria
              <b class="top-category">{{ categoriaMaisVendida }}</b>
            </div>
          </div>

          <h3>VENDAS POR CATEGORIA</h3>

          <div class="bars">
            <div
              v-for="item in vendasPorCategoria"
              :key="item.categoria"
              class="bar"
            >
              <span>{{ item.categoria }}</span>

              <i
                :style="{
                  width: `${item.valor / maiorVenda * 55}%`
                }"
              ></i>

              <b>{{ moeda(item.valor) }}</b>
            </div>
          </div>

          <br>

          <button class="btn red" @click="abrirFormulario()">
            + CRIAR PRODUTO
          </button>
        </template>

      </div>
    </div>

    <!-- CADASTRO E EDIÇÃO -->
    <div
      v-if="drawerAberto"
      class="ov drawer"
      @click.self="fecharDrawer"
    >
      <div class="box">

        <button class="btn red x" @click="fecharDrawer">
          X
        </button>

        <h3>
          {{ editandoProduto ? 'EDITAR PRODUTO' : 'NOVO PRODUTO' }}
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
          <textarea v-model="formulario.desc" rows="4"></textarea>
        </div>

        <button class="btn red" @click="salvarProduto">
          {{ editandoProduto ? 'SALVAR' : 'PUBLICAR' }}
        </button>

      </div>
    </div>

    <!-- CARRINHO -->
    <div
      v-if="carrinhoAberto"
      class="ov"
      @click.self="fecharCarrinho"
    >
      <div class="box">

        <button class="btn red x" @click="fecharCarrinho">
          X
        </button>

        <h3>🛒 CARRINHO</h3>

        <div
          v-for="item in carrinho"
          :key="item.id"
          class="ci"
        >
          <div class="ph">
            <img
              v-if="buscarProduto(item.id)?.img"
              :src="buscarProduto(item.id).img"
              alt=""
            >

            <span v-else>
              {{ emojis[buscarProduto(item.id)?.cat] || '📦' }}
            </span>
          </div>

          <div class="cart-product">
            <b>{{ buscarProduto(item.id)?.name }}</b>
            <br>
            {{ moeda(precoFinal(buscarProduto(item.id))) }}
          </div>

          <button class="btn" @click="alterarQuantidade(item.id, -1)">-</button>

          {{ item.q }}

          <button class="btn" @click="alterarQuantidade(item.id, 1)">+</button>
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
                @click="frete = opcao.dias"
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

          <button class="btn red" @click="confirmarCompra">
            ✔ CONFIRMAR COMPRA
          </button>
        </template>

      </div>
    </div>

    <!-- NOTIFICAÇÃO -->
    <div v-if="toastVisivel" class="toast">
      {{ mensagemToast }}
    </div>

  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

import Busca from '../components/busca.vue'
import Perfil from '../components/avatar-bot.vue'

const categorias = [
  'Todos',
  'Games',
  'Anime',
  'Desenhos',
  'Filmes e Séries',
  'Colecionáveis',
  'HQs e Mangás'
]

const emojis = {
  Games: '🎮',
  Anime: '🍥',
  Desenhos: '🐭',
  'Filmes e Séries': '🎬',
  Colecionáveis: '🗿',
  'HQs e Mangás': '📚'
}

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

const vendas = ref([
  { pid: 1, qty: 3, cat: 'Games', v: 358.9 },
  { pid: 2, qty: 2, cat: 'Anime', v: 439.8 },
  { pid: 5, qty: 4, cat: 'Colecionáveis', v: 305.6 },
  { pid: 3, qty: 6, cat: 'Desenhos', v: 215.5 },
  { pid: 6, qty: 3, cat: 'HQs e Mangás', v: 104.7 }
])

import { usuario } from '../data/usuario.js'
const carrinho = ref([])
const categoriaAtual = ref('Todos')
const busca = ref('')
const frete = ref(2)
const proximoId = ref(10)
const view = ref('shop')

const modalAberto = ref(false)
const modalTipo = ref('')
const produtoSelecionado = ref(null)

const drawerAberto = ref(false)
const carrinhoAberto = ref(false)

const loginDados = reactive({
  nome: '',
  email: '',
  senha: '',
  role: 'user'
})

const formulario = reactive({
  name: '',
  cat: 'Games',
  desc: '',
  price: '',
  disc: 0,
  stock: 1,
  img: ''
})

const editandoProduto = ref(null)

const toastVisivel = ref(false)
const mensagemToast = ref('')
let toastTimeout

// FILTRO DE PRODUTOS
const produtosFiltrados = computed(() => {
  const termo = busca.value.toLowerCase()

  return produtos.value.filter(produto => {
    const categoriaCorreta =
      categoriaAtual.value === 'Todos' ||
      produto.cat === categoriaAtual.value

    const texto = (
      produto.name +
      produto.desc +
      produto.cat
    ).toLowerCase()

    return categoriaCorreta && texto.includes(termo)
  })
})

// QUANTIDADE NO CARRINHO
const quantidadeCarrinho = computed(() =>
  carrinho.value.reduce((total, item) => total + item.q, 0)
)

// TOTAL DO CARRINHO
const totalCarrinho = computed(() =>
  carrinho.value.reduce((total, item) => {
    const produto = buscarProduto(item.id)

    return total + (
      produto
        ? precoFinal(produto) * item.q
        : 0
    )
  }, 0)
)

// FRETE
const valorFrete = computed(() => {
  if (!carrinho.value.length) return 0
  if (frete.value === 2) return 24.9
  if (frete.value === 5) return 9.9

  return 0
})

const dataEntrega = computed(() => {
  const data = new Date()

  data.setDate(data.getDate() + frete.value)

  return data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit'
  })
})

const opcoesFrete = [
  { dias: 2, rotulo: '⚡ EXPRESSA' },
  { dias: 5, rotulo: '📦 NORMAL' },
  { dias: 8, rotulo: '🐢 ECONÔMICA' }
]

// ESTATÍSTICAS
const totalVendas = computed(() =>
  vendas.value.reduce((total, venda) => total + venda.v, 0)
)

const unidadesVendidas = computed(() =>
  vendas.value.reduce((total, venda) => total + venda.qty, 0)
)

const vendasPorCategoria = computed(() => {
  const agrupadas = {}

  vendas.value.forEach(venda => {
    agrupadas[venda.cat] =
      (agrupadas[venda.cat] || 0) + venda.v
  })

  return Object.entries(agrupadas)
    .map(([categoria, valor]) => ({
      categoria,
      valor
    }))
    .sort((a, b) => b.valor - a.valor)
})

const maiorVenda = computed(() =>
  Math.max(
    ...vendasPorCategoria.value.map(item => item.valor),
    1
  )
)

const categoriaMaisVendida = computed(() =>
  vendasPorCategoria.value[0]?.categoria || '-'
)

// FUNÇÕES AUXILIARES
function moeda(valor) {
  return 'R$ ' +
    Number(valor || 0).toFixed(2).replace('.', ',')
}

function precoFinal(produto) {
  return produto.price * (1 - produto.disc / 100)
}

function media(produto) {
  if (!produto.r.length) return 0

  return produto.r.reduce(
    (total, nota) => total + nota,
    0
  ) / produto.r.length
}

function buscarProduto(id) {
  return produtos.value.find(produto => produto.id === id)
}

// NOTIFICAÇÃO
function mostrarToast(mensagem) {
  mensagemToast.value = mensagem
  toastVisivel.value = true

  clearTimeout(toastTimeout)

  toastTimeout = setTimeout(() => {
    toastVisivel.value = false
  }, 2200)
}

// MODAIS
function abrirModal(tipo) {
  modalTipo.value = tipo
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
  modalTipo.value = ''
}

function fecharDrawer() {
  drawerAberto.value = false
}

function fecharCarrinho() {
  carrinhoAberto.value = false
}

// DETALHES
function abrirDetalhes(produto) {
  produtoSelecionado.value = produto
  abrirModal('detalhes')
}

// LOGIN E PERFIL
function abrirPerfilOuLogin() {
  if (!usuario.value) {
    abrirModal('login')
    return
  }

  abrirModal('perfil')
}

function entrar() {
  if (!loginDados.nome.trim()) {
    mostrarToast('Informe seu nome')
    return
  }

  usuario.value = {
    name: loginDados.nome.trim(),
    role: loginDados.role
  }

  fecharModal()

  mostrarToast(`Bem-vindo, ${usuario.value.name}!`)
}

function sair() {
  usuario.value = null
  carrinho.value = []

  fecharModal()
}

// AVALIAÇÕES
function avaliarProduto(nota) {
  if (!usuario.value) {
    mostrarToast('Entre para avaliar')
    return
  }

  produtoSelecionado.value.r.push(nota)

  mostrarToast('Obrigado pela avaliação!')
}

// ADICIONAR AO CARRINHO
function adicionarCarrinho(produto) {
  if (!usuario.value) {
    abrirModal('login')
    return
  }

  const item = carrinho.value.find(
    item => item.id === produto.id
  )

  if (item) {
    if (item.q < produto.stock) {
      item.q++
    } else {
      mostrarToast('Limite do estoque')
      return
    }
  } else {
    carrinho.value.push({
      id: produto.id,
      q: 1
    })
  }

  mostrarToast('Adicionado ao carrinho')
  fecharModal()
}

// ESTATÍSTICAS
function abrirEstatisticas() {
  fecharModal()
  abrirModal('estatisticas')
}

// CADASTRO E EDIÇÃO
function abrirFormulario(produto = null) {
  editandoProduto.value = produto

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

  fecharModal()
  drawerAberto.value = true
}

// IMAGEM
function selecionarImagem(evento) {
  const arquivo = evento.target.files?.[0]

  if (!arquivo) return

  const leitor = new FileReader()

  leitor.onload = () => {
    formulario.img = leitor.result
  }

  leitor.readAsDataURL(arquivo)
}

// SALVAR PRODUTO
function salvarProduto() {
  const nome = formulario.name.trim()
  const preco = Number(formulario.price)

  if (!nome || !(preco >= 0) || formulario.price === '') {
    mostrarToast('Preencha nome e preço')
    return
  }

  const dados = {
    name: nome,
    cat: formulario.cat,
    price: preco,
    disc: Math.min(
      90,
      Math.max(0, Number(formulario.disc) || 0)
    ),
    stock: Math.max(
      0,
      Number(formulario.stock) || 0
    ),
    desc: formulario.desc,
    img: formulario.img
  }

  if (editandoProduto.value) {
    Object.assign(
      editandoProduto.value,
      dados,
      { upd: true }
    )
  } else {
    produtos.value.unshift({
      id: ++proximoId.value,
      upd: false,
      r: [],
      ...dados
    })
  }

  const estavaEditando = !!editandoProduto.value

  fecharDrawer()

  mostrarToast(
    estavaEditando
      ? 'Produto atualizado!'
      : 'Produto publicado!'
  )

  editandoProduto.value = null
}

// CARRINHO
function abrirCarrinho() {
  if (!usuario.value) {
    abrirModal('login')
    return
  }

  carrinhoAberto.value = true
}

function alterarQuantidade(id, alteracao) {
  const item = carrinho.value.find(
    item => item.id === id
  )

  if (!item) return

  if (alteracao < 0) {
    item.q--

    if (item.q <= 0) {
      carrinho.value = carrinho.value.filter(
        itemCarrinho => itemCarrinho.id !== id
      )
    }

    return
  }

  const produto = buscarProduto(id)

  if (produto && item.q < produto.stock) {
    item.q++
  } else {
    mostrarToast('Limite do estoque')
  }
}

// FINALIZAR COMPRA
function confirmarCompra() {
  if (!carrinho.value.length) return

  carrinho.value.forEach(item => {
    const produto = buscarProduto(item.id)

    if (!produto) return

    produto.stock = Math.max(
      0,
      produto.stock - item.q
    )

    vendas.value.push({
      pid: produto.id,
      qty: item.q,
      cat: produto.cat,
      v: precoFinal(produto) * item.q
    })
  })

  const dias = frete.value

  carrinho.value = []

  fecharCarrinho()

  mostrarToast(
    `Compra confirmada! Chega em ${dias} dias úteis`
  )
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

.pixel-shop {
  --bg: #3B4A66;
  --bar: #26324A;
  --card: #2F3D58;
  --ink: #0D1220;
  --text: #F2F5FA;
  --muted: #B9C3D6;
  --red: #E8525A;
  --cyan: #27C3D3;
  --gold: #F4C20D;
  --green: #5BD16F;
  --line: #55678A;

  min-height: 100vh;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background-color: var(--bg);
  color: var(--text);
  font: 22px/1.15 "VT323", ui-monospace, monospace;

  background-image:
    linear-gradient(rgba(0, 0, 0, .08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, .08) 1px, transparent 1px);

  background-size: 8px 8px;
}

.pixel-shop * {
  box-sizing: border-box;
}

.pixel-shop h1,
.pixel-shop h2,
.pixel-shop h3,
.pixel-shop .logo,
.pixel-shop .btn,
.pixel-shop label {
  font-family: "Press Start 2P", "VT323", monospace;
  font-weight: 400;
  line-height: 1.5;
}

.pixel-shop button,
.pixel-shop input,
.pixel-shop textarea,
.pixel-shop select {
  font: inherit;
  color: inherit;
}

.pixel-shop :focus-visible {
  outline: 4px solid var(--gold);
  outline-offset: 2px;
}

.top {
  background: var(--bar);
  border-bottom: 6px solid var(--ink);
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  flex-wrap: wrap;
  position: sticky;
  top: env(safe-area-inset-top, 0px);
  z-index: 5;
}

.logo {
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
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

.right {
  display: flex;
  gap: 10px;
  align-items: center;
}

main {
  max-width: 1180px;
  margin: 0 auto;
  padding: 22px 16px 60px;
}

.pixel-shop h2 {
  font-size: 14px;
  margin: 0;
}

.pixel-shop h2::before {
  content: "> ";
  color: var(--red);
}

.btn {
  background: var(--cyan);
  color: var(--ink) !important;
  border: 4px solid var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  padding: 9px 12px;
  cursor: pointer;
  font-size: 10px;
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
  color: #fff !important;
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

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.chip {
  background: var(--card);
  border: 4px solid var(--ink);
  padding: 4px 10px;
  cursor: pointer;
  font-size: 20px;
}

.chip.on {
  background: var(--gold);
  color: var(--ink);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 22px;
}

.card {
  background: var(--card);
  border: 4px solid var(--ink);
  box-shadow: 6px 6px 0 var(--ink);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  background: var(--red);
  color: #fff;
  font: 9px "Press Start 2P", monospace;
  padding: 4px 6px;
  border: 3px solid var(--ink);
}

.static-tag {
  position: static;
  display: inline-block;
}

.card h3 {
  font-size: 11px;
  margin: 0;
  word-break: break-word;
}

.card p {
  margin: 0;
  color: var(--muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price {
  font-family: "Press Start 2P", monospace;
  font-size: 12px;
  color: var(--gold);
}

.old {
  text-decoration: line-through;
  color: var(--muted);
  font-size: 20px;
  font-family: "VT323", monospace;
}

.st {
  color: var(--gold);
  letter-spacing: 2px;
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

.ok {
  color: var(--green);
}

.no {
  color: var(--red);
}

.ov {
  position: fixed;
  inset: 0;
  background: rgba(5, 8, 16, .7);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
}

.box {
  background: var(--bg);
  border: 6px solid var(--ink);
  box-shadow: 8px 8px 0 var(--ink);
  width: min(760px, 100%);
  max-height: 92vh;
  overflow: auto;
  padding: 16px;
  position: relative;
}

.x {
  position: absolute;
  top: 8px;
  right: 8px;
}

.det {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.description-title {
  margin-top: 16px;
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

.cart-product {
  flex: 1;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.stat {
  background: var(--card);
  border: 4px solid var(--ink);
  padding: 10px;
}

.stat b {
  display: block;
  font: 14px "Press Start 2P", monospace;
  color: var(--gold);
  margin-top: 6px;
}

.top-category {
  font-size: 10px !important;
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bar span {
  width: 110px;
  font-size: 19px;
}

.bar i {
  display: block;
  height: 18px;
  background: var(--red);
  border: 3px solid var(--ink);
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

.muted {
  color: var(--muted);
}

.toast {
  position: fixed;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  background: var(--ink);
  border: 4px solid var(--gold);
  padding: 10px 16px;
  z-index: 50;
  font-size: 20px;
  max-width: calc(100% - 24px);
  text-align: center;
}

.drawer {
  align-items: stretch;
  justify-content: flex-end;
  padding: 0;
}

.drawer .box {
  width: min(430px, 100%);
  max-height: none;
  height: 100%;
  box-shadow: none;
}

@media (prefers-color-scheme: dark) {
  .pixel-shop {
    --bg: #2B3548;
    --bar: #1A2133;
    --card: #222C42;
    --line: #44557A;
  }
}

@media (max-width: 620px) {
  .det {
    grid-template-columns: 1fr;
  }
}

.f input,
.f textarea,
.f select {
  width: 100%;
  background: var(--ink);
  border: 4px solid var(--line);
  padding: 8px 12px;
}
</style>