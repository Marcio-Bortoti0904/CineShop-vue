<template>
  <header class="navbar">
    <button
      class="menu-toggle"
      @click="menuAberto = !menuAberto"
      :aria-expanded="menuAberto"
      aria-label="Abrir ou fechar menu"
    >
      ☰
    </button>
    <img id="login-image" src="/imagem/Logo.png" alt="Logo CineShop">
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
        <span class="user-name">Você</span>
        <div class="user-avatar"></div>
      </div>
  </header>
</template>
<script setup>
import { ref } from 'vue'
const menuAberto = ref(false)
</script>
<style scoped>
/* CABEÇALHO */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background:rgb(20, 20, 20);
  border-bottom:6px solid rgb(0, 0, 0);
  gap:16px;
  align-items:center;
  justify-content:space-between;
  padding:14px 20px;
  flex-wrap:wrap
}

#logo {
  width: 130px;
  height: 125px;
  object-fit: contain;
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
  font-size: 15px;
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
  font-size: 20px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: #ff88a3;
  border: 4px solid #555555;
  background-image:
    linear-gradient(45deg, #ff6680 25%, transparent 25%),
    linear-gradient(-45deg, #ff6680 25%, transparent 25%);
  background-size: 10px 10px;
}

.menu-toggle {
  background-color: #090C10;
  color: #00ffcc;
  border: 2px solid #00ffcc;
  font-size: 22px;
  cursor: pointer;
}
</style>