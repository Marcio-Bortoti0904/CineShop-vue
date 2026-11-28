<template>
  <main>
    <div class="perfil-page">
    <!-- Cabeçalho da plataforma -->
    <header class="navbar">
      <img
      id="logo"
      src="/imagem/pixil-frame-0 (1).png"
      alt="Logo CineShop"
      >
      <div class="status-badge">CONTA ATIVA</div>
    </header>

    <!-- Contêiner principal do perfil -->
    <body class="container">
      <section class="profile-card">

        <!-- Foto de perfil -->
        <div class="avatar-section">

          <div class="avatar-frame">
            <img :src="usuario.avatar" alt="Foto de Perfil">
          </div>

          <!-- Input oculto para selecionar uma imagem do dispositivo -->
          <input
            ref="avatarInput"
            type="file"
            accept="image/*"
            hidden
            @change="carregarFoto"
          >

          <button
            class="pixel-btn btn-secondary"
            @click="abrirModalAvatar"
          >
            Trocar Foto de Perfil
          </button>

        </div>

        <!-- Informações do usuário -->
        <div class="info-section">

          <div class="info-group">
            <label>NOME DE USUÁRIO</label>

            <div class="username-row">
              <h1>{{ usuario.nome }}</h1>

              <button
                class="pixel-btn btn-small"
                title="Alterar nome"
                @click="abrirModalNome"
              >
                Editar Nome
              </button>
            </div>
          </div>

          <div class="info-group">
            <label>E-MAIL CADASTRADO</label>

            <p class="email-text">
              {{ usuario.email }}
            </p>
          </div>

        </div>

        <!-- Divisor visual -->
        <div class="pixel-divider"></div>

        <!-- Botões de controle da conta -->
        <div class="actions-section">

          <button
            class="pixel-btn btn-primary"
            @click="abrirModalContas"
          >
            Trocar de Conta
          </button>

          <button
            class="pixel-btn btn-danger"
            @click="abrirModalLogout"
          >
            Sair da Conta
          </button>

        </div>

      </section>
    </body>

    <!-- Modal reutilizável para as ações do perfil -->
    <div
      v-if="modalAberto"
      class="modal-overlay"
      @click.self="fecharModal"
    >

      <div class="modal-box">

        <h2>{{ modalTitulo }}</h2>

        <!-- Conteúdo dinâmico do modal -->
        <div>

          <!-- Modal para escolher um avatar -->
          <div v-if="modalTipo === 'avatar'">

            <p class="modal-description">
              Selecione um avatar do CineShop:
            </p>

            <div class="avatar-grid">

              <button
                v-for="(avatar, index) in avatares"
                :key="index"
                class="preset-avatar-btn"
                @click="selecionarAvatar(avatar)"
              >
                <img
                  :src="avatar"
                  :alt="'Avatar padrão ' + (index + 1)"
                >
              </button>

            </div>

            <div class="upload-divider">OU</div>

            <button
              class="pixel-btn btn-primary btn-full"
              @click="avatarInput.click()"
            >
              Enviar Foto do Dispositivo
            </button>

          </div>

          <!-- Modal para alterar o nome -->
          <div v-else-if="modalTipo === 'nome'">

            <input
              v-model="novoNome"
              type="text"
              maxlength="24"
              class="modal-input"
              placeholder="Digite o novo nome"
            >

          </div>

          <!-- Modal para trocar de conta -->
          <div v-else-if="modalTipo === 'contas'">

            <div
              v-for="(conta, index) in contasSalvas"
              :key="index"
              class="account-option"
              @click="selecionarConta(conta)"
            >

              <div>
                <strong>{{ conta.nome }}</strong>

                <small>{{ conta.email }}</small>
              </div>

              <span>Selecionar</span>

            </div>

          </div>

          <!-- Modal de confirmação de saída -->
          <div v-else-if="modalTipo === 'logout'">

            <p class="modal-description">
              Tem certeza que deseja encerrar sua sessão na CineShop?
            </p>

          </div>

        </div>

        <!-- Botões do modal -->
        <div class="modal-actions">

          <button
            class="pixel-btn btn-secondary"
            @click="fecharModal"
          >
            Cancelar
          </button>

          <!-- O botão confirmar aparece somente quando necessário -->
          <button
            v-if="modalTipo === 'nome' || modalTipo === 'logout'"
            class="pixel-btn btn-primary"
            @click="confirmarAcao"
          >
            Confirmar
          </button>

        </div>

      </div>
    </div>

    <!-- Notificação de feedback -->
    <div v-if="toastVisivel" class="toast">
      {{ mensagemToast }}
    </div>

  </div>
