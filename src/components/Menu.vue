<template>
  <aside
    class="sidebar"
    :class="menuAberto ? 'menu-aberto' : 'menu-fechado'"
  >
    <nav class="menu">

      <RouterLink to="/home" class="menu-item" title="Início">
        <span class="menu-icon">🏠</span>
        <span class="menu-text">Início</span>
      </RouterLink>

      <RouterLink to="/filmes" class="menu-item" title="Streaming">
        <span class="menu-icon">🎬</span>
        <span class="menu-text">Catálogo</span>
      </RouterLink>

      <div class="menu-divider"></div>

      <RouterLink to="/perfil" class="menu-item" title="Meu perfil">
        <span class="menu-icon">👤</span>
        <span class="menu-text">Meu perfil</span>
      </RouterLink>

      <RouterLink to="/configuracoes" class="menu-item" title="Configurações">
        <span class="menu-icon">⚙️</span>
        <span class="menu-text">Configurações</span>
      </RouterLink>

    </nav>
  </aside>
</template>

<script setup>
defineProps({
  menuAberto: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  box-sizing: border-box;

  background: rgb(20, 20, 20);
  border-right: 2px solid #000;

  padding-top: 150px;
  overflow-x: hidden;

  z-index: 15;

  transition: width 0.35s ease;
}

.menu-fechado {
  width: 76px;
}

.menu-aberto {
  width: 240px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 18px;

  min-height: 52px;
  padding: 0 12px;

  color: white;
  text-decoration: none;
  border-radius: 8px;

  white-space: nowrap;
  box-sizing: border-box;

  transition: background 0.2s ease;
}

.menu-item:hover {
  background: #303030;
}

.menu-icon {
  min-width: 28px;
  text-align: center;
  font-size: 23px;
}

.menu-text {
  font-size: 15px;
  opacity: 1;
  transition: opacity 0.2s ease;
}

.menu-fechado .menu-item {
  justify-content: center;
  padding: 0;
}

.menu-fechado .menu-text {
  display: none;
}

.menu-divider {
  height: 1px;
  background: #444;
  margin: 10px 0;
}

.menu-item.router-link-active {
  background: #303030;
}
</style>
