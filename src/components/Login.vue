<template>
  <main>

    <!-- ÁREA DO LOGIN -->
    <section class="login-page">
      <section class="login-box">

  <img
    id="login-image"
    src="/imagem/Logo.png"
    alt="Logo CineShop"
  >

  <div class="Campo_de_texto">

    <form>
      <h2>Entretenha-se ou compre aqui!</h2>

      <div>
        <input
          type="email"
          placeholder="E-mail"
        >
      </div>

      <div>
        <input
          type="password"
          placeholder="Senha"
        >
      </div>

      <button type="submit">
        Entrar
      </button>
    </form>

    <a id="senha_esquecida" href="#">Esqueceu sua senha?</a>

    <p>
      Ainda não tem uma conta?
      <a href="#">Cadastre-se</a>
    </p>

  </div>
</section>

    </section>


    <!-- ÁREA DO CONTEÚDO -->
    <section class="conteudo">
      <h2>Lançamentos</h2>
      <div
        ref="listaFilmes"
        class="filmes"
      >
        <FilmeCard
          v-for="filme in lancamentos"
          :key="filme.id"
          :filme="filme"
        />
      </div>
      <h2>Novos produtos</h2>

      <div ref="listaProdutos" class="filmes">
        <ProdutoCard 
        v-for="produto in produtos"
        :key="produto.id"
        :produto="produto"
        />
      </div>
      <h2>Ação</h2>
      <div ref="listaFilmes" class="filmes">
        <FilmeCard 
        v-for="filme in acao"
        :key="filme.id"
        :filme="filme"
        />
      </div>
    </section>

  </main>
</template>
<script setup>
import { ref, onMounted} from 'vue'

import FilmeCard from './Filmecard.vue'
import ProdutoCard from './Produtocard.vue'
import { filmes } from '/src/data/filmes.js'
import { produtos } from '/src/data/produtos.js'
onMounted(() => {
  document.title = 'CineShop - Respondendo as necessidades'
})
const lancamentos = filmes.filter(filme => filme.tipo === 'lançamento 2026');

const acao = filmes.filter(filme => filme.genero?.includes('Ação'));
const listaFilmes = ref(null);
const listaProdutos = ref(null);
</script>

<style>
@import url('./global.css');

.login-page {
  width: 100%;
  min-height: 100vh;

  background-image:
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.604),
      rgba(0, 0, 0, 0.75)
    ),
    url('/imagem/background.png');

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #000;
  border: 2px outset blue;
  box-shadow: 
    0 0 5px blue,
    0 0 20px blue,
    0 0 40px blue;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;
  margin: 0;

  font-family: Arial, Helvetica, sans-serif;
}

.login-box {
  width: 600px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  color: White;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  text-align: center;
}

.Campo_de_texto h2 {
  padding-bottom: 10px;
  padding-top: 10px;
}

a#senha_esquecida {
   display: inline-block;
 padding-top: 10px;
}

.Campo_de_texto p {
  padding: 10px;
}

.Campo_de_texto input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
}

.Campo_de_texto button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}

img#login-image {
  width: 220px;
  height: 210px;
}

.conteudo {
  width: 90%;
  max-width: 1200px;
  
  margin: 0 auto;
  padding: 20px 0;
  color: gray;
}

.filmes {
  display: flex;
  gap: 20px;

  overflow-x: auto;

  padding-bottom: 20px;
}
</style>
