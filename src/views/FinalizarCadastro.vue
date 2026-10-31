<template>
    <main class="Final">
      <Loading />
    <section class="dates">
      <img id="image" src="/imagem/Logo.png" alt="Logo CineShop">
      <h1>Finalize seu cadastro</h1>
      <p>Complete seus dados para fazer parte do CineShop.</p>

      <form @submit.prevent="concluirCadastro" class="entradas">
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

      <button type="button" @click="voltar" class="fechar">
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
    width: 140px;
    height: 130px;
    margin: 5px;
}

.Final {
    display: flex;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center;     /* Centraliza verticalmente */

    min-height: 100%;
    width: 100%;

    padding: 20px;
    box-sizing: border-box;
    margin: 0;
}

.dates {
    display: flex;
    flex-direction: column;  /* Organiza os elementos em coluna */
    justify-content: center;
    align-items: center;

    background: rgb(47, 47, 48);
    padding: 30px;
    gap: 10px;
    margin: 0;

    text-align: center;
    border: 4px solid #4e4c4c;
    box-sizing: border-box;
    max-width: 100%;
}

.entradas {
    display: flex;
    flex-direction: column;
    align-items: center;

    background: rgb(32, 32, 32);
    padding: 30px;
    margin: 10px;
    gap: 10px;
}

.dates p {
  color: white;
}

.dates h1 {
  color: rgb(0, 89, 255);
}

.entradas div {
    width: 100%;
    padding: 2px;
    box-sizing: border-box;
}

.entradas input {
    width: 300px;
    height: 45px;

    font-size: 16px;
    padding: 10px;
    color: rgb(0, 0, 0);
    box-sizing: border-box;
    border-radius: 50px;
    background: rgb(97, 97, 97);
}

.entradas input::placeholder {
    color: rgba(201, 201, 201, 0.658);
}
/* Botão de concluir cadastro */
.entradas button {
    width: 350px;
    height: 50px;

    font-size: 18px;
    padding: 10px;

    background: linear-gradient(to right, rgb(3, 0, 151), rgb(199, 0, 0));
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 50px;

    margin: 20px
}

.fechar {
    width: 40px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 50%;
}
</style>