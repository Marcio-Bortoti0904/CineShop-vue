<template>
    <main class="Final">
      <Loading />
    <img id="image" src="/imagem/Logo.png" alt="Logo CineShop">
    <section>
      <h1>Finalize seu cadastro</h1>
      <p>Complete seus dados para fazer parte do CineShop.</p>

      <form @submit.prevent="concluirCadastro">
        <div>
          <input
            v-model="nome"
            type="text"
            placeholder="Nome completo"
            required
          >
        </div>

        <div>
          <input
            v-model="email"
            type="email"
            placeholder="E-mail"
            required
          >
        </div>

        <div>
          <input
            v-model="senha"
            type="password"
            placeholder="Senha"
            required
          >
        </div>

        <div>
          <input
            v-model="confirmarSenha"
            type="password"
            placeholder="Confirme sua senha"
            required
          >
        </div>

        <button type="submit">
          Concluir cadastro
        </button>
      </form>

      <p v-if="mensagem">{{ mensagem }}</p>

      <button type="button" @click="voltar">
        X
      </button>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { cadastroTemporario } from '../data/cadastroTemporario.js'
import Loading from './Loading.vue'

const router = useRouter()

const nome = ref('')
const email = ref(cadastroTemporario.email)
const senha = ref(cadastroTemporario.senha)
const confirmarSenha = ref('')
const mensagem = ref('')

onMounted(() => {
  document.title = 'CineShop - Finalizando Cadastro'
})

function concluirCadastro() {
    mensagem.value = ''

    if (nome.value.trim() === '') {
        mensagem.value = 'Digite seu nome.'
        return
    }

    if (senha.value !== confirmarSenha.value) {
        mensagem.value = 'As senhas não coincidem.'
        return
    }

    cadastroTemporario.email = email.value
    cadastroTemporario.senha = senha.value

    mensagem.value =
        'Dados validados! Ainda precisamos conectar o cadastro ao backend.'
}

function voltar() {
    router.push('/')
}
</script>

<style>
@import url('../css/base.css');
img#image {
    width: 120px;
    height: 110px;
    margin: 5px;
}

.Final {
  display: flex;
}
</style>