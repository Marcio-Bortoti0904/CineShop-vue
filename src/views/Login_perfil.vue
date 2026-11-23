<template>
  <!-- LOGIN / CADASTRO -->
  <div
    v-if="modalTipo === 'login'"
    class="login-conteudo"
  >
    <h1>{{ loginDados.modo === 'cadastro' ? 'CADASTRO' : 'LOGIN' }}</h1>

    <div v-if="loginDados.modo === 'cadastro'" class="f">
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

    <div v-if="loginDados.modo === 'cadastro'" class="f">
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

    <label v-else class="lembrar">
      <input type="checkbox" v-model="loginDados.lembrar">
      Manter conectado
    </label>

    <button class="btn entrar" @click="$emit('entrar')">
      {{ loginDados.modo === 'cadastro' ? 'CRIAR CONTA' : 'ENTRAR' }}
    </button>

    <button
      class="btn"
      @click="loginDados.modo = loginDados.modo === 'cadastro' ? 'entrar' : 'cadastro'"
    >
      {{ loginDados.modo === 'cadastro' ? 'JÁ TENHO CONTA' : 'CRIAR UMA CONTA' }}
    </button>
  </div>

  <!-- PERFIL -->
  <div
    v-else-if="modalTipo === 'perfil' && usuario"
    class="login-conteudo"
  >
    <h1>PERFIL</h1>
    <h3>{{ usuario.nome }}</h3>
    <p>{{ usuario.email }}</p>
    <p>{{ usuario.role === 'seller' ? 'Vendedor' : 'Usuário' }}</p>

    <button class="btn entrar" @click="$emit('sair')">
      SAIR DA CONTA
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
  },

  usuario: {
    type: Object,
    default: null
  }
})

defineEmits(['entrar', 'sair'])
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

.lembrar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.entrar {
  margin-top: 10px;
}
</style>