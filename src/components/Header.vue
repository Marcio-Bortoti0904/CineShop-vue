
<template>
  <header class="navbar">
    <button
      class="menu-toggle"
      @click="menuAberto = !menuAberto"
      :aria-expanded="menuAberto"
      aria-label="Expandir ou recolher menu"
    >
      ☰
    </button>

    <img
      id="logo"
      src="/imagem/Logo.png"
      alt="Logo CineShop"
    >

    <div class="search-container">
      <input
        type="text"
        class="search-input pixel-border"
        placeholder="Buscar..."
        aria-label="Buscar filmes e produtos"
      >
    </div>

    <div class="user-profile">
      <span class="user-name">Você</span>
      <div class="user-avatar"></div>
    </div>
  </header>

  <Menu :menuAberto="menuAberto" />
</template>

<script setup>
import { ref } from 'vue'
import Menu from '../components/Menu.vue'

const menuAberto = ref(true)
</script>

<style scoped>
.navbar {
  position: relative;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: rgb(20, 20, 20);
  border-bottom: 6px solid black;

  gap: 10px;
  padding: 0 50px;
  flex-wrap: wrap;
}

#logo {
  width: 140px;
  height: 120px;
  object-fit: contain;
  padding: 2px;
}

.search-container {
  flex-grow: 0.3;
}

.search-input {
  box-sizing: border-box;
  width: 100%;
  background-color: #262626;
  border-color: #444444;
  color: white;
  font-size: 15px;
  padding: 8px 12px;
  outline: none;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-name {
  color: white;
  font-size: 20px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: #ff88a3;
  border: 4px solid #555555;
}

.menu-toggle {
  color: white;
  background: none;
  font-size: 30px;
  cursor: pointer;
  border: none;
  width: 55px;
  height: 55px;
  border-radius: 50%;
}

.menu-toggle:hover {
  background: #2c2c2c;
}
</style>