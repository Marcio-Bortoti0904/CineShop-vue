<template>

  <article class="produto">

    <div class="imagem-produto">
      <img
        :src="produto.imagem"
      >
    </div>

    <div class="informacoes">

      <h3>{{ produto.nome }}</h3>

      <p class="preco">
        R$ {{ produto.preco }}
      </p>

    </div>

  </article>

</template>

<script setup>

defineProps({
  produto: {
    type: Object,
    required: true
  }
})

</script>
  
<style scoped>

.produto {
  flex: 0 0 240px;
  background: white;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 8px;

  overflow: hidden;

  cursor: pointer;

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.produto:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-color: white;
}

.imagem-produto {
  width: 210px;
  height: 220px;

  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  background: white;
}

.imagem-produto img {
  max-width: 100%;
  max-height: 100%;

  object-fit: contain;
}

.informacoes {
  padding: 12px;
}

.informacoes h3 {
  margin: 0 0 8px;

  color: #333;

  font-size: 15px;
}

.avaliacao {
  margin: 0 0 8px;

  color: #777;

  font-size: 13px;
}

.preco {
  margin: 0;

  color: #222;

  font-size: 22px;
  font-weight: bold;
}
</style>