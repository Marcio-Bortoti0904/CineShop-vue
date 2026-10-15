import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Filmes from '../components/Catalogo.vue'

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