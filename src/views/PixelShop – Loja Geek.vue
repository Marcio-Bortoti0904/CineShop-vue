<template>
  <div class="pixel-shop">
 
    <header class="top">
      <Header
        :usuario="usuario"
        @abrirPerfil="abrirPerfilOuLogin"
      />
 
      <div class="right">
 
        <!-- ACESSO AO CARRINHO -->
        <button class="btn gold" @click="abrirCarrinho">
          🛒 <span>{{ quantidadeCarrinho }}</span>
        </button>
 
      </div>
    </header>
 
    <main>
      <div class="row">
        <h1>{{ view === 'shop' ? 'PRODUTOS' : 'MEUS PRODUTOS' }}</h1>
 
        <input
          v-model="busca"
          class="search"
          placeholder="Buscar produto..."
        >
 
        <span v-if="ehVendedor">
          <button class="btn" @click="alternarVisao">
            {{ view === 'shop' ? '🏪 MEUS PRODUTOS' : '🛍 LOJA' }}
          </button>
 
          <button class="btn" @click="abrirEstatisticas">
            📊 PERFIL
          </button>
 
          <button class="btn red" @click="abrirFormulario()">
            + CRIAR
          </button>
        </span>
      </div>
 
      <!-- ALERTA DE ESTOQUE BAIXO (RNF05) -->
      <p v-if="view === 'mine' && produtosEstoqueBaixo.length" class="alerta">
        ⚠ Estoque baixo (5 ou menos):
        {{ produtosEstoqueBaixo.map(p => `${p.name} (${p.stock})`).join(', ') }}
      </p>
 
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
        <Produtocard
          v-for="produto in produtosFiltrados"
          :key="produto.id"
          :produto="produto"
          completo
          :media="media(produto)"
          :total-avaliacoes="notas(produto).length"
          :alerta-estoque="view === 'mine'"
          @abrir="abrirDetalhes(produto)"
        />
 
        <p v-if="carregando">
          Carregando produtos...
        </p>
 
        <p v-else-if="produtosFiltrados.length === 0">
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
                Vendido por {{ produtoSelecionado.loja }}
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
                ({{ notas(produtoSelecionado).length }} avaliações)
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
            v-if="ehDono(produtoSelecionado)"
            class="btn gold"
            @click="abrirFormulario(produtoSelecionado)"
          >
            ✏ EDITAR
          </button>
        </template>
 
        <!-- LOGIN -->
        <template v-else-if="modalTipo === 'login'">
          <h3>{{ loginDados.modo === 'cadastro' ? 'CADASTRO' : 'LOGIN' }}</h3>
 
          <div v-if="loginDados.modo === 'cadastro'" class="f">
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
 
          <div v-if="loginDados.modo === 'cadastro'" class="f">
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
            {{ loginDados.modo === 'cadastro' ? 'CRIAR CONTA' : 'ENTRAR' }}
          </button>
 
          <button
            class="btn"
            @click="loginDados.modo = loginDados.modo === 'cadastro' ? 'entrar' : 'cadastro'"
          >
            {{ loginDados.modo === 'cadastro' ? 'JÁ TENHO CONTA' : 'CRIAR UMA CONTA' }}
          </button>
        </template>
 
        <!-- PERFIL -->
        <template v-else-if="modalTipo === 'perfil' && usuario">
          <h3>PERFIL</h3>
 
          <p>
            👾 {{ usuario.name }} –
            {{ ehVendedor ? 'Vendedor' : 'Usuário' }}
          </p>
 
          <template v-if="ehVendedor">
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
          <h3>📊 MINHAS VENDAS</h3>
 
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
              Produtos vendidos
              <b>{{ vendas.length }}</b>
            </div>
 
            <div class="stat">
              Top categoria
              <b class="top-category">{{ categoriaMaisVendida }}</b>
            </div>
          </div>
 
          <h3>VENDAS POR CATEGORIA</h3>
 
          <p v-if="!vendasPorCategoria.length" class="muted">
            Nenhuma venda registrada ainda.
          </p>
 
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
 
        <button
          v-if="editandoProduto"
          class="btn gold"
          @click="excluirProduto"
        >
          🗑 EXCLUIR
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
              v-if="item.img"
              :src="item.img"
              alt=""
            >
 
            <span v-else>
              {{ emojis[item.cat] || '📦' }}
            </span>
          </div>
 
          <div class="cart-product">
            <b>{{ item.name }}</b>
            <br>
            {{ moeda(precoFinal(item)) }}
          </div>
 
          <button class="btn" @click="alterarQuantidade(item.id, -1)">-</button>
 
          {{ item.q }}
 
          <button class="btn" @click="alterarQuantidade(item.id, 1)">+</button>
 
          <button class="btn red" @click="removerItem(item.id)">
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
import { computed, reactive, ref, watch } from 'vue'
 
