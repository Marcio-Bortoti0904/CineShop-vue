<template>
  <div v-if="visivel" class="toast">
    {{ mensagem }}
  </div>
</template>

<script setup>
defineProps({
  visivel: {
    type: Boolean,
    default: false
  },

  mensagem: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  max-width: calc(100% - 24px);
  padding: 10px 16px;
  text-align: center;
  font-size: 20px;
  background: var(--ink, #0D1220);
  color: var(--text, #F2F5FA);
  border: 4px solid var(--gold, #F4C20D);
}
</style>