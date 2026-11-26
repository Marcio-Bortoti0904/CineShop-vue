<template>
  <div class="chips">
    <button
      v-for="categoria in categorias"
      :key="categoria"
      class="chip"
      :class="{ on: modelValue === categoria }"
      @click="$emit('update:modelValue', categoria)"
    >
      {{ categoria }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categorias: {
    type: Array,
    required: true
  },

  modelValue: {
    type: String,
    default: 'Todos'
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.chip {
  background: var(--card, #2F3D58);
  color: var(--text, #F2F5FA);
  border: 4px solid var(--ink, #0D1220);
  padding: 4px 10px;
  cursor: pointer;
  font-size: 20px;
}

.chip.on {
  background: var(--gold, #F4C20D);
  color: var(--ink, #0D1220);
}
</style>