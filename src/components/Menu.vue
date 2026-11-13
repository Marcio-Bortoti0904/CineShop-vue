<template>
  <aside
    class="sidebar"
    :class="menuAberto ? 'menu-aberto' : 'menu-fechado'"
  >
    <nav class="menu">

      <RouterLink to="/home" class="menu-item" title="Início">
        <img class="icone" src="/imagem/casa.png" alt="">
        <span class="menu-text">Início</span>
      </RouterLink>

      <RouterLink to="/filmes" class="menu-item" title="Streaming">
        <img class="icone" src="/imagem/catalogo.png" alt="">
        <span class="menu-text">Catálogo</span>
      </RouterLink>

      <RouterLink to="/geek" class="menu-item" title="Produtos">
        <img class="icone" src="/imagem/cesta.png" alt="">
        <span class="menu-text">Shopping</span>
      </RouterLink>

      <div class="menu-divider"></div>

      <RouterLink to="/perfil" class="menu-item" title="Meu perfil">
        <img class="icone" src="/imagem/perfil.png" alt="">
        <span class="menu-text">Meu perfil</span>
      </RouterLink>

      <RouterLink to="/configuracoes" class="menu-item" title="Configurações">
        <img class="icone" src="/imagem/config.png" alt="">
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
  top: 126;
  left: 0;

  height: calc(100vh - 126px);
  box-sizing: border-box;

  background: rgb(20, 20, 20);
  border-right: 2px solid #000;

  padding-top: 15px;
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
  gap: 6px;
  padding: 0 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;

  min-height: 52px;
  padding: 16px;

  color: white;
  text-decoration: none;
  border-radius: 12px;

  white-space: nowrap;
  box-sizing: border-box;

  transition: background 0.2s ease;
}

.menu-item:hover {
  background: #303030;
}

.icone {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
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
  margin: 10px;
}

.menu-item.router-link-active {
  background: #303030;
  border-left: 4px solid #FFD600;
}
</style>