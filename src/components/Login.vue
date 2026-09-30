<template>
  <main>

    <!-- ÁREA DO LOGIN -->
    <section class="login-page">
      <section class="login-box">

  <img
    id="login-image"
    src="/public/imagem/logo.png"
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

      <div class="filmes">
        <div class="filme">Filme 1</div>
        <div class="filme">Filme 2</div>
        <div class="filme">Filme 3</div>
        <div class="filme">Filme 4</div>
      </div>


      <h2>Projetos CineShop</h2>

      <div class="filmes">
        <div class="filme">Projeto 1</div>
        <div class="filme">Projeto 2</div>
        <div class="filme">Projeto 3</div>
        <div class="filme">Projeto 4</div>
      </div>

    </section>

  </main>
</template>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'CineShop - Respondendo as necessidades'
})
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
  padding: 50px 0;

  color: gray;
}

.filmes {
  display: flex;
  gap: 20px;

  overflow-x: auto;

  padding-bottom: 20px;
}

.filme {
  min-width: 180px;
  height: 250px;

  background: #222;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
}
</style>