<template>
  <main>
      <button id="entrar">
        <strong>Entrar</strong>
      </button>
    <section class="login-page">
      
      <section class="login-box">
      <img
          id="login-image"
          src="/imagem/Logo.png"
          alt="Logo CineShop"
        >

        <div class="Campo_de_texto">

          <form>
            <h1>Entretenha-se ou compre aqui!</h1>

            <div>
              <input
                type="email"
                placeholder="E-mail"
                required
              >
            </div>

            <div>
              <input
                type="password"
                placeholder="Senha"
                required
              >
            </div>

            <button type="submit">
              Vamos lá!
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
          <PassadorHorizontal>
              <FilmeCard
              v-for="filme in lancamentos"
              :key="filme.id"
              :filme="filme"
            />
          </PassadorHorizontal>
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
              <h2>Entretenimento</h2>
              <p>Filmes e séries para aproveitar seu tempo.</p>
              <img id="Elemento" src="/imagem/pngtree-classic-vintage-tv-clipart-old-school-television-png-image_15793935.png" alt="">
            </div>
            <div class="Bloco">
              <h2>Produtos</h2>
              <p>Encontre produtos inspirados no que você gosta.</p>
              <img src="/imagem/carrinho.png" alt="">
            </div>
            <div class="Bloco">
              <h2>Tudo em um lugar</h2>
              <p>Assista e compre em uma só plataforma.</p>
              <img src="/imagem/rolo-cinema.png" alt="">
            </div>
            <div class="Bloco">
              <h2>Experiência personalizada</h2>
              <p>Encontre filmes, séries e produtos de acordo com seus interesses.</p>
              <img src="/imagem/oculos3d.png" alt="">
            </div>
            <div class="Bloco">
              <h2>Aproveite de casa</h2>
              <p>Entretenimento e produtos sem precisar sair de casa.</p>
              <img src="/imagem/desc.png" alt="">
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
    <section class="convite-page">
      <form>
        <p>Quer assistir ou comprar? Informe seu email para começar a usar o CineShop.</p>
        <div>
          <input 
            type="email" 
            placeholder="E-mail" 
            required
          >
        </div>
      </form>
      <RouterLink to="/home">
          Home
        </RouterLink>
    </section>
  </section> 
  </main>
</template>
<script setup>
import { ref, onMounted} from 'vue'

import PassadorHorizontal from './PassadorHorizontal.vue';
import FilmeCard from './Filmecard.vue'
import ProdutoCard from './Produtocard.vue'
import { filmes } from '../data/filmes.js'
import { produtos } from '../data/produtos.js'
onMounted(() => {
  document.title = 'CineShop - Respondendo as necessidades'
})
const cont = [...filmes].sort(() => Math.random() - 0.5)

const lancamentos = cont.filter(filme => filme.lancamento?.includes('2026'));
const acao = cont.filter(filme => filme.genero?.includes('Ação') && filme.tipo ==='filme');
const series = cont.filter(filme => filme.tipo === 'serie');

const listaFilmes = ref(null);
const listaProdutos = ref(null);
</script>

<style>
@import url('../css/base.css');
</style>