import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import LandingPage from '../views/LandingPage.vue'
import Filmes from '../views/Catalogo.vue'
import FinalizarCadastro from '../views/FinalizarCadastro.vue'

const routes = [
  {
    path: '/',
    component: LandingPage
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/filmes',
    component: Filmes
  },

  {
    path: '/finalizarcadastro',
    component: FinalizarCadastro
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router