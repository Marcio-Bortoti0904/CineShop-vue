<script setup>
import { ref } from 'vue'

import Login from '/src/components/Login.vue'
const pagina = ref('login')
</script>

<template>
  <Login v-if="pagina === 'login'" />
</template>