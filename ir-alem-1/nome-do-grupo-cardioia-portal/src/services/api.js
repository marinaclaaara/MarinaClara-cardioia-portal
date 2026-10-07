// Camada de serviços: tudo que "fala" com dados externos fica aqui,
// assim os componentes não sabem de onde os dados vêm.

// API fake pública (JSONPlaceholder): usamos /users como "pacientes".
const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getPatients() {
  const resposta = await fetch(`${BASE_URL}/users`);
  if (!resposta.ok) throw new Error("Falha ao carregar pacientes");
  const usuarios = await resposta.json();
  // Adaptamos o formato para o domínio do app (id, nome, email, cidade).
  return usuarios.map((u) => ({ id: u.id, nome: u.name, email: u.email, cidade: u.address.city }));
}

// Login SIMULADO: não existe servidor. Aceita qualquer e-mail com senha "123456"
// e devolve um "JWT fake" (3 partes em base64 separadas por ponto, só para parecer um JWT).
export async function fakeLogin(email, senha) {
  await new Promise((r) => setTimeout(r, 400)); // simula latência de rede
  if (!email || senha !== "123456") throw new Error("Credenciais inválidas (use a senha 123456)");
  const base64 = (obj) => btoa(JSON.stringify(obj));
  const token = [base64({ alg: "none" }), base64({ sub: email, iat: Date.now() }), "assinatura-fake"].join(".");
  return { token, user: { email } };
}