</main>
</template>

<script setup>

// Importa o recurso ref do Vue.
// Ele permite criar variáveis reativas que atualizam a tela.
import { ref } from 'vue';

import { useRouter } from 'vue-router';

// Permite navegar entre as páginas do CineShop.
const router = useRouter();


// ======================================================
// 1. DADOS DO USUÁRIO
// ======================================================

// Dados de exemplo.
// Posteriormente, esses valores deverão vir do usuário
// autenticado no banco de dados.
const usuario = ref({
  nome: 'CineFan_99',
  email: 'cinefan99@cineshop.com',
  avatar: '/rostos/rosto1.png'
});

// ======================================================
// 2. CONTROLE DOS AVATARES
// ======================================================

// Lista de imagens disponíveis para o usuário.
const avatares = ref([
  '/rostos/rosto1.png',
  '/rostos/rosto2.png',
  '/rostos/rosto3.png',
  '/rostos/rosto4.png',
  '/rostos/rosto5.png',
  '/rostos/rosto6.png'
]);

// Referência ao input de arquivos do template.
const avatarInput = ref(null);


// ======================================================
// 3. CONTAS SALVAS
// ======================================================

// Contas fictícias para testar a troca de usuário.
// Em uma aplicação real, a autenticação deverá ser
// realizada pelo backend.
const contasSalvas = ref([
  {
    nome: 'CineFan_99',
    email: 'cinefan99@cineshop.com',
    avatar: '/rostos/rosto1.png'
  },
  {
    nome: 'PixelDirector',
    email: 'diretor@cineshop.com',
    avatar: '/rostos/rosto2.png'
  },
  {
    nome: 'PipocaGamer',
    email: 'pipoca@cineshop.com',
    avatar: '/rostos/rosto3.png'
  }
]);


// ======================================================
// 4. CONTROLE DO MODAL
// ======================================================

// Define se a janela está aberta.
const modalAberto = ref(false);

// Guarda o título apresentado no modal.
const modalTitulo = ref('');

// Identifica qual conteúdo deverá aparecer.
const modalTipo = ref('');

// Armazena temporariamente o novo nome.
const novoNome = ref('');


// Abre o modal e define seu conteúdo.
function abrirModal(titulo, tipo) {

  modalTitulo.value = titulo;
  modalTipo.value = tipo;

  modalAberto.value = true;

}


// Fecha o modal.
function fecharModal() {

  modalAberto.value = false;

}


// ======================================================
// 5. NOTIFICAÇÕES (TOAST)
// ======================================================

const toastVisivel = ref(false);
const mensagemToast = ref('');

let temporizadorToast = null;


// Exibe uma mensagem temporária na tela.
function mostrarToast(mensagem) {

  mensagemToast.value = mensagem;
  toastVisivel.value = true;

  // Evita manter temporizadores anteriores ativos.
  clearTimeout(temporizadorToast);

  temporizadorToast = setTimeout(() => {

    toastVisivel.value = false;

  }, 3000);

}


// ======================================================
// 6. ALTERAÇÃO DA FOTO DE PERFIL
// ======================================================

// Abre o modal de escolha de avatar.
function abrirModalAvatar() {

  abrirModal('ESCOLHER AVATAR', 'avatar');

}


// Aplica um avatar escolhido na galeria.
function selecionarAvatar(imagem) {

  usuario.value.avatar = imagem;

  fecharModal();

  mostrarToast('Avatar padrão aplicado!');

}


// Abre o seletor de arquivos do dispositivo.
function abrirSeletorArquivo() {

  avatarInput.value.click();

}


// Lê a imagem selecionada e apresenta uma prévia.
function carregarFoto(evento) {

  const arquivo = evento.target.files[0];

  // Verifica se o usuário realmente selecionou um arquivo.
  if (!arquivo) {
    return;
  }

  // Verifica se o arquivo é uma imagem.
  if (!arquivo.type.startsWith('image/')) {

    mostrarToast('Selecione um arquivo de imagem.');

    return;

  }

  // Cria um endereço temporário para visualizar a imagem.
  const leitor = new FileReader();

  leitor.onload = () => {

    usuario.value.avatar = leitor.result;

    fecharModal();

    mostrarToast('Foto personalizada carregada!');

  };

  leitor.readAsDataURL(arquivo);

  // Limpa o campo para permitir selecionar a mesma imagem novamente.
  evento.target.value = '';

}


