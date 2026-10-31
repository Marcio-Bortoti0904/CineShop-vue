<template>
    <div class="Perfil-page">
        <div class="Perfil-box">
            <h1>Qual será o perfil do CineShop?</h1>
            <div class="Perfil-opcoes">
                <button
                    class="Perfil-opcao"
                    type="button"
                    @click="selecionarPerfil('cine')"
                >
                    <img src="/imagem/Cine-b.png" alt="Perfil Cine">
                </button>
                <button
                    class="Perfil-opcao"
                    type="button"
                    @click="selecionarPerfil('shop')"
                >
                    <img src="/imagem/Shop-b.png" alt="Perfil Shop">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function selecionarPerfil(perfil) {
    if (perfil === 'cine') {
        router.push('/filmes')
    }

    if (perfil === 'shop') {
        router.push('/produtos')
    }
}
</script>

<style scoped>
.Perfil-page {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;
  margin: 0;
}
.Perfil-box {
    margin-top: 100px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 90px;
    padding-right: 90px;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    border: 4px solid #4e4c4c;
    box-shadow: -4px 0 #121212, 4px 0 #121212, 0 -4px #121212, 0 4px #121212, inset -4px -4px #262626;
}
.Perfil-page h1{
    color: white;
    text-align: center;
}

.Perfil-opcao {
    padding: 4px;
    background: transparent;
    border: 3px solid transparent;

    color: white;
    font: inherit;
    cursor: pointer;
    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        background-color 0.2s ease;
}

.Perfil-opcao img {
    display: block;
    width: 210px;
    height: 200px;
    object-fit: contain;
    image-rendering: pixelated;
}

.Perfil-opcao:hover {
    transform: scale(1.04);
    filter: drop-shadow(0px 0px 8px rgb(255, 16, 16))
          drop-shadow(0px 0px 12px blue);
}

.Perfil-opcao:focus-visible {
    outline: 3px solid #FFD600;
    outline-offset: 4px;
}

.Perfil-opcao:active {
    transform: scale(0.98);
}
</style>