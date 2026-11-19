// Endereço da API: em desenvolvimento usa localhost; na hospedagem, defina VITE_API_URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Função única para falar com o backend (envia o cookie de sessão)
export async function api(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}/api${caminho}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    method: opcoes.method || 'GET',
    body: opcoes.body ? JSON.stringify(opcoes.body) : undefined
  })

  const dados = await resposta.json().catch(() => ({}))

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro na requisição.')
  }

  return dados
}