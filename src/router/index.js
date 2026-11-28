import { createRouter, createWebHistory } from 'vue-router'
import { carregarSessao } from '../data/avatar.js'

import Home from '../views/Home.vue'
import LandingPage from '../views/LandingPage.vue'
import Filmes from '../views/Catalogo.vue'
import FinalizarCadastro from '../views/FinalizarCadastro.vue'
import Geek from '../views/PixelShop – Loja Geek.vue'
import Perfil from '../views/perfil.vue'
import Voly from '../views/voly.vue'

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
  },

  {
    path: '/geek',
    component: Geek
  },

  {
    path: '/Perfil',
    component: Perfil
  },

  {
    path: '/voly',
    component: Voly
  },

  {
    path: '/assistir/:id',
    name: 'Assistir',
    component: () => import('../views/PaginaFilme.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async () => {
  await carregarSessao()
})

export default router