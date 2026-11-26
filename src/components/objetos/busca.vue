<template>
  <!-- ÁREA DE PESQUISA -->
  <div class="search">
    <!-- Campo de busca conectado ao v-model do componente pai -->
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="search"
      :placeholder="placeholder"
      aria-label="Buscar produtos"
    >
  </div>
</template>

<script setup>
// PROPRIEDADES RECEBIDAS DO COMPONENTE PRINCIPAL
defineProps({
  modelValue: {
    type: String,
    default: ''
  },

  // Permite personalizar o texto do campo de pesquisa
  placeholder: {
    type: String,
    default: ' Buscar...'
  }
})

// EVENTOS ENVIADOS AO COMPONENTE PRINCIPAL
defineEmits(['update:modelValue'])
</script>

<style scoped>
/* ESTRUTURA DA ÁREA DE PESQUISA */
.search {
  flex: 1 1 220px;
  max-width: 520px;
}

/* ESTILIZAÇÃO DO CAMPO DE PESQUISA */
.search input {
  width: 100%;
  background: #0D1220;
  border: 4px solid #55678A;
  padding: 8px 12px;
  color: #F2F5FA;
  font: inherit;
  box-sizing: border-box;
}

/* DESTAQUE AO SELECIONAR O CAMPO */
.search input:focus-visible {
  outline: 4px solid #F4C20D;
  outline-offset: 2px;
}
</style>