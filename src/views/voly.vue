<template>
  <div class="voly-page">

    <div class="cineshop-container">

      <CabecalhoVoly />

      <main class="main-stage">

        <MascoteVoly />

        <ChatVoly
          :messages="messages"
          :isTyping="isTyping"
          @enviar-mensagem="sendMessage"
        />

      </main>

    </div>

  </div>
</template>

<script setup>
// Importando os componentes
import { ref } from 'vue'

import CabecalhoVoly from '../components/cabecalho/CabecalhoVoly.vue'
import MascoteVoly from '../components/mascote/MascoteVoly.vue'
import ChatVoly from '../components/chatVoly/ChatVoly.vue'

// Guarda o estado de digitação da Voly
const isTyping = ref(false)

// Lista de mensagens da conversa
const messages = ref([

  {
    sender: 'voly',
    text: 'Olá! Eu sou a Voly, sua guia na CineShop. Posso te ajudar com dúvidas sobre nossos filmes, séries ou sobre os produtos da loja. O que você procura hoje?'
  }

])

// Envia uma mensagem para o chat
function sendMessage(text) {

  // Remove espaços desnecessários
  const cleanText = text.trim()

  // Impede mensagens vazias
  if (!cleanText) return

  // Adiciona a mensagem do usuário
  messages.value.push({
    sender: 'user',
    text: cleanText
  })

  // Ativa o indicador de processamento
  isTyping.value = true

  // Simula o tempo de resposta da Voly
  setTimeout(() => {

    // Gera uma resposta com base na pergunta
    const reply = generateVolyReply(cleanText)

    // Desativa o indicador de processamento
    isTyping.value = false

    // Adiciona a resposta da Voly
    messages.value.push({
      sender: 'voly',
      text: reply
    })

  }, 900)

}

// Gera respostas com base em palavras-chave
function generateVolyReply(question) {

  const q = question.toLowerCase()

  // Perguntas sobre filmes e streaming
  if (
    q.includes('streaming') ||
    q.includes('filme') ||
    q.includes('série') ||
    q.includes('assistir')
  ) {

    return 'No catálogo de Streaming da CineShop você assiste em 4K sem anúncios! Basta acessar a aba "Assistir" no menu principal.'

  }

  // Perguntas sobre produtos e pedidos
  else if (
    q.includes('produto') ||
    q.includes('pedido') ||
    q.includes('rastrear') ||
    q.includes('entrega')
  ) {

    return 'Nossa loja entrega para todo o Brasil! Para rastrear um produto, vá em "Meus Pedidos" no seu perfil e clique no código de rastreio.'

  }

  // Perguntas sobre planos
  else if (
    q.includes('plano') ||
    q.includes('preço') ||
    q.includes('assinar') ||
    q.includes('valor')
  ) {

    return 'Temos o Plano Básico (só Streaming) e o Plano CineClub, que dá acesso ao catálogo completo + frete grátis em produtos da loja!'

  }

  // Resposta padrão
  else {

    return 'Boa pergunta! Ainda estou aprendendo sobre tudo na CineShop, mas você pode me perguntar sobre Streaming, Produtos, Rastreio ou Planos.'

  }

}
</script>

<style setup>
/* Importa o CSS específico da página */
@import url('../css/voly.css');
</style>