// ======================================================
// 7. ALTERAÇÃO DO NOME DE USUÁRIO
// ======================================================

function abrirModalNome() {

  // Preenche o campo com o nome atual.
  novoNome.value = usuario.value.nome;

  abrirModal('NOVO NOME DE USUÁRIO', 'nome');

}


// ======================================================
// 8. TROCA DE CONTA
// ======================================================

function abrirModalContas() {

  abrirModal('ESCOLHER CONTA', 'contas');

}


// Aplica os dados da conta selecionada.
function selecionarConta(conta) {

  usuario.value.nome = conta.nome;
  usuario.value.email = conta.email;
  usuario.value.avatar = conta.avatar;

  fecharModal();

  mostrarToast('Conta alterada para ' + conta.nome);

}


// ======================================================
// 9. ENCERRAMENTO DA SESSÃO
// ======================================================

function abrirModalLogout() {

  abrirModal('SAIR DA CONTA?', 'logout');

}


// Executa a ação correspondente ao modal.
function confirmarAcao() {

  // Confirma a alteração do nome.
  if (modalTipo.value === 'nome') {

    const nome = novoNome.value.trim();

    // Impede nomes com menos de três caracteres.
    if (nome.length < 3) {

      mostrarToast('O nome precisa ter pelo menos 3 letras.');

      return;

    }

    usuario.value.nome = nome;

    fecharModal();

    mostrarToast('Nome de usuário alterado!');

  }

  // Confirma a saída da conta.
  else if (modalTipo.value === 'logout') {

    fecharModal();

    mostrarToast('Você saiu da conta.');

    // Direciona o usuário para a página inicial.
    // Ajuste a rota conforme a configuração do seu projeto.
    router.push('/');

  }

}

</script>

<style scoped>
@import url('../css/base.css');
/* ======================================================
   1. VARIÁVEIS E CONFIGURAÇÕES GERAIS
====================================================== */

.perfil-page {
  --bg-dark: #0d0f14;
  --surface-bg: #1f2430;
  --border-color: #323949;
  --accent-primary: #7c3aed;
  --accent-hover: #6d28d9;
  --accent-cyan: #06b6d4;
  --danger-color: #e11d48;
  --danger-hover: #be123c;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;

  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background-color: var(--bg-dark);
  color: var(--text-main);

  background-image: radial-gradient(
    var(--border-color) 1px,
    transparent 1px
  );

  background-size: 24px 24px;

}

/* Configurações gerais dos elementos */
.perfil-page * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


/* ======================================================
   2. CABEÇALHO
====================================================== */

.navbar {
  background-color: #161922;
  border-bottom: 4px solid var(--border-color);

  padding: 1.2rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

}

.status-badge {
  font-size: 0.65rem;

  background-color: rgba(6, 182, 212, 0.15);
  color: var(--accent-cyan);

  border: 2px solid var(--accent-cyan);
  padding: 6px 10px;

}

#logo {
  width: 140px;
  height: 120px;
  object-fit: contain;
  padding: 2px;
}

/* ======================================================
   3. CARTÃO DE PERFIL
====================================================== */

.container {
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem 1rem;
}

.profile-card {
  background-color: #161922;

  border: 4px solid var(--border-color);
  box-shadow: 8px 8px 0px #060709;

  width: 100%;
  max-width: 520px;

  padding: 2.5rem;
}

/* ======================================================
   4. FOTO DE PERFIL
====================================================== */

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
  margin-bottom: 2rem;
}

.avatar-frame {
  width: 130px;
  height: 130px;

  border: 4px solid var(--accent-primary);
  box-shadow: 4px 4px 0px #060709;

  background-color: var(--surface-bg);

  overflow: hidden;

}

.avatar-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
}

/* ======================================================
   5. INFORMAÇÕES DO USUÁRIO
====================================================== */

.info-section {
  display: flex;
  flex-direction: column;

  gap: 1.5rem;
}

.info-group label {
  display: block;

  font-size: 0.65rem;

  color: var(--text-muted);

  margin-bottom: 0.6rem;
}

.username-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 1rem;

  background-color: var(--surface-bg);

  border: 3px solid var(--border-color);

  padding: 0.8rem 1rem;
}

.username-row h1 {

  font-size: 1.25rem;
  font-weight: 700;

  word-break: break-word;

}

