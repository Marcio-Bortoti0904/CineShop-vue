import { ref } from 'vue'

// ESTADO GLOBAL DO USUÁRIO
// Todas as páginas que importarem esta variável compartilharão o mesmo usuário.
export const usuario = ref(null)