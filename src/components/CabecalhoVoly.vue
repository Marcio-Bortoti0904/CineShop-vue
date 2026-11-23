<template>
  <header class="top-bar">
    <!-- Logo da CineShop -->
    <img
      src="/imagem/pixil-frame-0 (1).png"
      alt="CineShop"
      id="logo"
    >
    <!-- Identificação da assistente -->
    <span class="pixel-logo">
      <span class="highlight"></span>
    </span>
    <!-- Status da assistente -->
    <span class="status-badge">
      ● VOLY ONLINE
    </span>
  </header>
</template>

<style scoped>
@import url('../css/base.css');
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 4px solid var(--voly-border);
  margin-bottom: 20px;
}

.pixel-logo {
  font-family: 'MinhaFonte', cursive;
  font-size: 1.2rem;
  letter-spacing: 2px;
}

.pixel-logo .highlight {
  color: var(--voly-secondary);
}

.status-badge {
  font-family: 'MinhaFonte', cursive;
  font-size: 0.65rem;
  color: #10b981;
  background: rgba(35, 34, 37, 0.1);
  padding: 8px 12px;
  border: 2px solid #10b981;
}
</style>