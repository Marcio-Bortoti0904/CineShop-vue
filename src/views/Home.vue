<template>
    <header>
      <Header
      :usuario="usuario"
      @abrirPerfil="abrirPerfilOuLogin"
      :busca="busca"
      :quantidade-carrinho="quantidadeCarrinho"
      :usuario-label="usuarioLabel"
      @atualizar-busca="busca = $event"
      @abrir-carrinho="abrirCarrinho"
      @abrir-perfil="abrirPerfil"
      />
      <div
  v-if="modalAberto"
  class="perfil-overlay"
  @click.self="fecharModal"
>
  <div class="perfil-box">

    <!-- BOTÃO DE FECHAR -->
    <button
      class="fechar"
      @click="fecharModal"
    >
      X
    </button>
      <Login_perfil
      :modal-tipo="modalTipo"
      :login-dados="loginDados"
      :usuario="usuario"
      @entrar="entrar"
      @sair="sair"
    />
  </div>
</div>
    </header>
    <!-- CONTEÚDO -->
     <main class="conteudo-filmes">
      <section class="conteudo" id="streaming">
      <h2>➣ Streaming</h2>

      <div ref="listaFilmes" class="filmes">
        <PassadorHorizontal>
            <CatCard
            v-for="categoria in categorias"
            :key="categoria.id"
            :categoria="categoria"
          />
        </PassadorHorizontal>
      </div>
    </section>

    <section class="conteudo" id="produtos">
      <h2>➣ Produtos</h2>

      <!-- Os produtos poderão ser adicionados aqui depois. -->
    </section>
</main>
<Mascote />
</template>


<script setup>
import { onMounted} from 'vue'

import { useAuth } from '../data/avatar.js'

// COMPONENTES
import { categorias } from '../data/categoria.js'
import CatCard from '../components/card/CatCard.vue'
import Header from '../components/cabecalho/Header.vue'
import PassadorHorizontal from '../components/objetos/PassadorHorizontal.vue'
import Mascote from '../components/mascote/Mascote.vue'
import Login_perfil from './Login_perfil.vue'

onMounted(() => {
  document.title = 'CineShop - Página inicial'
})

const {
  usuario,
  modalAberto,
  modalTipo,
  loginDados,
  abrirPerfilOuLogin,
  entrar,
  sair,
  fecharModal
} = useAuth()
</script>

<style scoped>
@import url('/src/css/base.css');
@import url('/src/css/avatar-bot.css');
</style>
