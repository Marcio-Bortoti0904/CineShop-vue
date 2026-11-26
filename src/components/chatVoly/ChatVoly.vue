
<template>
  <section class="chat-area">

    <div class="chat-window">

      <!-- Lista de mensagens -->
      <div class="messages-list" ref="messagesContainer">

        <!-- Percorre a lista de mensagens -->
        <MensagemChat
          v-for="(msg, index) in messages"
          :key="index"
          :mensagem="msg"
        />

        <!-- Indicador de processamento -->
        <div
          v-if="isTyping"
          class="message-bubble voly typing"
        >

          <span class="sender-name">VOLY</span>

          <p>Processando...</p>

        </div>

      </div>

      <!-- Sugestões rápidas -->
      <div class="quick-prompts">

        <button
          @click="sendQuickMessage('Como funciona o Streaming?')"
        >
          🎬 Streaming
        </button>

        <button
          @click="sendQuickMessage('Como rastrear meu pedido?')"
        >
          📦 Produtos
        </button>

        <button
          @click="sendQuickMessage('Quais são os planos?')"
        >
          💎 Planos
        </button>

      </div>

      <!-- Campo de envio -->
      <form
        @submit.prevent="sendMessage"
        class="chat-input-area"
      >

        <input
          v-model="userInput"
          type="text"
          placeholder="Pergunte algo sobre a CineShop..."
          autocomplete="off"
        >

        <button type="submit" class="pixel-btn">
          ENVIAR
        </button>

      </form>

    </div>

  </section>
</template>

<script setup>

// Importando recursos do Vue
import { ref, watch, nextTick } from 'vue'

// Importando o componente de mensagem
import MensagemChat from './MensagemChat.vue'

// Recebe os dados do componente principal
const props = defineProps({

  messages: {
    type: Array,
    required: true
  },

  isTyping: {
    type: Boolean,
    default: false
  }

})

// Evento para enviar mensagens ao componente principal
const emit = defineEmits(['enviar-mensagem'])

// Guarda o texto digitado
const userInput = ref('')

// Referência ao espaço das mensagens
const messagesContainer = ref(null)

// Envia a mensagem digitada
function sendMessage() {

  const cleanText = userInput.value.trim()

  // Impede mensagens vazias
  if (!cleanText) return

  // Envia o texto ao componente principal
  emit('enviar-mensagem', cleanText)

  // Limpa o campo
  userInput.value = ''

}

// Envia uma das sugestões rápidas
function sendQuickMessage(text) {

  emit('enviar-mensagem', text)

}

// Rola a conversa até a última mensagem
function scrollToBottom() {

  nextTick(() => {

    const container = messagesContainer.value

    if (container) {

      container.scrollTop = container.scrollHeight

    }

  })

}

// Observa alterações nas mensagens e no indicador
watch(
  () => [props.messages.length, props.isTyping],
  () => {
    scrollToBottom()
  },
  { flush: 'post' }
)

</script>

<style scoped>
/* Área do chat */
.chat-area {
  flex: 1.15;
  height: 100%;
  max-height: 620px;
}

/* Janela de conversa */
.chat-window {
  background-color: rgba(30, 33, 39, 0.6);
  border: 4px solid var(--voly-border);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.6);

  height: 100%;

  display: flex;
  flex-direction: column;

  padding: 20px;
}

/* Lista de mensagens */
.messages-list {
  flex: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column;

  gap: 16px;
  padding-right: 10px;
  margin-bottom: 15px;
}

/* Barra de rolagem */
.messages-list::-webkit-scrollbar {
  width: 8px;
}

.messages-list::-webkit-scrollbar-thumb {
  background: var(--voly-primary);
}

/* Sugestões rápidas */
.quick-prompts {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.quick-prompts button {
  background: #17151e;
  color: var(--voly-text);

  border: 2px solid var(--voly-border);
  padding: 6px 12px;

  font-family: 'MinhaFonte', sans-serif;
  font-size: 0.85rem;

  cursor: pointer;
  transition: all 0.2s;
}

.quick-prompts button:hover {
  border-color: var(--voly-secondary);
  transform: translateY(-2px);
}

/* Área de digitação */
.chat-input-area {
  display: flex;
  gap: 12px;
}

.chat-input-area input {
  flex: 1;

  background-color: var(--voly-bg-dark);
  border: 3px solid var(--voly-border);

  color: var(--voly-text);
  padding: 14px;

  font-family: 'MinhaFonte', sans-serif;
  font-size: 1rem;

  outline: none;
}

.chat-input-area input:focus {
  border-color: var(--voly-primary);
}

/* Botão de envio */
.pixel-btn {
  background-color: var(--voly-primary);
  color: #fff;

  border: none;
  border-bottom: 4px solid #212db6;
  border-right: 4px solid #212db6;

  padding: 0 22px;

  font-family: 'MinhaFonte', cursive;
  font-size: 0.75rem;

  cursor: pointer;
  transition: transform 0.1s;
}

.pixel-btn:active {
  transform: translate(2px, 2px);
  border-bottom: 2px solid #b62121;
  border-right: 2px solid #b62121;
}
</style>