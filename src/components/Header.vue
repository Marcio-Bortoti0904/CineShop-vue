<template>
  <header class="navbar pixel-border">
    <img id="logo" src="/imagem/Logo.png" alt="Logo CineShop">

    <nav class="menu">
      <RouterLink to="/home" class="menu-item active">
        Home
      </RouterLink>

      <RouterLink to="/filmes" class="menu-item">
        Filmes e Séries
      </RouterLink>

      <a href="#produtos" class="menu-item">
        Produtos
      </a>
    </nav>

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

<style scoped>
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
</style>