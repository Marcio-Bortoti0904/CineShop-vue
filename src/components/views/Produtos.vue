
<template>
<div class="products-page">
<header class="top">
  <div class="logo">
    <img id="login-image" src="/imagem/Logo.png" alt="Logo CineShop">
  </div>
  <div class="search"><input id="q" type="search" placeholder="Buscar produtos..." aria-label="Buscar produtos"></div>
  <div class="user"><span>Você</span><div class="avatar" aria-hidden="true">👾</div></div>
</header>

<main>
  <div class="bar">
    <h2>Produtos</h2>
    <button class="btn red" id="open">+ Criar produto</button>
  </div>
  <div class="grid" id="list"></div>
</main>

<div class="layer" id="layer"></div>
<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle"></div>

<aside class="drawer" id="drawer" aria-label="Criar produto" aria-hidden="true">
  <button class="x" id="close" aria-label="Fechar">X</button>
  <h2>Novo produto</h2>
  <label for="fName">Nome</label>
  <input id="fName" maxlength="40">
  <label for="fPhoto">Foto do produto</label>
  <input id="fPhoto" type="file" accept="image/*">
  <div class="prev" id="prev">Sem foto</div>
  <label for="fDesc">Descrição</label>
  <textarea id="fDesc" maxlength="300"></textarea>
  <label for="fPrice">Preço (R$)</label>
  <input id="fPrice" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0,00">
  <div class="err" id="err" role="alert"></div>
  <button class="btn" id="publish" style="margin-top:8px">Publicar produto</button>
</aside>

<div id="toast" role="status" aria-live="polite"></div>
</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

var brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

var products = [
  {
    id: 1,
    name: 'Pôster Clássico Ação',
    desc: 'Pôster 60x90 cm em papel fosco, arte retrô dos anos 80.',
    price: 49.9,
    emoji: '🎬',
    sum: 46,
    count: 10
  },
  {
    id: 2,
    name: 'Balde de Pipoca Colecionável',
    desc: 'Balde de 2 litros com tampa e estampa pixel art. Edição limitada.',
    price: 79.9,
    emoji: '🍿',
    sum: 38,
    count: 9
  },
  {
    id: 3,
    name: 'Action Figure Super-Herói',
    desc: 'Boneco articulado de 18 cm com capa removível e base de exibição.',
    price: 129.9,
    emoji: '🦸',
    sum: 87,
    count: 19
  },
  {
    id: 4,
    name: 'Fita VHS Terror Cult',
    desc: 'Réplica de fita VHS com caixa original, ideal para decoração.',
    price: 34.5,
    emoji: '📼',
    sum: 21,
    count: 6
  }
]

var mine = {}
var nextId = 5
var photo = ''
var lastFocus = null

var $ = function (id) {
  return document.getElementById(id)
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]
  })
}

function stars(avg) {
  var h = '<span class="stars" aria-hidden="true">'

  for (var i = 1; i <= 5; i++) {
    h += '<span class="' +
      (i <= Math.round(avg) ? 'on' : 'off') +
      '">★</span>'
  }

  return h + '</span>'
}

function avg(p) {
  return p.count ? p.sum / p.count : 0
}

function label(p) {
  return p.count
    ? avg(p).toFixed(1).replace('.', ',') + ' de 5 (' + p.count + ')'
    : 'Sem avaliações'
}

function pic(p) {
  return p.photo
    ? '<img src="' + p.photo + '" alt="">'
    : (p.emoji || '🎮')
}

