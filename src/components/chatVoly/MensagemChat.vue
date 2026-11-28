
<template>
  <div :class="['message-bubble', mensagem.sender]">

    <!-- Identifica quem enviou -->
    <span class="sender-name">

      {{ mensagem.sender === 'voly' ? 'VOLY' : 'VOCÊ' }}

    </span>

    <!-- Conteúdo da mensagem -->
    <p>
      {{ mensagem.text }}
    </p>

  </div>
</template>

<script setup>

// Recebe a mensagem enviada pelo componente pai
defineProps({

  mensagem: {
    type: Object,
    required: true
  }

})
</script>

<style scoped>
.message-bubble {
  max-width: 80%;
  padding: 14px 18px;
  line-height: 1.5;
  font-size: 0.95rem;
  position: relative;
}

.sender-name {
  display: block;
  font-family: 'MinhaFonte', cursive;
  font-size: 1rem;
  margin-bottom: 8px;
}

/* Mensagem da Voly */
.message-bubble.voly {
  align-self: flex-start;
  background-color: #1b1a22;
  border-left: 4px solid var(--voly-secondary);
  border-bottom: 4px solid #120f1f;
}

.message-bubble.voly .sender-name {
  color: var(--voly-secondary);
}

/* Mensagem do usuário */
.message-bubble.user {
  align-self: flex-end;
  background-color: #1b1624;
  border-right: 4px solid var(--voly-primary);
  border-bottom: 4px solid #181026;
}

.message-bubble.user .sender-name {
  color: var(--voly-primary);
  text-align: right;
}
</style>
