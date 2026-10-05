<template>
    <section class="filmes-page">
  
      <h1>Eventos Culturais</h1>
  
      <div class="lista-filmes">
        <Filmecard
          v-for="filme in filmes"
          :key="filme.id"
          :evento="filme"
        />
      </div>
  
    </section>
  </template>
  
  <script setup>
  import Filmecard from './Filmecard.vue'
  import { filmes } from '../data/filmes.js'
  </script>
  
  <style scoped>
  
  .filmes-page {
    padding: 30px;
  }
  
  .filmes-page h1 {
    margin: 0 0 25px;
  
    color: #ffffff;
  
    font-size: 28px;
    font-weight: 700;
  }
  
  .lista-filmes {
    display: grid;
  
    grid-template-columns: repeat(
      auto-fill,
      minmax(280px, 1fr)
    );
  
    gap: 20px;
  }
  
  </style>