.email-text {

  background-color: var(--surface-bg);

  border: 3px solid var(--border-color);

  padding: 0.8rem 1rem;

  color: var(--text-muted);
  font-size: 1rem;

}

.pixel-divider {

  height: 4px;

  background-color: var(--border-color);

  margin: 2rem 0;

}


/* ======================================================
   6. BOTÕES
====================================================== */

.actions-section {

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 1rem;

}

.pixel-btn {
  font-weight: 700;

  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  padding: 0.85rem 1.2rem;

  border: 3px solid #000;

  color: var(--text-main);

  cursor: pointer;

  box-shadow: 4px 4px 0px #000;

  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease,
    background-color 0.2s;

}

.pixel-btn:active {

  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0px #000;

}

.btn-primary {
  background-color: var(--accent-primary);
}

.btn-primary:hover {
  background-color: var(--accent-hover);
}

.btn-secondary {

  background-color: var(--surface-bg);
  border-color: var(--border-color);

}

.btn-secondary:hover {
  background-color: #2a3040;
}

.btn-danger {
  background-color: var(--danger-color);
}

.btn-danger:hover {
  background-color: var(--danger-hover);
}

.btn-small {

  padding: 0.45rem 0.8rem;
  font-size: 0.8rem;

  background-color: var(--accent-cyan);
  color: #090d16;

  white-space: nowrap;

}


/* ======================================================
   7. MODAL
====================================================== */

.modal-overlay {

  position: fixed;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;

  z-index: 100;

}

.modal-box {

  background-color: #161922;

  border: 4px solid var(--accent-primary);
  box-shadow: 8px 8px 0px #000;

  padding: 2rem;

  width: 100%;
  max-width: 440px;

}

.modal-box h2 {
  font-size: 0.9rem;

  margin-bottom: 1.2rem;
  line-height: 1.5;

}

.modal-description {

  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.5;

}

.modal-input {

  width: 100%;

  padding: 0.8rem;

  background-color: var(--surface-bg);

  border: 3px solid var(--border-color);

  color: var(--text-main);

  font-size: 1rem;

  margin-bottom: 1rem;

  outline: none;

}

.modal-input:focus {
  border-color: var(--accent-cyan);
}


/* ======================================================
   8. LISTA DE CONTAS
====================================================== */

.account-option {

  padding: 0.8rem;

  background-color: var(--surface-bg);

  border: 3px solid var(--border-color);

  margin-bottom: 0.6rem;

  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 0.5rem;

}

.account-option:hover {
  border-color: var(--accent-primary);
}

.account-option small {

  display: block;
  color: var(--text-muted);

  margin-top: 4px;

}

.account-option span {
  color: var(--accent-cyan);
}


/* ======================================================
   9. BOTÕES DO MODAL
====================================================== */

.modal-actions {

  display: flex;
  justify-content: flex-end;

  gap: 0.8rem;

  margin-top: 1.5rem;

}


/* ======================================================
   10. NOTIFICAÇÃO
====================================================== */

.toast {

  position: fixed;

  bottom: 24px;
  right: 24px;

  background-color: #161922;

  border: 3px solid var(--accent-cyan);

  box-shadow: 4px 4px 0px #000;

  padding: 1rem 1.5rem;

  font-weight: 600;

  z-index: 200;

}


/* ======================================================
   11. GALERIA DE AVATARES
====================================================== */

.avatar-grid {

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 0.8rem;

  margin-bottom: 1.2rem;

}

.preset-avatar-btn {

  background-color: var(--surface-bg);

  border: 3px solid var(--border-color);

  padding: 4px;

  cursor: pointer;

  transition:
    transform 0.1s ease,
    border-color 0.2s;

}

.preset-avatar-btn:hover {

  border-color: var(--accent-cyan);
  transform: translateY(-2px);

}

.preset-avatar-btn img {

  width: 100%;
  aspect-ratio: 1 / 1;

  display: block;

  image-rendering: pixelated;

}

.upload-divider {

  text-align: center;

  font-size: 0.8rem;
  color: var(--text-muted);

  margin: 1rem 0;

  text-transform: uppercase;
  letter-spacing: 1px;

}

.btn-full {
  width: 100%;
}


/* ======================================================
   12. RESPONSIVIDADE
====================================================== */

@media (max-width: 480px) {

  .actions-section {
    grid-template-columns: 1fr;
  }

  .username-row {

    flex-direction: column;
    align-items: flex-start;

  }

  .profile-card {
    padding: 1.5rem;
  }

  .navbar {
    padding: 1rem;
  }

}
</style>