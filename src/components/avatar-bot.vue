<template>
  <button
    class="user"
    @click="$emit('abrir')"
  >
    <span class="avatar">👾</span>

    <span>
      {{ usuario
        ? (usuario.role === 'seller' ? 'VENDEDOR' : 'USUÁRIO')
        : 'ENTRAR' }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  usuario: {
    type: Object,
    default: null
  }
})

defineEmits(['abrir'])
</script>

<style scoped>
/* ESTRUTURA DO BOTÃO DE PERFIL */
.user {
  display: flex;
  align-items: center;
  gap: 8px;

  background: none;
  border: 0;

  cursor: pointer;

  font-family: "Press Start 2P", monospace;
  font-size: 10px;

  color: #F2F5FA;
}

/* AVATAR */
.avatar {
  width: 42px;
  height: 42px;

  background: #F28BA8;
  border: 4px solid #0D1220;

  display: grid;
  place-items: center;

  font-size: 22px;
}

/* DESTAQUE AO INTERAGIR */
.user:hover {
  opacity: 0.8;
}

/* ACESSIBILIDADE */
.user:focus-visible {
  outline: 4px solid #F4C20D;
  outline-offset: 2px;
}
</style>