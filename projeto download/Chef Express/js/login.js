const form = document.getElementById("loginForm");
const toggle = document.getElementById("toggleMode");
const titulo = document.getElementById("loginTitulo");

let modo = "login"; // "login" ou "cadastro"
const camposCadastro = ["nome", "cpf", "endereco1", "endereco2"];
const senha = document.getElementById("senha");
const botao = form.querySelector("button");

// ================================
// 🔁 Mostrar / ocultar campos
// ================================
function atualizarCampos() {
  camposCadastro.forEach(id => {
    document.getElementById(id).style.display = modo === "cadastro" ? "block" : "none";
  });
  senha.style.display = "block";
}

// Alternar entre login e cadastro
toggle.addEventListener("click", e => {
  e.preventDefault();
  modo = modo === "login" ? "cadastro" : "login";

  titulo.textContent = modo === "login" ? "Login do Cliente" : "Criar Conta";
  botao.textContent = modo === "login" ? "Entrar" : "Cadastrar";
  toggle.textContent = modo === "login"
    ? "Ainda não tem conta? Criar"
    : "Já tem conta? Entrar";

  atualizarCampos();
  form.reset();
});

// ================================
// 🧾 Máscara automática CPF
// ================================
const cpfInput = document.getElementById("cpf");
cpfInput.addEventListener("input", () => {
  let v = cpfInput.value.replace(/\D/g, ""); // remove tudo que não é número
  if (v.length > 11) v = v.slice(0, 11);

  // Formata para xxx.xxx.xxx-xx
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  cpfInput.value = v;
});

// ================================
// 🚀 Formulário de login/cadastro
// ================================
form.addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senhaVal = senha.value.trim();

  if (!email.includes("@")) return alert("Email inválido");
  if (!senhaVal) return alert("Digite a senha");

  botao.disabled = true;

  try {
    if (modo === "cadastro") {
      const nome = document.getElementById("nome").value.trim();
      const cpfVal = cpfInput.value.trim();
      const endereco1 = document.getElementById("endereco1").value.trim();
      const endereco2 = document.getElementById("endereco2").value.trim();

      if (!nome || !cpfVal || !endereco1) {
        botao.disabled = false;
        return alert("Preencha todos os campos obrigatórios");
      }

      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha: senhaVal, cpf: cpfVal, endereco1, endereco2 })
      });

      const data = await res.json();
      alert(data.message || data.error);

      if (res.ok) {
        modo = "login";
        atualizarCampos();
        form.reset();
      }

    } else {
      // Login
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: senhaVal })
      });

      const usuario = await res.json();
      if (!res.ok) {
        botao.disabled = false;
        return alert(usuario.error);
      }

      // Salvar usuário no localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));

      alert("Login realizado!");
      setTimeout(() => location.href = "index.html", 700);
    }

  } catch (err) {
    console.error(err);
    alert("Erro ao conectar com servidor");
  } finally {
    botao.disabled = false;
  }
});
