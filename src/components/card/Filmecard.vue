<template>
  <article class="filme">

    <!-- Ao clicar, abre a página do filme -->
    <RouterLink
      :to="`/assistir/${filme.id}`"
      class="filme-link"
    >

      <img
        :src="filme.imagem"
        :alt="filme.nome"
      >

      <div class="filme-info">
        <h3>{{ filme.nome }}</h3>

        <span>{{ filme.lancamento }}</span>
      </div>
    </RouterLink>

  </article>
</template>

<script setup>
// Recebe os dados do filme.
defineProps({
  filme: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
@import url('/src/css/base.css');

.filme {
  overflow: hidden;
  transition: transform 0.3s;
}

.filme-link {
  display: block;
  color: white;
  text-decoration: none;
}

.filme img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.filme-info {
  padding: 10px;
}

.filme-info h3 {
  margin-bottom: 5px;
}
</style>