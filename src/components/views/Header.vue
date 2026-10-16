<template>
  <header class="navbar pixel-border">
    <button
      class="menu-toggle"
      @click="menuAberto = !menuAberto"
      :aria-expanded="menuAberto"
      aria-label="Abrir ou fechar menu"
    >
      ☰
    </button>

    <Menu :menu-aberto="menuAberto" />
    <img id="logo" src="/imagem/Logo.png" alt="Logo CineShop">
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
</template>
<script setup>
import { ref } from 'vue'
import Menu from './Menu.vue'
const menuAberto = ref(false)
</script>
<style scoped>
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
  color: #ffffff;
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
  background-color: #ffffff;
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

.menu-toggle {
  display: none;
  background-color: #090C10;
  color: #00ffcc;
  border: 2px solid #00ffcc;
  padding: 8px 12px;
  font-size: 22px;
  cursor: pointer;
}
</style>