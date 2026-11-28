<template>
  <main class="conteudo-filmes">
    <section class="filme-container">
    <div class="conteudo">
      <img
        :src="filme.imagem"
        :alt="filme.nome"
      >
    </div>
    <div class="conteudo">

      <h2>{{ filme.titulo }}</h2>

      <div class="informacoes">
        <span>{{ filme.ano }}</span>
        <span>{{ filme.genero }}</span>
        <span>{{ filme.duracao }}</span>
      </div>

      <p class="descricao">
        <strong>Diretor:</strong>
        {{ filme.diretor }}
      </p>

      <p class="descricao">
        <strong>Sinopse:</strong>
        {{ filme.sinopse }}
      </p>

      <p class="descricao">
        <strong>Lançamento:</strong>
        {{ filme.lancamento }}
      </p>

      <!-- Emite um evento para o componente principal -->
      <button @click="$emit('assistir')">
        ▶ Assistir filme
      </button>

    </div>
  </section>
  </main>
</template>

<script setup>
// Recebe os dados do filme enviados pela página principal.
defineProps({
  filme: {
    type: Object,
    required: true
  }
})

// Informa ao componente principal que o botão foi clicado.
defineEmits(['assistir'])
</script>

<style scoped>
.filme-container {
  display: flex;
  align-items: center;

  padding: 10px 5% 70px;

  background-image:
    linear-gradient(
      to right,
      #141414 5%,
      rgba(20, 20, 20, 0.8) 40%,
      rgba(20, 20, 20, 0.2) 100%
    ),
    linear-gradient(
      to top,
      #141414 0%,
      transparent 40%
    ),
    url('/imagens/titanic.jpg');

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.conteudo {
  max-width: 600px;
}

.conteudo h2 {
  font-size: 55px;
  margin-bottom: 20px;
}

.informacoes {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;

  color: #cccccc;
  font-size: 14px;
}

.descricao {
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 15px;
  color: #eeeeee;
}

.descricao strong {
  color: white;
}

button {
  background: #e50914;
  color: white;

  border: none;
  border-radius: 5px;

  padding: 14px 28px;

  font-size: 17px;
  font-weight: bold;

  cursor: pointer;
  margin-top: 15px;

  transition: 0.3s;
}

button:hover {
  background: #b20710;
  transform: scale(1.05);
}

/* Responsividade */
@media (max-width: 600px) {
  .filme-container {
    min-height: 600px;
    padding: 120px 20px 50px;
    background-position: center;
  }

  .conteudo h2 {
    font-size: 35px;
  }

  .informacoes {
    flex-wrap: wrap;
    gap: 10px;
  }

  .descricao {
    font-size: 14px;
  }
}
</style>