<template>
    <!-- Container principal onde o Vue vai controlar a aplicação -->
  <div id="app" class="cineshop-container">
    
    <!-- Cabeçalho simples com a marca -->
    <header class="top-bar">
      <span class="pixel-logo">CINE<span class="highlight">SHOP</span></span>
      <span class="status-badge">● VOLY ONLINE</span>
    </header>

    <!-- Área principal dividida em duas colunas -->
    <main class="main-stage">
      
      <!-- LADO ESQUERDO: Espaço da Mascote Voly -->
      <section class="mascot-area">
        <!-- Div com a animação de levitação -->
        <div class="voly-floating-box">
          <!-- Espaço reservado para você colocar sua tag <img> futuramente -->
          <div class="voly-floating-box">
            <img src="/imagem/Voly.png" alt="Mascote Voly" style="width: 240px; image-rendering: pixelated;">
          </div>
        </div>
        <!-- Sombra no chão que acompanha a flutuação -->
        <div class="floating-shadow"></div>
        <p class="mascot-caption">Assistente Virtual & Guia</p>
      </section>

      <!-- LADO DIREITO: Interface de Chat -->
      <section class="chat-area">
        <div class="chat-window">
          
          <!-- Lista de mensagens (Renderizada dinamicamente pelo Vue) -->
          <div class="messages-list" ref="messagesContainer">
            <div 
              v-for="(msg, index) in messages" 
              :key="index" 
              :class="['message-bubble', msg.sender]"
            >
              <span class="sender-name">{{ msg.sender === 'voly' ? 'VOLY' : 'VOCÊ' }}</span>
              <p>{{ msg.text }}</p>
            </div>

            <!-- Indicador de "digitando..." quando a Voly estiver respondendo -->
            <div v-if="isTyping" class="message-bubble voly typing">
              <span class="sender-name">VOLY</span>
              <p>Processando...</p>
            </div>
          </div>

          <!-- Sugestões rápidas de perguntas para ajudar o usuário -->
          <div class="quick-prompts">
            <button @click="sendQuickMessage('Como funciona o Streaming?')">🎬 Streaming</button>
            <button @click="sendQuickMessage('Como rastrear meu pedido?')">📦 Produtos</button>
            <button @click="sendQuickMessage('Quais são os planos?')">💎 Planos</button>
          </div>

          <!-- Formulário de envio de mensagem -->
          <form @submit.prevent="sendMessage" class="chat-input-area">
            <input 
              type="text" 
              v-model="userInput" 
              placeholder="Pergunte algo sobre a CineShop..." 
              autocomplete="off"
            />
            <button type="submit" class="pixel-btn">ENVIAR</button>
          </form>

        </div>
      </section>

    </main>
  </div>