function render() {
  var t = $('q').value.trim().toLowerCase()
  var box = $('list')
  var h = ''

  products.filter(function (p) {
    return !t ||
      (p.name + ' ' + p.desc).toLowerCase().indexOf(t) > -1
  }).forEach(function (p) {
    h += '<button class="card" data-id="' + p.id +
      '" aria-label="Abrir ' + esc(p.name) + '">' +
      '<div class="ph">' + pic(p) + '</div>' +
      '<h3>' + esc(p.name) + '</h3>' +
      '<p>' + esc(p.desc) + '</p>' +
      '<div class="price">' + brl.format(p.price) + '</div>' +
      '<div class="meta">' + stars(avg(p)) +
      '<span>' + label(p) + '</span></div></button>'
  })

  box.innerHTML = h ||
    '<div class="empty px">Nenhum produto encontrado</div>'
}

function toast(m) {
  var e = $('toast')
  e.textContent = m
  e.classList.add('on')

  clearTimeout(toast.t)

  toast.t = setTimeout(function () {
    e.classList.remove('on')
  }, 2000)
}

function showLayer(on) {
  $('layer').classList.toggle('on', on)
}

function openModal(id) {
  var p = products.filter(function (x) {
    return x.id == id
  })[0]

  if (!p) return

  lastFocus = document.activeElement

  var my = mine[id] || 0
  var r = ''

  for (var i = 1; i <= 5; i++) {
    r += '<button data-s="' + i + '" class="' +
      (i <= my ? 'on' : '') +
      '" aria-label="' + i + ' estrela' +
      (i > 1 ? 's' : '') + '">★</button>'
  }

  $('modal').innerHTML =
    '<button class="x" id="mClose" aria-label="Fechar">X</button>' +
    '<div class="ph">' + pic(p) + '</div>' +
    '<h3 id="mTitle">' + esc(p.name) + '</h3>' +
    '<p>' + esc(p.desc) + '</p>' +
    '<div class="price">' + brl.format(p.price) + '</div>' +
    '<div class="meta" style="margin-top:8px">' +
    stars(avg(p)) + '<span>' + label(p) + '</span></div>' +
    '<h3>Sua avaliação</h3>' +
    '<div class="rate" data-id="' + id + '">' + r + '</div>' +
    '<p style="color:var(--muted)">' +
    (my ? 'Você avaliou com ' + my + ' de 5.' :
      'Toque nas estrelas para avaliar.') + '</p>'

  $('modal').classList.add('on')
  showLayer(true)
  $('mClose').focus()
}

function closeAll() {
  $('modal').classList.remove('on')
  $('drawer').classList.remove('on')
  $('drawer').setAttribute('aria-hidden', 'true')
  showLayer(false)

  if (lastFocus && lastFocus.focus) {
    lastFocus.focus()
  }
}

function handleListClick(e) {
  var c = e.target.closest('.card')

  if (c) {
    openModal(c.dataset.id)
  }
}

function handleModalClick(e) {
  if (e.target.id === 'mClose') {
    closeAll()
    return
  }

  var b = e.target.closest('.rate button')
  if (!b) return

  var id = +b.parentNode.dataset.id
  var s = +b.dataset.s

  var p = products.filter(function (x) {
    return x.id === id
  })[0]

  if (!p) return

  if (mine[id]) {
    p.sum -= mine[id]
  } else {
    p.count++
  }

  p.sum += s
  mine[id] = s

  render()
  openModal(id)
  toast('Avaliação registrada')
}

function handleOpenClick() {
  lastFocus = this

  $('drawer').classList.add('on')
  $('drawer').setAttribute('aria-hidden', 'false')

  showLayer(true)
  $('fName').focus()
}

function handlePhotoChange() {
  var f = this.files[0]

  if (!f) {
    photo = ''
    $('prev').textContent = 'Sem foto'
    return
  }

  if (!f.type.startsWith('image/')) {
    $('err').textContent = 'Selecione um arquivo de imagem.'
    this.value = ''
    return
  }

  var r = new FileReader()

  r.onload = function () {
    photo = r.result
    $('prev').innerHTML =
      '<img src="' + photo + '" alt="Pré-visualização">'
  }

  r.onerror = function () {
    $('err').textContent = 'Não foi possível carregar a imagem.'
  }

  r.readAsDataURL(f)
}

