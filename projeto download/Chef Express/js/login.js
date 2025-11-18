let modo = "login"; // muda entre login e cadastro

const form = document.getElementById("loginForm");
const toggle = document.getElementById("toggleMode");
const titulo = document.getElementById("loginTitulo");
const senha = document.getElementById("senha");

// 🔄 Alternar entre LOGIN e CADASTRO
toggle.addEventListener("click", e => {
  e.preventDefault();

  if (modo === "login") {
    modo = "cadastro";
    titulo.textContent = "Criar Conta";
    senha.style.display = "block";
    toggle.textContent = "Já tem conta? Entrar";
    form.querySelector("button").textContent = "Cadastrar";
  } else {
    modo = "login";
    titulo.textContent = "Login do Cliente";
    senha.style.display = "none";
    toggle.textContent = "Ainda não tem conta? Criar";
    form.querySelector("button").textContent = "Entrar";
  }
});

// 📌 SUBMETER FORMULÁRIO
form.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senhaVal = document.getElementById("senha").value.trim();

  if (!email.includes("@")) return showToast("Digite um e-mail válido");

  // carregar usuários salvos
  let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  // ➕ CADASTRO
  if (modo === "cadastro") {
    if (!nome) return showToast("Informe seu nome");
    if (!senhaVal) return showToast("Crie uma senha");

    if (usuarios.find(u => u.email === email))
      return showToast("E-mail já cadastrado!");

    usuarios.push({ nome, email, senha: senhaVal });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    showToast("Conta criada! Faça login.");

    // volta automaticamente para login
    modo = "login";
    titulo.textContent = "Login do Cliente";
    senha.style.display = "none";
    toggle.textContent = "Ainda não tem conta? Criar";
    form.querySelector("button").textContent = "Entrar";
    form.reset();
    return;
  }

  // 🔐 LOGIN
  const user = usuarios.find(u => u.email === email && u.senha === senhaVal);

  if (!user) return showToast("Credenciais incorretas");

  localStorage.setItem("usuario", JSON.stringify({ nome: user.nome, email }));

  showToast("Login realizado!");

  setTimeout(() => {
    location.href = "cliente.html";
  }, 800);
});
