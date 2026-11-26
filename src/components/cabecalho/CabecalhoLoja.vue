<template>
  <header class="top">
    <div class="logo">
      <img
      src="/imagem/pixil-frame-0 (1).png">
    </div>

    <div class="search">
      <input
        type="search"
        placeholder="🔍 Buscar produtos..."
        aria-label="Buscar produtos"
        :value="busca"
        @input="$emit('atualizar-busca', $event.target.value)"
      >
    </div>

    <div class="right">
      <button class="btn gold" @click="$emit('abrir-carrinho')">
        🛒 {{ quantidadeCarrinho }}
      </button>

      <button class="user" @click="$emit('abrir-perfil')">
        <span class="avatar">👾</span>
        <span>{{ usuarioLabel }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  busca: {
    type: String,
    default: ''
  },

  quantidadeCarrinho: {
    type: Number,
    default: 0
  },

  usuarioLabel: {
    type: String,
    default: 'ENTRAR'
  }
})

defineEmits([
  'atualizar-busca',
  'abrir-carrinho',
  'abrir-perfil'
])
</script>

<style scoped>
.top {
  background: #26324A;
  border-bottom: 6px solid #0D1220;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 5;
}

.logo {
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo b {
  background: #E8525A;
  padding: 6px 8px;
  border: 4px solid #0D1220;
}

.logo i {
  font-style: normal;
  color: #27C3D3;
}

.search {
  flex: 1 1 220px;
  max-width: 520px;
}

.search input {
  width: 100%;
  background: #0D1220;
  border: 4px solid #55678A;
  padding: 8px 12px;
  color: #F2F5FA;
  font-size: 20px;
}

.right {
  display: flex;
  gap: 10px;
  align-items: center;
}

.user {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 10px;
}

.avatar {
  width: 42px;
  height: 42px;
  background: #F28BA8;
  border: 4px solid #0D1220;
  display: grid;
  place-items: center;
  font-size: 22px;
}

.btn {
  background: #27C3D3;
  color: #0D1220;
  border: 4px solid #0D1220;
  box-shadow: 4px 4px 0 #0D1220;
  padding: 9px 12px;
  cursor: pointer;
  font-size: 10px;
}

.gold {
  background: #F4C20D;
}

@media (max-width: 600px) {
  .top {
    justify-content: center;
  }

  .search {
    order: 3;
    flex-basis: 100%;
  }
}
</style>