<template>
  <main>

    <!-- ÁREA DO LOGIN -->
    <section class="login-page">

      <section class="login-box">

        <img id="login-image" src="/public/imagem/logo.png" alt="Logo CineShop">

        <h2>Entrar</h2>

        <form>
          <div>
            <input type="email" placeholder="E-mail">
          </div>

          <div>
            <input type="password" placeholder="Senha">
          </div>

          <button type="submit">Entrar</button>
        </form>
        <a href="#">Esqueceu sua senha?</a>

        <p>Ainda não tem uma conta?<a href="#">Cadastre-se</a></p>

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
  aspect-ratio: 16 / 9;
  min-height: 0;
  background-image:
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.604),
      #000000bf
    ),
    url('/imagem/background.png');

  background-repeat: no-repeat;
  background-position: center;
  background-color: #000;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0px 0;
  margin: 0;

  font-family: Arial, Helvetica, sans-serif;
}

.login-box {
  width: 350px;
  padding: 30px;

  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;

  text-align: center;
}

.conteudo {
  width: 90%;
  max-width: 1200px;

  margin: 0 auto;
  padding: 50px 0;

  color: gray;
}

#login-image {
  width: 220px;
  height: 210px;
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