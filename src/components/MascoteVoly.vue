
<template>
  <section class="mascot-area">

    <!-- Animação da mascote -->
    <div class="voly-floating-box">

      <img
        src="/imagem/voly(2).png"
        alt="Mascote Voly"
        class="voly-image"
      >

    </div>

    <!-- Sombra da mascote -->
    <div class="floating-shadow"></div>

    <!-- Legenda -->
    <p class="mascot-caption">
      Assistente Virtual & Guia
    </p>

  </section>
</template>

<style scoped>
.mascot-area {
  flex: 0.85;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Movimento de levitação */
@keyframes floatAnimation {

  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-22px);
  }

  100% {
    transform: translateY(0px);
  }

}

/* Animação da sombra */
@keyframes shadowScale {

  0% {
    transform: scale(1);
    opacity: 0.5;
  }

  50% {
    transform: scale(0.75);
    opacity: 0.2;
  }

  100% {
    transform: scale(1);
    opacity: 0.5;
  }

}

/* Imagem flutuante */
.voly-floating-box {
  animation: floatAnimation 3.5s ease-in-out infinite;
}

.voly-image {
  width: 451px;
  max-width: 100%;
}

/* Sombra no chão */
.floating-shadow {
  width: 160px;
  height: 16px;
  background: rgba(13, 12, 17, 0.35);
  border-radius: 50%;
  margin-top: 30px;
  animation: shadowScale 3.5s ease-in-out infinite;
}

/* Texto abaixo da mascote */
.mascot-caption {
  margin-top: 20px;
  font-family: 'MinhaFonte', cursive;
  font-size: 0.7rem;
  color: var(--voly-muted);
}
</style>