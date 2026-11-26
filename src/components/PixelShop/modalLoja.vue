<template>
  <!-- Janela central -->
  <div
    v-if="aberto && tipo !== 'drawer'"
    class="ov"
    @click.self="$emit('fechar')"
  >
    <div class="box">
      <button class="btn red x" @click="$emit('fechar')">
        X
      </button>

      <slot />
    </div>
  </div>

  <!-- Painel lateral -->
  <div
    v-if="aberto && tipo === 'drawer'"
    class="ov drawer"
    @click.self="$emit('fechar')"
  >
    <div class="box">
      <button class="btn red x" @click="$emit('fechar')">
        X
      </button>

      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  aberto: {
    type: Boolean,
    default: false
  },

  tipo: {
    type: String,
    default: 'modal'
  }
})

defineEmits(['fechar'])
</script>

<style scoped>
.ov {
  position: fixed;
  inset: 0;
  background: rgba(5, 8, 16, 0.7);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
}

.box {
  background: #3B4A66;
  border: 6px solid #0D1220;
  box-shadow: 8px 8px 0 #0D1220;
  width: min(760px, 100%);
  max-height: 92vh;
  overflow: auto;
  padding: 16px;
  position: relative;
  color: #F2F5FA;
}

.x {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
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

.red {
  background: #E8525A;
  color: white;
}

/* O painel lateral ocupa toda a altura da tela. */
.drawer {
  align-items: stretch;
  justify-content: flex-end;
  padding: 0;
}

.drawer .box {
  width: min(430px, 100%);
  max-height: none;
  height: 100%;
  box-shadow: none;
}

@media (max-width: 620px) {
  .box {
    padding: 14px;
  }
}
</style>