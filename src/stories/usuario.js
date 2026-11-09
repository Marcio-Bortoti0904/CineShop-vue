import { defineStore } from 'pinia'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usuario: null,
    carregando: true
  }),

  getters: {
    autenticado: (state) => state.usuario !== null
  },

  actions: {
    definirUsuario(dados) {
      this.usuario = dados
    },

    limparUsuario() {
      this.usuario = null
    },

    async carregarUsuario() {
      try {
        const resposta = await fetch(
          'http://localhost:3000/api/auth/me',
          {
            credentials: 'include'
          }
        )

        if (!resposta.ok) {
          this.usuario = null
          return
        }

        this.usuario = await resposta.json()

      } catch (erro) {
        console.error('Erro ao carregar usuário:', erro)
        this.usuario = null

      } finally {
        this.carregando = false
      }
    }
  }
})
