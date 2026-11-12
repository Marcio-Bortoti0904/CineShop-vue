<template>
  <header class="navbar">

    <!-- BOTÃO DO MENU -->
    <div>
    <button
      class="menu-toggle"
      @click="menuAberto = !menuAberto"
      :aria-expanded="menuAberto"
      aria-label="Expandir ou recolher menu"
    >
      ☰
    </button>

    <!-- LOGOTIPO -->
    <img
      id="logo"
      src="/imagem/pixil-frame-0 (1).png"
      alt="Logo CineShop"
    >
</div>
    <!-- PESQUISA -->
    <Busca />

    <!-- AVATAR E IDENTIFICAÇÃO -->
    <Perfil
      :usuario="usuario"
      @abrir="$emit('abrirPerfil')"
    />

  </header>

  <!-- MENU RETRÁTIL -->
  <Menu :menuAberto="menuAberto" />
</template>

<script setup>
import { ref } from 'vue'

import Menu from '../components/Menu.vue'
import Busca from '../components/busca.vue'
import Perfil from './avatar-bot.vue'

// ESTADO DO MENU
const menuAberto = ref(false)

// DADOS RECEBIDOS DA PÁGINA PRINCIPAL
defineProps({
  usuario: {
    type: Object,
    default: null
  }
})

// EVENTO ENVIADO PARA A PÁGINA PRINCIPAL
defineEmits(['abrirPerfil'])
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
