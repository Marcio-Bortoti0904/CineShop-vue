<template>

    <article class="filme">
  
      <img
        :src="evento.imagem"
        :alt="evento.titulo"
      >
  
      <div class="informacoes">
  
        <span class="categoria">
          {{ evento.categoria }}
        </span>
  
        <h3>
          {{ evento.titulo }}
        </h3>
  
        <p class="data">
          {{ evento.data }}
        </p>
  
        <p class="descricao">
          {{ evento.descricao }}
        </p>
  
      </div>
  
    </article>
  
  </template>
  
  <script setup>
  
  defineProps({
    evento: {
      type: Object,
      required: true
    }
  })
  
  </script>
  
  <style scoped>

  .filme {
    flex: 0 0 220px;
  
    background: #0D1117;
  
    border: 1px solid #1F2937;
    border-radius: 10px;
  
    overflow: hidden;
  
    transition: transform 0.2s ease, border-color 0.2s ease;
  
    cursor: pointer;
  }
  
  .filme:hover {
    transform: scale(1.04);
  
    border-color: #FFD600;
  }
  
  
  /* IMAGEM DO FILME */
  
  .filme img {
    width: 100%;
  
    aspect-ratio: 2 / 3;
  
    object-fit: cover;
    object-position: center;
  
    display: block;
  }
  
  
  /* INFORMAÇÕES */
  
  .informacoes {
    padding: 12px;
  }
  
  
  .categoria {
    color: #FFD600;
  
    font-size: 10px;
    font-weight: 700;
  
    text-transform: uppercase;
  }
  
  
  .informacoes h3 {
    margin: 6px 0;
  
    color: white;
  
    font-size: 16px;
    line-height: 1.2;
  }
  
  
  .data {
    margin: 0 0 8px;
  
    color: #D1D5DB;
  
    font-size: 11px;
    font-weight: 600;
  }
  
  
  .descricao {
    margin: 0;
  
    color: #9CA3AF;
  
    font-size: 12px;
    line-height: 1.4;
  }
  
  </style>