function handlePublish() {
  var n = $('fName').value.trim()
  var d = $('fDesc').value.trim()
  var v = parseFloat($('fPrice').value)

  if (!n || !d || $('fPrice').value === '' || isNaN(v) || v < 0) {
    $('err').textContent =
      'Preencha nome, descrição e preço válido.'
    return
  }

  products.unshift({
    id: nextId++,
    name: n,
    desc: d,
    price: v,
    photo: photo,
    emoji: '🎮',
    sum: 0,
    count: 0
  })

  $('fName').value = ''
  $('fDesc').value = ''
  $('fPrice').value = ''
  $('fPhoto').value = ''
  photo = ''
  $('prev').textContent = 'Sem foto'
  $('err').textContent = ''

  render()
  closeAll()
  toast('Produto publicado')
}

function handleKeydown(e) {
  if (e.key === 'Escape') closeAll()
}

function initPage() {
  $('list').addEventListener('click', handleListClick)
  $('modal').addEventListener('click', handleModalClick)
  $('q').addEventListener('input', render)
  $('open').addEventListener('click', handleOpenClick)
  $('close').addEventListener('click', closeAll)
  $('layer').addEventListener('click', closeAll)
  $('fPhoto').addEventListener('change', handlePhotoChange)
  $('publish').addEventListener('click', handlePublish)

  document.addEventListener('keydown', handleKeydown)

  render()
}

onMounted(initPage)

onBeforeUnmount(function () {
  document.removeEventListener('keydown', handleKeydown)
  clearTimeout(toast.t)
})
</script>

<style scoped>
@import url('../css/base.css');

.products-page {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font: 24px/1.15 "VT323", ui-monospace, monospace;
  background-image:
    linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px);
  background-size: 8px 8px;
}

h1, h2, h3, .px {
  font-family: "Press Start 2P", "VT323", monospace;
  font-weight: 400;
  line-height: 1.5;
}

button, input, textarea {
  font: inherit;
  color: inherit;
}

:focus-visible {
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
  outline-offset: 2px;
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

main {
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

h2 {
  font-size: 16px;
  margin: 0;
}

h2::before {
  content: "> ";
  color: var(--red);
}

.btn {
  background: var(--cyan);
  color: var(--ink);
  border: 4px solid var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  padding: 10px 16px;
  cursor: pointer;
  font-family: "Press Start 2P", monospace;
  font-size: 11px;
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
  color: #fff;
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
  background: rgba(5,8,16,.65);
  display: none;
  z-index: 20;
}

.layer.on {
  display: block;
}

.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: min(560px,92vw);
  max-height: 90vh;
  overflow: auto;
  background: var(--card);
  border: 4px solid var(--ink);
  box-shadow: 8px 8px 0 var(--ink);
  padding: 18px;
  display: none;
  z-index: 30;
}

.modal.on {
  display: block;
}

.modal h3 {
  font-size: 14px;
  margin: 14px 0 8px;
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

.x {
  float: right;
  background: var(--red);
  color: #fff;
  border: 4px solid var(--ink);
  cursor: pointer;
  width: 38px;
  height: 38px;
  font-family: "Press Start 2P", monospace;
  font-size: 12px;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(400px,100vw);
  background: var(--bar);
  border-left: 6px solid var(--ink);
  padding: 20px;
  padding-top: calc(20px + env(safe-area-inset-top,0px));
  transform: translateX(100%);
  transition: transform .2s;
  z-index: 40;
  overflow: auto;
}

.drawer.on {
  transform: none;
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

#toast {
  position: fixed;
  left: 50%;
  bottom: calc(20px + env(safe-area-inset-bottom,0px));
  transform: translateX(-50%);
  background: var(--ink);
  border: 4px solid var(--cyan);
  padding: 10px 18px;
  z-index: 60;
  opacity: 0;
  pointer-events: none;
}

#toast.on {
  opacity: 1;
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
}
</style>
