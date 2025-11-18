let modo = "login"; // ou "cadastro"

const form = document.getElementById("loginForm");
const toggle = document.getElementById("toggleMode");
const titulo = document.getElementById("loginTitulo");
const campoSenha = document.getElementById("senha");

// Evento para alternar entre Login / Cadastro
toggle.addEventListener("click", e => {
  e.preventDefault();

  modo = modo === "login" ? "cadastro" : "login";

  if (modo === "cadastro") {
    titulo.textContent = "Criar Conta";
    campoSenha.style.display = "block";
    toggle.textContent = "Já tem conta? Entrar";
    form.querySelector("button").textContent = "Cadastrar";
  } else {
    titulo.textContent = "Login do Cliente";
    campoSenha.style.display = "block"; // ← IMPORTANTE: mostrar senha no login também
    toggle.textContent = "Ainda não tem conta? Criar";
    form.querySelector("button").textContent = "Entrar";
  }
});

// Evento de envio do formulário
form.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senhaVal = document.getElementById("senha").value.trim();

  if (!email.includes("@")) return showToast("Email inválido");
  if (!senhaVal) return showToast("Digite uma senha");

  let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  if (modo === "cadastro") {
    if (!nome) return showToast("Informe seu nome");
    if (usuarios.find(u => u.email === email))
      return showToast("E-mail já cadastrado");

    usuarios.push({ nome, email, senha: senhaVal });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    showToast("Conta criada com sucesso!");

    modo = "login";
    titulo.textContent = "Login do Cliente";
    toggle.textContent = "Ainda não tem conta? Criar";
    form.querySelector("button").textContent = "Entrar";
    form.reset();

  } else {
    // LOGIN
    const user = usuarios.find(u => u.email === email && u.senha === senhaVal);
    if (!user) return showToast("Email ou senha incorretos");

    localStorage.setItem("usuarioLogado", JSON.stringify({
      nome: user.nome,
      email: user.email
    }));

    showToast("Login realizado!");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 900);
  }
});
