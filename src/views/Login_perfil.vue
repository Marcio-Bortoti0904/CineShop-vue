<template>
  <div 
    v-if="modalTipo === 'login'" 
    class="login-conteudo"
  >

    <h1>LOGIN</h1>

    <div class="f">
      <label>
        <h3>NOME</h3>
      </label>
      <input
        v-model="loginDados.nome"
        placeholder="Seu nome"
      >
    </div>

    <div class="f">
      <label>
        <h3>E-MAIL</h3>
      </label>
      <input
        v-model="loginDados.email"
        type="email"
        placeholder="voce@email.com"
      >
    </div>

    <div class="f">
      <label>
        <h3>SENHA</h3>
      </label>
      <input
        v-model="loginDados.senha"
        type="password"
        placeholder="••••••"
      >
    </div>

    <div class="f">
      <label>VOCÊ QUER SER:</label>

      <div class="opt">
        <button
          class="btn"
          :class="{ sel: loginDados.role === 'user' }"
          @click="loginDados.role = 'user'"
        >
          <h1>USUÁRIO</h1>
        </button>

        <button
          class="btn"
          :class="{ sel: loginDados.role === 'seller' }"
          @click="loginDados.role = 'seller'"
        >
          <h1>VENDEDOR</h1>
        </button>
      </div>
    </div>

    <button class="btn entrar" @click="$emit('entrar')">
      ENTRAR
    </button>

  </div>
</template>

<script setup>
defineProps({
  modalTipo: {
    type: String,
    required: true
  },

  loginDados: {
    type: Object,
    required: true
  }
})

defineEmits(['entrar'])
</script>

<style scoped>
.login-conteudo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: white;
  font-family: 'MinhaFonte', sans-serif;
}

.login-conteudo h1,
.login-conteudo h3,
.login-conteudo label,
.login-conteudo button,
.login-conteudo input {
  font-family: 'MinhaFonte', sans-serif;
}

.f {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.f label {
  font-size: 10px;
}

.f input {
  background: #262626;
  color: white;
  border: 3px solid #444;
  padding: 10px;
  font-size: 16px;
}

.btn {
  background:white;
  color: black;
  border: 3px solid black;
  padding: 10px;
  cursor: pointer;
  font-family: 'MinhaFonte', sans-serif;
  font-size: 10px;
}

.opt {
  display: flex;
  gap: 10px;
}

.opt .btn {
  flex: 1;
}

.opt .sel {
  background: blue;
}

.entrar {
  margin-top: 10px;
}
</style>