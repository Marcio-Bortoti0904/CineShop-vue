import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Filmes from '../views/Catalogo.vue'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/filmes',
    component: Filmes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router