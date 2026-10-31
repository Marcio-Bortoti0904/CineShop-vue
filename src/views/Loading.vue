<template>
    <div id="loading-screen">
      <div class="loading-box pixel-border">
        <div><img src="/imagem/Logo.png" id="login-image" alt=""></div>
          <div class="loading-text">LOADING</div>
          <!-- Barra que vai preencher via animação CSS -->
          <div class="pixel-bar-container pixel-border">
          <div class="pixel-bar-progress"></div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const loadingScreen = document.getElementById('loading-screen')

  setTimeout(() => {
    loadingScreen.classList.add('fade-out')
  }, 1500)

  setTimeout(() => {
    loadingScreen.style.display = 'none'
  }, 2000)
})
</script>

<style scoped>
@import url("../css/base.css");
</style>