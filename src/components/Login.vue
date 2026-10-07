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
      <h1>➣ Lançamentos</h1>
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
      <h1>➣ Novos produtos</h1>

      <div ref="listaProdutos" class="filmes">
        <ProdutoCard 
        v-for="produto in produtos"
        :key="produto.id"
        :produto="produto"
        />
      </div>
      <div class="secao-motivos">
        <h1>➣ Mais motivos para ter:</h1>
        <div class="motivos">
          <div class="Bloco">
          <h2 id="titulo_bloco">Entretenimento</h2>
          <p id="Texto_bloco">Filmes e séries para aproveitar seu tempo.</p>
          <img id="Elemento" src="/imagem/pngtree-classic-vintage-tv-clipart-old-school-television-png-image_15793935.png" alt="">
        </div>
        <div class="Bloco">
          <h2 id="titulo_bloco">Produtos</h2>
          <p id="Texto_bloco">Encontre produtos inspirados no que você gosta.</p>
          <img id="Elemento" src="/imagem/carrinho.png" alt="">
        </div>
        <div class="Bloco">
          <h2 id="titulo_bloco">Tudo em um lugar</h2>
          <p id="Texto_bloco">Assista e compre em uma só plataforma.</p>
          <img id="Elemento" src="/imagem/rolo-cinema.png" alt="">
        </div>
        </div>
      </div>

      <div class="catalogo">
        <h1> ➣ Produtos e filmes</h1>
        <div class="catalogo">
         <h2>➣ Ação</h2>
         <div ref="listaFilmes" class="filmes">
          <FilmeCard 
            v-for="filme in acao"
            :key="filme.id"
            :filme="filme"
          />
        </div>
        <h2>➣ Séries</h2>
        <div ref="listaFilmes" class="filmes">
          <FilmeCard 
          v-for="filme in series"
          :key="filme.id"
          :filme="filme"
          />
        </div> 
        </div>
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
const lancamentos = filmes.filter(filme => filme.lancamento === '2026');
const acao = filmes.filter(filme => filme.genero?.includes('Ação') && filme.tipo ==='filme');
const series = filmes.filter(filme => filme.tipo === 'serie');

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
  box-shadow: 
    0 0 5px rgb(0, 0, 0),
    0 0 20px rgb(0, 0, 105),
    0 0 40px rgb(0, 0, 156);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;
  margin: 0;
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
  margin: 70px;
  color: white;
  margin-bottom: 0px;
}

.filmes {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  margin: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 20px;
}

.secao-motivos {
  padding: 10px;
}

.motivos {
  display: flex;
  gap: 16px;
}
.Bloco {
  background: linear-gradient(to right, rgb(64, 64, 233), rgb(1, 1, 141));
  margin: 15px;
  padding: 30px;
  width: 200px;
  border-radius: 15px;
  display: grid;
  gap: 26px;
  align-content: center;
  border: 1px solid rgb(180, 186, 248)
}
.catalogo {
  padding: 10px;
  margin-bottom: 0px;
}

#titulo_bloco {
  font-size: 25px;
}
#Texto_bloco {
  color:rgb(182, 181, 181);
}

#Elemento {
  width: 120px;
  height: 125px;
}
</style>