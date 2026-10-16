<template>
  <aside
    class="sidebar"
    :class="{ 'menu-aberto': menuAberto }"
  >
    <nav class="menu">
      <RouterLink to="/home" class="menu-item">
        Início
      </RouterLink>

      <RouterLink to="/filmes" class="menu-item">
        Streaming
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
  width: 180px;
  min-height: calc(100vh - 40px);
  background-color: #090C10;
  border-right: 1px solid #1F2937;
  padding: 32px 12px;
  margin: 4px;
  box-sizing: border-box;
}

/* Links do menu */
.menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Botão para fechar/abrir em telas menores */
@media (max-width: 768px) {
  .sidebar {
    display: none;
    position: absolute;
    top: 80px;
    left: 15px;
    width: 200px;
    min-height: auto;
    z-index: 1000;
    border: 1px solid #1F2937;
    padding: 16px 12px;
    background-color: #090C10;
  }

  .sidebar.menu-aberto {
    display: block;
  }
}
</style>