</template>
<style scoped>
.cineshop-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 1300px;
    margin: 0 auto;
    padding: 20px;
  }
  
  /* Cabeçalho */
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 4px solid var(--border-pixel);
    margin-bottom: 20px;
  }
  
  .pixel-logo {
    font-family: 'Press Start 2P', cursive;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
  
  .pixel-logo .highlight {
    color: var(--secondary-neon);
  }
  
  .status-badge {
    font-family: 'Press Start 2P', cursive;
    font-size: 0.65rem;
    color: #10b981;
    background: rgba(16, 185, 129, 0.1);
    padding: 8px 12px;
    border: 2px solid #10b981;
  }
  
  /* Layout Principal: Esquerda (Mascote) e Direita (Chat) */
  .main-stage {
    display: flex;
    flex: 1;
    gap: 30px;
    align-items: center;
    height: calc(100vh - 100px);
  }
  
  /* --- SEÇÃO DA MASCOTE (LEVE DESLOCAMENTO À ESQUERDA) --- */
  .mascot-area {
    flex: 0.85; /* Faz ela ocupar um espaço levemente mais focado à esquerda */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  /* Animação de Levitação */
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
  
  .voly-floating-box {
    animation: floatAnimation 3.5s ease-in-out infinite;
  }
  
  /* Placeholder temporário onde você vai colocar a imagem da Voly */
  .voly-placeholder {
    width: 240px;
    height: 240px;
    background: linear-gradient(145deg, #1e1933, #120f1f);
    border: 4px solid var(--primary-neon);
    /* Sombra dura estilo pixel art */
    box-shadow: 8px 8px 0px var(--secondary-neon);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Press Start 2P', cursive;
    font-size: 1.8rem;
    color: var(--text-light);
    text-shadow: 3px 3px 0px var(--primary-neon);
  }
  
  .floating-shadow {
    width: 160px;
    height: 16px;
    background: rgba(139, 92, 246, 0.35);
    border-radius: 50%;
    margin-top: 30px;
    animation: shadowScale 3.5s ease-in-out infinite;
  }
  
  .mascot-caption {
    margin-top: 20px;
    font-family: 'Press Start 2P', cursive;
    font-size: 0.7rem;
    color: var(--text-muted);
  }
  
  /* --- SEÇÃO DO CHAT (DIREITA) --- */
  .chat-area {
    flex: 1.15;
    height: 100%;
    max-height: 620px;
  }
  
  .chat-window {
    background-color: var(--panel-bg);
    border: 4px solid var(--border-pixel);
    /* Efeito de borda pixelada externa */
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.6);
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  
  .messages-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 10px;
    margin-bottom: 15px;
  }
  
  /* Estilização da barra de rolagem do chat */
  .messages-list::-webkit-scrollbar {
    width: 8px;
  }
  .messages-list::-webkit-scrollbar-thumb {
    background: var(--primary-neon);
  }
  
  .message-bubble {
    max-width: 80%;
    padding: 14px 18px;
    line-height: 1.5;
    font-size: 0.95rem;
    position: relative;
  }
  
  .sender-name {
    display: block;
    font-family: 'Press Start 2P', cursive;
    font-size: 0.6rem;
    margin-bottom: 8px;
  }
  
  /* Balão da Voly */
  .message-bubble.voly {
    align-self: flex-start;
    background-color: #211c36;
    border-left: 4px solid var(--secondary-neon);
    border-bottom: 4px solid #120f1f;
  }
  .message-bubble.voly .sender-name {
    color: var(--secondary-neon);
  }
  
  /* Balão do Usuário */
  .message-bubble.user {
    align-self: flex-end;
    background-color: #2d1f47;
    border-right: 4px solid var(--primary-neon);
    border-bottom: 4px solid #181026;
  }
  .message-bubble.user .sender-name {
    color: var(--primary-neon);
    text-align: right;
  }
  
  /* Botões de perguntas rápidas */
  .quick-prompts {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  
  .quick-prompts button {
    background: #1f1b33;
    color: var(--text-light);
    border: 2px solid var(--border-pixel);
    padding: 6px 12px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .quick-prompts button:hover {
    border-color: var(--secondary-neon);
    transform: translateY(-2px);
  }
  
  /* Área de digitação */
  .chat-input-area {
    display: flex;
    gap: 12px;
  }
  
  .chat-input-area input {
    flex: 1;
    background-color: var(--bg-dark);
    border: 3px solid var(--border-pixel);
    color: var(--text-light);
    padding: 14px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    outline: none;
  }
  
  .chat-input-area input:focus {
    border-color: var(--primary-neon);
  }
  
  .pixel-btn {
    background-color: var(--primary-neon);
    color: #fff;
    border: none;
    border-bottom: 4px solid #5b21b6;
    border-right: 4px solid #5b21b6;
    padding: 0 22px;
    font-family: 'Press Start 2P', cursive;
    font-size: 0.75rem;
    cursor: pointer;
    transition: transform 0.1s;
  }
  
  .pixel-btn:active {
    transform: translate(2px, 2px);
    border-bottom: 2px solid #5b21b6;
    border-right: 2px solid #5b21b6;
  }
  
  /* Responsividade para telas menores (celulares) */
  @media (max-width: 768px) {
    body { overflow: auto; }
    .main-stage { flex-direction: column; height: auto; }
    .voly-placeholder { width: 140px; height: 140px; font-size: 1.2rem; }
    .chat-area { width: 100%; height: 500px; }
  }
</style>

<script setup>
createApp({
  // O 'data' guarda todas as variáveis reativas da tela
  data() {
    return {
      userInput: '', // Guarda o que o usuário está digitando no momento
      isTyping: false, // Controla se a mensagem "Processando..." aparece
      // Lista inicial de mensagens no chat
      messages: [
        {
          sender: 'voly',
          text: 'Olá! Eu sou a Voly, sua guia na CineShop. Posso te ajudar com dúvidas sobre nossos filmes, séries ou sobre os produtos da loja. O que você procura hoje?'
        }
      ]
    };
  },

  // Os 'methods' são as funções que executam ações na página
  methods: {
    // Função disparada ao clicar nos botões de sugestão rápida
    sendQuickMessage(text) {
      this.userInput = text;
      this.sendMessage();
    },

    // Função principal para enviar a mensagem do usuário
    sendMessage() {
      const cleanText = this.userInput.trim();
      if (!cleanText) return; // Não envia se estiver vazio

      // 1. Adiciona a mensagem do usuário na tela
      this.messages.push({
        sender: 'user',
        text: cleanText
      });

      // Limpa o campo de texto e rola o chat para baixo
      this.userInput = '';
      this.scrollToBottom();

      // 2. Simula o tempo de resposta da Voly
      this.isTyping = true;
      setTimeout(() => {
        const reply = this.generateVolyReply(cleanText);
        this.isTyping = false;
        
        this.messages.push({
          sender: 'voly',
          text: reply
        });
        
        this.scrollToBottom();
      }, 900); // 900 milissegundos de atraso para parecer natural
    },

    // Lógica simples de respostas baseadas em palavras-chave da CineShop
    generateVolyReply(question) {
      const q = question.toLowerCase();

      if (q.includes('streaming') || q.includes('filme') || q.includes('série') || q.includes('assistir')) {
        return 'No catálogo de Streaming da CineShop você assiste em 4K sem anúncios! Basta acessar a aba "Assistir" no menu principal.';
      } 
      else if (q.includes('produto') || q.includes('pedido') || q.includes('rastrear') || q.includes('entrega')) {
        return 'Nossa loja entrega para todo o Brasil! Para rastrear um produto, vá em "Meus Pedidos" no seu perfil e clique no código de rastreio.';
      } 
      else if (q.includes('plano') || q.includes('preço') || q.includes('assinar') || q.includes('valor')) {
        return 'Temos o Plano Básico (só Streaming) e o Plano CineClub, que dá acesso ao catálogo completo + frete grátis em produtos da loja!';
      } 
      else {
        return 'Boa pergunta! Ainda estou aprendendo sobre tudo na CineShop, mas você pode me perguntar sobre Streaming, Produtos, Rastreio ou Planos.';
      }
    },

    // Mantém a barra de rolagem do chat sempre na última mensagem
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  }
}).mount('#app'); // Conecta o Vue à div id="app" do HTML
</script>