<template>
  <aside
    v-if="menuAberto"
    class="sidebar"
  >
    <nav class="menu">

      <RouterLink to="/home" class="menu-item">
        Início
      </RouterLink>

      <RouterLink to="/filmes" class="menu-item">
        Streaming
      </RouterLink>

      <RouterLink to="/catalogo" class="menu-item">
        Catálogo
      </RouterLink>

      <RouterLink to="/perfil" class="menu-item">
        Meu perfil
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
  position: absolute;
  top: 85px;
  left: 0;

  width: 230px;
  min-height: calc(100vh - 85px);

  background-color: #090C10;
  border-right: 2px solid #FFD600;

  padding: 20px 12px;
  box-sizing: border-box;

  z-index: 1000;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  padding: 14px;
  color: white;
  text-decoration: none;
}

.menu-item:hover {
  background-color: #262626;
}
</style>