<template>
  <main>
    <div id="loading-screen">
        <div class="loading-box pixel-border">
            <div class="loading-text">LOADING</div>
            <!-- Barra que vai preencher via animação CSS -->
            <div class="pixel-bar-container pixel-border">
                <div class="pixel-bar-progress"></div>
            </div>
        </div>
    </div>
    <!-- CABEÇALHO -->
    <Header />
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
import Header from './Header.vue'

onMounted(() => {
  document.title = 'CineShop - Página inicial'

  const loadingScreen = document.getElementById('loading-screen')

  setTimeout(() => {
    loadingScreen.classList.add('fade-out')
  }, 1500)

  setTimeout(() => {
    loadingScreen.style.display = 'none'
  }, 2000)
})
</script>

<style>
@import url('./global.css');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #121212; /* Preto moderno de fundo */
    color: #e0e0e0; /* Texto claro */
    font-family: 'Press Start 2P', monospace; /* Fonte estilo videogame */
    font-size: 12px;
    line-height: 1.5;
    padding-bottom: 40px;
}

/* Efeito universal de borda pixelada (Sombra interna/externa simula blocos) */
.pixel-border {
    border: 4px solid #ffffff;
    box-shadow: 
        -4px 0 #121212, 4px 0 #121212, 0 -4px #121212, 0 4px #121212,
        inset -4px -4px #262626; /* Sombra interna para profundidade retro */
}

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

/* ==========================================================================
   ESTILOS DA TELA DE LOADING
   ========================================================================== */
#loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #121212; /* Mesma cor de fundo do site */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Garante que fique por cima de tudo */
    transition: opacity 0.5s ease; /* Transição para o efeito fade-out */
}

/* Classe aplicada via JavaScript para suavizar a saída */
#loading-screen.fade-out {
    opacity: 0;
    pointer-events: none;
}

/* Caixa central do Loading */
.loading-box {
    background-color: #1a1a1a;
    padding: 30px;
    text-align: center;
    border-color: #333333;
    width: 320px;
}

/* Texto piscando estilo Arcade */
.loading-text {
    font-size: 14px;
    color: #00ffcc; /* Verde neon arcade */
    margin-bottom: 20px;
    letter-spacing: 2px;
    animation: pixel-blink 0.8s infinite steps(2); /* Efeito "liga/desliga" seco */
}

/* Container externo da barra de progresso */
.pixel-bar-container {
    width: 100%;
    height: 24px;
    background-color: #262626;
    border-color: #444444;
    padding: 2px;
}

/* A barra de progresso interna */
.pixel-bar-progress {
    height: 100%;
    width: 0%;
    background-color: #ff0055; /* Rosa/Neon CineShop */
    animation: fill-bar 2s forwards steps(10); 
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
  filter: drop-shadow(0px 0px 8px red)
          drop-shadow(0px 0px 12px blue);
}

/* ANIMAÇÃO */
@keyframes pixel-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

@keyframes fill-bar {
    0% { width: 0%; }
    100% { width: 100%; }
}

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