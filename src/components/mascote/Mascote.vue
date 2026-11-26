<template>
<div class="mascot-container">
    <div class="mascot-bubble pixel-border">
        <p id="texto">Olá! Sou a Voly. Precisa de ajuda?</p>
      </div>
    <div class="mascot-image-wrapper">
        <img
          src="/imagem/Voly.png"
          alt="Mascote Voly"
          class="mascot-img"
        >
    </div>
</div>
</template>

<style scoped>
/* MASCOTE VOLY */
.mascot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  animation: mascot-float 3s ease-in-out infinite;
}

.mascot-bubble {
  position: relative;
  background-color: #1a1a1a;
  padding: 10px;
  max-width: 180px;
  margin-bottom: 12px;
  line-height: 1.4;
  border-color: #333333;
}

.mascot-bubble #texto {
  font-family: 'MinhaFonte', sans-serif;
  font-size: 20px;
  color: #00ffcc;
  text-align: center;
}

.mascot-bubble::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background-color: #1a1a1a;
  border-right: 4px solid #333333;
  border-bottom: 4px solid #333333;
}

.mascot-image-wrapper {
  width: 150px;
  display: flex;
  justify-content: center;
  animation: mascot-float 3s ease-in-out infinite;
}

.mascot-img {
  width: 100%;
  height: auto;
  image-rendering: pixelated;
  filter: drop-shadow(0px 0px 8px rgb(0, 247, 255))
          drop-shadow(0px 0px 12px blue);
}

/* ANIMAÇÃO */
@keyframes pixel-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

@keyframes fill-bar {
    0% { width: 0%; }
    100% { width: 100%; }
}

@keyframes mascot-float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
