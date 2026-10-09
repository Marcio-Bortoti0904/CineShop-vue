<template>
  <main>
    <!-- CABEÇALHO -->
    <header class="navbar pixel-border">
      <img id="logo" src="/imagem/Logo.png" alt="Logo CineShop">

      <nav class="menu">
        <RouterLink to="/" class="menu-item active">
          Home
        </RouterLink>

        <a href="#streaming" class="menu-item">
          Filmes
        </a>

        <a href="#produtos" class="menu-item">
          Produtos
        </a>
      </nav>

      <!-- Pesquisa -->
      <div class="search-container">
        <input
          type="text"
          class="search-input pixel-border"
          placeholder="Buscar..."
          aria-label="Buscar filmes e produtos"
        >
      </div>

      <!-- Perfil -->
      <div class="user-profile">
        <span class="user-name">Beatriz</span>
        <div class="user-avatar pixel-border"></div>
      </div>
    </header>

    <!-- CONTEÚDO -->
    <section class="conteudo" id="streaming">
      <h2 class="section-title">➣ Streaming</h2>

      <div ref="listaFilmes" class="filmes">
        <FilmeCard
          v-for="filme in filmes"
          :key="filme.id"
          :filme="filme"
        />
      </div>
    </section>

    <section class="conteudo" id="produtos">
      <h2 class="section-title">➣ Produtos</h2>

      <!-- Os produtos poderão ser adicionados aqui depois. -->
    </section>

    <!-- MASCOTE VOLY -->
    <div class="mascot-container">
      <div class="mascot-bubble pixel-border">
        Olá! Sou a Voly. Precisa de ajuda?
      </div>

      <div class="mascot-image-wrapper">
        <img
          src="/imagem/Voly.png"
          alt="Mascote Voly"
          class="mascot-img"
        >
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { filmes } from '../data/filmes.js'
import FilmeCard from './Filmecard.vue'

const lancamentos = filmes.filter(
  filme => filme.lancamento === '2026'
)

onMounted(() => {
  document.title = 'CineShop - Página inicial'
})
</script>

<style>
@import url('./global.css');

/* CABEÇALHO */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1a1a1a;
  padding: 20px;
  margin: 15px;
  border-color: #333333;
  gap: 20px;
}

#logo {
  width: 130px;
  height: 125px;
  object-fit: contain;
}

/* MENU */
.menu {
  display: flex;
  gap: 20px;
}

.menu-item {
  color: #aaaaaa;
  text-decoration: none;
  padding: 5px;
  transition: color 0.2s;
}

.menu-item:hover,
.menu-item.active {
  color: #00ffcc;
}

/* PESQUISA */
.search-container {
  flex-grow: 0.3;
}

.search-input {
  box-sizing: border-box;
  width: 100%;
  background-color: #262626;
  border-color: #444444;
  color: #fff;
  font-size: 10px;
  padding: 8px 12px;
  outline: none;
}

/* PERFIL */
.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-name {
  color: #fff;
  font-size: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: #ff88a3;
  border-color: #555555;
  background-image:
    linear-gradient(45deg, #ff6680 25%, transparent 25%),
    linear-gradient(-45deg, #ff6680 25%, transparent 25%);
  background-size: 10px 10px;
}

/* CONTEÚDO */
.conteudo {
  padding: 10px 15px;
  margin-bottom: 30px;
}

.section-title {
  font-size: 14px;
  margin-bottom: 20px;
  color: #fff;
  text-transform: uppercase;
}

/* FILEIRA DE FILMES */
.filmes {
  display: flex;
  gap: 25px;
  overflow-x: auto;
  padding: 10px 5px;
}

.filmes::-webkit-scrollbar {
  height: 8px;
}

.filmes::-webkit-scrollbar-thumb {
  background: #333;
  border: 2px solid #121212;
}

/* MASCOTE VOLY */
.mascot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}

.mascot-bubble {
  position: relative;
  background-color: #1a1a1a;
  color: #00ffcc;
  padding: 10px;
  font-size: 8px;
  text-transform: uppercase;
  max-width: 180px;
  text-align: center;
  margin-bottom: 12px;
  line-height: 1.4;
  border-color: #333333;
  animation: mascot-float 3s ease-in-out infinite;
}

.mascot-bubble::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background-color: #1a1a1a;
  border-right: 4px solid #333333;
  border-bottom: 4px solid #333333;
}

.mascot-image-wrapper {
  width: 80px;
  display: flex;
  justify-content: center;
  animation: mascot-float 3s ease-in-out infinite;
}

.mascot-img {
  width: 100%;
  height: auto;
  image-rendering: pixelated;
}

/* ANIMAÇÃO */
@keyframes mascot-float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>