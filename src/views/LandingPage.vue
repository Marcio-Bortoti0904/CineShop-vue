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

          <form @submit.prevent="realizarAcao">
            <h1>
                {{ modo === 'login' ? 'Entretenha-se ou compre aqui!' : 'Crie sua conta CineShop' }}
            </h1>
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

            <button type="submit">
              Vamos lá!
            </button>
          </form>
          <p v-if="mensagem">
              {{ mensagem }}
          </p>
          <a
          v-if="modo === 'login'"
          id="senha_esquecida"
          href="#"
          >
              Esqueceu sua senha?
          </a>

          <p v-if="modo === 'login'">
              Ainda não tem uma conta?
              <a href="#" @click.prevent="modo = 'cadastro'">
                  Cadastre-se
              </a>
          </p>

          <p v-else>
              Já tem uma conta?
              <a href="#" @click.prevent="modo = 'login'">
                  Entrar
              </a>
          </p>
        </div>
    </section>

        </section>


        <!-- ÁREA DO CONTEÚDO -->
        <section class="conteudo">
          <h1>➣ Lançamentos</h1>
          <div class="passador">
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard
                  v-for="filme in lancamentos"
                  :key="filme.id"
                  :filme="filme"
                />
              </PassadorHorizontal>
            </div>
            <span class="fumaca fumaca-esquerda" aria-hidden="true"></span>
            <span class="fumaca fumaca-direita" aria-hidden="true"></span>
          </div>
          <h1>➣ Novos produtos</h1>
          <div ref="listaProdutos" class="filmes">
            <PassadorHorizontal>
              <ProdutoCard 
              v-for="produto in produtos"
              :key="produto.id"
              :produto="produto"
              />
            </PassadorHorizontal>
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
            <h1>➣ Ação</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                  v-for="filme in acao"
                  :key="filme.id"
                  :filme="filme"
                />
              </PassadorHorizontal>
              </div>

            <h1>➣ Séries</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                v-for="filme in series"
                :key="filme.id"
                :filme="filme"
                />
            </PassadorHorizontal>
            </div>
            <h1>➣ Romance</h1>
            <div ref="listaFilmes" class="filmes">
              <PassadorHorizontal>
                <FilmeCard 
                  v-for="filme in romance"
                  :key="filme.id"
                  :filme="filme"
                />
              </PassadorHorizontal>
              </div>
              <h1>➣ Ficção Científica</h1>
              <div ref="listaFilmes" class="filmes">
                <PassadorHorizontal>
                  <FilmeCard 
                    v-for="filme in ficcao_cient"
                    :key="filme.id"
                    :filme="filme"
                  />
                 </PassadorHorizontal>
                </div>
              <h1>➣ Fantasia</h1>
              <div ref="listaFilmes" class="filmes">
                <PassadorHorizontal>
                  <FilmeCard 
                    v-for="filme in fantasia"
                    :key="filme.id"
                    :filme="filme"
                  />
                </PassadorHorizontal>
                </div>
                <h1>➣ Terror</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in terror"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                  </div>
                <h1>➣ Comédia</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in comedia"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Animação</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in animacao"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Suspense e Mistério</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in suspense"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Drama</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in drama"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Aventura</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in aventura"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Documentario</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in documentario"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Musical</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in Musical"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Guerra</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in guerra"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Crime</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in crime"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Super-herói</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in heroi"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Anime</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in anime"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
                </div>
                <h1>➣ Infantil</h1>
                <div ref="listaFilmes" class="filmes">
                  <PassadorHorizontal>
                    <FilmeCard 
                      v-for="filme in infantil"
                      :key="filme.id"
                      :filme="filme"
                    />
                  </PassadorHorizontal>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { cadastroTemporario } from '../data/cadastroTemporario.js'

import PassadorHorizontal from '../components/PassadorHorizontal.vue';
import FilmeCard from '../components/Filmecard.vue'
import ProdutoCard from '../components/Produtocard.vue'
import { filmes } from '../data/filmes.js'
import { produtos } from '../data/produtos.js'

onMounted(() => {
  document.title = 'CineShop - Respondendo as necessidades'
})
const cont = [...filmes].sort(() => Math.random() - 0.5)

const lancamentos = cont.filter(filme => filme.lancamento?.includes('2026'));
const acao = cont.filter(filme => filme.genero?.includes('Ação') && filme.tipo ==='filme');
const romance = cont.filter(filme => filme.genero?.includes('Romance') && filme.tipo ==='filme');
const ficcao_cient = cont.filter(filme => filme.genero?.includes('Ficção Científica') && filme.tipo ==='filme');
const fantasia = cont.filter(filme => filme.genero?.includes('Fantasia') && filme.tipo ==='filme');
const terror = cont.filter(filme => filme.genero?.includes('Terror') && filme.tipo ==='filme');
const comedia = cont.filter(filme => filme.genero?.includes('Comédia') && filme.tipo ==='filme');
const animacao = cont.filter(filme => filme.genero?.includes('Animação') && filme.tipo ==='filme');
const suspense = cont.filter(filme => filme.tipo === 'filme' && (filme.genero?.includes('Suspense') || filme.genero?.includes('Mistério')));
const drama = cont.filter(filme => filme.tipo === 'filme' && (filme.genero?.includes('Drama')));
const aventura = cont.filter(filme => filme.tipo === 'filme' && (filme.genero?.includes('Aventura')));
const documentario = cont.filter(filme => filme.tipo === 'filme' && (filme.genero?.includes('Documentário')));
const Musical = cont.filter(filme => filme.tipo === 'filme' && (filme.genero?.includes('Musical')));
const guerra = cont.filter(filme => filme.tipo === 'filme' && (filme.genero?.includes('Guerra')));
const crime = cont.filter(filme => filme.tipo === 'filme' && (filme.genero?.includes('Crime')));
const heroi = cont.filter(filme => filme.tipo === 'filme' && (filme.genero?.includes('Super-herói')));
const anime = cont.filter(filme => filme.tipo === 'filme' && (filme.genero?.includes('Anime')));
const infantil = cont.filter(filme => filme.tipo === 'filme' && (filme.genero?.includes('Infantil')));

const series = cont.filter(filme => filme.tipo === 'serie');

const router = useRouter()

const listaFilmes = ref(null);
const listaProdutos = ref(null);
const modo = ref('login')

const email = ref('')
const senha = ref('')
const mensagem = ref('')

function realizarAcao() {
    mensagem.value = ''

    if (modo.value === 'cadastro') {
        cadastroTemporario.email = email.value
        cadastroTemporario.senha = senha.value

        router.push('/finalizarcadastro')
        return
    }

    mensagem.value =
        'O login ainda precisa ser conectado ao sistema de usuários.'
}
</script>

<style scoped>
@import url('../css/base.css');
</style>