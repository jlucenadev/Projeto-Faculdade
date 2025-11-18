let modo = "login"; // login ou cadastro

const form = document.getElementById("loginForm");
const toggle = document.getElementById("toggleMode");
const titulo = document.getElementById("loginTitulo");
const senha = document.getElementById("senha");

// alternar login/cadastro
toggle.addEventListener("click", e => {
  e.preventDefault();
  if (modo === "login") {
    modo = "cadastro";
    titulo.textContent = "Criar Conta";
    senha.style.display = "block";
    toggle.textContent = "Já tem conta? Entrar";
    form.querySelector("button").textContent = "Cadastrar";
    document.getElementById("nome").style.display = "block";
  } else {
    modo = "login";
    titulo.textContent = "Login do Cliente";
    senha.style.display = "block";
    toggle.textContent = "Ainda não tem conta? Criar";
    form.querySelector("button").textContent = "Entrar";
    document.getElementById("nome").style.display = "none";
  }
});

// função toast
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// enviar formulário
form.addEventListener("submit", async e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senhaVal = document.getElementById("senha").value.trim();
  const cpf = document.getElementById("cpf")?.value.trim();        // se tiver input cpf
  const endereco1 = document.getElementById("endereco1")?.value.trim();
  const endereco2 = document.getElementById("endereco2")?.value.trim();

  if (!email.includes("@") || !senhaVal) return showToast("E-mail ou senha inválidos");

  try {
    if (modo === "cadastro") {
      if (!nome || !cpf || !endereco1) return showToast("Preencha todos os campos");

      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha: senhaVal, cpf, endereco1, endereco2 })
      });

      const data = await res.json();

      if (!res.ok) return showToast(data.error);

      showToast("Conta criada! Faça login.");
      modo = "login";
      titulo.textContent = "Login do Cliente";
      toggle.textContent = "Ainda não tem conta? Criar";
      form.querySelector("button").textContent = "Entrar";
      form.reset();

    } else {
      // LOGIN
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: senhaVal })
      });

      const data = await res.json();

      if (!res.ok) return showToast(data.error);

      // salvar token e info do usuário
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      showToast("Login realizado!");
      setTimeout(() => location.href = "index.html", 900);
    }

  } catch (err) {
    console.log(err);
    showToast("Erro na conexão com o servidor");
  }
});