import { api } from '../api.js'
import { usuario } from '../data/avatar.js'
import Header from '../components/Header.vue'
import Produtocard from '../components/Produtocard.vue'
import { emojisCategoria as emojis } from '../data/emojis.js'
 
// CATEGORIAS (as novas são criadas no banco automaticamente ao salvar o produto)
const categorias = [
  'Todos',
  'Games',
  'Anime',
  'Desenhos',
  'Filmes e Séries',
  'Colecionáveis',
  'HQs e Mangás'
]
 
// DADOS (vêm da API / banco de dados)
const produtos = ref([])
const vendas = ref([])
const totaisVendas = reactive({ valor: 0, unidades: 0 })
const carregando = ref(false)
 
// AVALIAÇÕES: ainda não existem no banco, ficam só na sessão atual
const avaliacoes = reactive({})
 
const carrinho = ref([])
const categoriaAtual = ref('Todos')
const busca = ref('')
const frete = ref(2)
const view = ref('shop')
 
const modalAberto = ref(false)
const modalTipo = ref('')
const produtoSelecionado = ref(null)
 
const drawerAberto = ref(false)
const carrinhoAberto = ref(false)
 
const loginDados = reactive({
  modo: 'entrar',
  nome: '',
  email: '',
  senha: '',
  role: 'user',
  lembrar: true
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
 
// USUÁRIO
const ehVendedor = computed(() => usuario.value?.role === 'seller')
 
function ehDono(produto) {
  return ehVendedor.value && produto.idVendedor === usuario.value.id
}
 
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
 
// ALERTA DE ESTOQUE BAIXO (RNF05)
const produtosEstoqueBaixo = computed(() =>
  produtos.value.filter(produto => produto.stock <= 5)
)
 
// QUANTIDADE NO CARRINHO
const quantidadeCarrinho = computed(() =>
  carrinho.value.reduce((total, item) => total + item.q, 0)
)
 
// TOTAL DO CARRINHO
const totalCarrinho = computed(() =>
  carrinho.value.reduce(
    (total, item) => total + precoFinal(item) * item.q,
    0
  )
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
const totalVendas = computed(() => totaisVendas.valor)
 
const unidadesVendidas = computed(() => totaisVendas.unidades)
 
const vendasPorCategoria = computed(() => {
  const agrupadas = {}
 
  vendas.value.forEach(venda => {
    const categoria = venda.cat || 'Sem categoria'
 
    agrupadas[categoria] =
      (agrupadas[categoria] || 0) + venda.v
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
 
function notas(produto) {
  return avaliacoes[produto.id] || []
}
 
function media(produto) {
  const lista = notas(produto)
 
  if (!lista.length) return 0
 
  return lista.reduce(
    (total, nota) => total + nota,
    0
  ) / lista.length
}
 
// A API devolve "nome"; a tela usa "name"
function normalizarProduto(produto) {
  return {
    id: produto.id,
    name: produto.nome,
    cat: produto.cat || 'Sem categoria',
    desc: produto.desc,
    price: Number(produto.price),
    disc: produto.disc || 0,
    stock: produto.stock,
    img: produto.img || '',
    idVendedor: produto.idVendedor,
    loja: produto.loja
  }
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
 
// CARREGAR PRODUTOS DA API
async function carregarProdutos() {
  carregando.value = true
 
  try {
    const rota = view.value === 'mine' && ehVendedor.value
      ? '/produtos/meus'
      : '/produtos'
 
    const lista = await api(rota)
 
    produtos.value = lista.map(normalizarProduto)
  } catch (erro) {
    mostrarToast(erro.message)
  } finally {
    carregando.value = false
  }
}
 
function alternarVisao() {
  view.value = view.value === 'shop' ? 'mine' : 'shop'
}
 
// Recarrega ao abrir a página, ao trocar de visão e ao entrar/sair da conta
watch(
  [view, () => usuario.value?.id],
  () => {
    if (!ehVendedor.value) view.value = 'shop'
    carregarProdutos()
  },
  { immediate: true }
)
 
// CARRINHO: guardado no navegador, separado por usuário
function chaveCarrinho() {
  return usuario.value ? `cineshop_carrinho_${usuario.value.id}` : null
}
 
watch(
  () => usuario.value?.id,
  () => {
    const chave = chaveCarrinho()
 
    try {
      carrinho.value = chave
        ? JSON.parse(localStorage.getItem(chave)) || []
        : []
    } catch {
      carrinho.value = []
    }
  },
  { immediate: true }
)
 
watch(
  carrinho,
  () => {
    const chave = chaveCarrinho()
 
    if (!chave) return
 
    try {
      localStorage.setItem(chave, JSON.stringify(carrinho.value))
    } catch {
      // armazenamento indisponível: o carrinho vale só nesta sessão
    }
  },
  { deep: true }
)
 
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
 
async function entrar() {
  const cadastro = loginDados.modo === 'cadastro'
 
  if (cadastro && !loginDados.nome.trim()) {
    mostrarToast('Informe seu nome')
    return
  }
 
  if (!loginDados.email.trim() || !loginDados.senha) {
    mostrarToast('Informe e-mail e senha')
    return
  }
 
  try {
    const dados = cadastro
      ? await api('/auth/register', {
          method: 'POST',
          body: {
            nome: loginDados.nome,
            email: loginDados.email,
            senha: loginDados.senha,
            role: loginDados.role
          }
        })
      : await api('/auth/login', {
          method: 'POST',
          body: {
            email: loginDados.email,
            senha: loginDados.senha,
            lembrar: loginDados.lembrar
          }
        })
 
    usuario.value = { ...dados, name: dados.nome }
    loginDados.senha = ''
 
    fecharModal()
 
    mostrarToast(`Bem-vindo, ${usuario.value.name}!`)
  } catch (erro) {
    mostrarToast(erro.message)
  }
}
 
async function sair() {
  try {
    await api('/auth/logout', { method: 'POST' })
  } catch {
    // limpa o estado local mesmo com erro
  }
 
  usuario.value = null
 
  fecharModal()
}
 
// AVALIAÇÕES
function avaliarProduto(nota) {
  if (!usuario.value) {
    mostrarToast('Entre para avaliar')
    return
  }
 
  const id = produtoSelecionado.value.id
 
  avaliacoes[id] = [...(avaliacoes[id] || []), nota]
 
  mostrarToast('Obrigado pela avaliação!')
}
 
// ADICIONAR AO CARRINHO
function adicionarCarrinho(produto) {
  if (!usuario.value) {
    abrirModal('login')
    return
  }
 
  if (ehVendedor.value) {
    mostrarToast('Contas de vendedor não podem comprar')
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
      q: 1,
      name: produto.name,
      cat: produto.cat,
      price: produto.price,
      disc: produto.disc,
      stock: produto.stock,
      img: produto.img
    })
  }
 
  mostrarToast('Adicionado ao carrinho')
  fecharModal()
}
 
// ESTATÍSTICAS (dados reais do vendedor)
async function abrirEstatisticas() {
  try {
    const dados = await api('/vendedor/vendas')
 
    vendas.value = dados.porProduto
    totaisVendas.valor = dados.totalValor
    totaisVendas.unidades = dados.totalUnidades
  } catch (erro) {
    mostrarToast(erro.message)
    return
  }
 
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
 
// IMAGEM: reduz a foto antes de enviar, para caber no banco de dados
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
    mostrarToast('Não foi possível ler a imagem')
  }
}
 
// SALVAR PRODUTO
async function salvarProduto() {
  const nome = formulario.name.trim()
  const descricao = formulario.desc.trim()
  const preco = Number(formulario.price)
 
  if (!nome || !descricao || !(preco >= 0) || formulario.price === '') {
    mostrarToast('Preencha nome, preço e descrição')
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
    desc: descricao,
    img: formulario.img
  }
 
  const estavaEditando = !!editandoProduto.value
 
  try {
    if (estavaEditando) {
      await api(`/produtos/${editandoProduto.value.id}`, {
        method: 'PUT',
        body: dados
      })
    } else {
      await api('/produtos', {
        method: 'POST',
        body: dados
      })
    }
  } catch (erro) {
    mostrarToast(erro.message)
    return
  }
 
  fecharDrawer()
  editandoProduto.value = null
 
  await carregarProdutos()
 
  mostrarToast(
    dados.stock <= 5
      ? `⚠ Estoque baixo (${dados.stock} un.)`
      : estavaEditando
        ? 'Produto atualizado!'
        : 'Produto publicado!'
  )
}
 
// EXCLUIR PRODUTO
async function excluirProduto() {
  if (!editandoProduto.value) return
 
  if (!confirm('Excluir este produto?')) return
 
  try {
    await api(`/produtos/${editandoProduto.value.id}`, {
      method: 'DELETE'
    })
  } catch (erro) {
    mostrarToast(erro.message)
    return
  }
 
  fecharDrawer()
  editandoProduto.value = null
 
  await carregarProdutos()
 
  mostrarToast('Produto removido')
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
 
    if (item.q <= 0) removerItem(id)
 
    return
  }
 
  if (item.q < item.stock) {
    item.q++
  } else {
    mostrarToast('Limite do estoque')
  }
}
 
function removerItem(id) {
  carrinho.value = carrinho.value.filter(
    item => item.id !== id
  )
}
 
// FINALIZAR COMPRA (o backend confere o estoque e grava o pedido)
async function confirmarCompra() {
  if (!carrinho.value.length) return
 
  const dias = frete.value
 
  try {
    await api('/pedidos', {
      method: 'POST',
      body: {
        descricao: `Entrega em ${dias} dias úteis`,
        itens: carrinho.value.map(item => ({
          idProduto: item.id,
          quantidade: item.q
        }))
      }
    })
  } catch (erro) {
    mostrarToast(erro.message)
    return
  }
 
  carrinho.value = []
 
  fecharCarrinho()
 
  await carregarProdutos()
 
  mostrarToast(
    `Compra confirmada! Chega em ${dias} dias úteis`
  )
}
</script>
 
<style scoped>
@import url('../css/base.css');
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

.search {
  width: min(260px, 100%);
  background: var(--ink);
  border: 4px solid var(--line);
  padding: 8px 12px;
}
 
.alerta {
  background: var(--card);
  border: 4px solid var(--gold);
  padding: 10px 12px;
  margin-bottom: 18px;
  color: var(--gold);
}
 
.tag.low {
  background: var(--gold);
  color: var(--ink);
  left: auto;
  right: 4px;
}
</style>