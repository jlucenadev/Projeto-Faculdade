// Verificar usuário logado
const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
  alert("Você precisa fazer login primeiro");
  location.href = "login.html";
}

// Mostrar dados do usuário
document.getElementById("userNome").textContent = usuario.nome;
document.getElementById("userEmail").textContent = usuario.email;
document.getElementById("userEndereco").textContent = usuario.endereco1;

// Trocar endereço
document.getElementById("trocarEnderecoBtn").addEventListener("click", () => {
  const novoEndereco = prompt("Digite seu novo endereço:");
  if (novoEndereco) {
    usuario.endereco1 = novoEndereco;
    document.getElementById("userEndereco").textContent = novoEndereco;
    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Endereço atualizado!");
  }
});

// Carregar pedidos
async function carregarPedidos() {
  let pedidos = [];

  try {
    const res = await fetch("http://localhost:3000/pedidos");
    if (res.ok) pedidos = await res.json();
  } catch {
    console.warn("⚠️ Sem rota de pedidos no servidor, usando localStorage");
  }

  if (!pedidos.length) {
    pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
  }

  pedidos = pedidos.filter(p => p.email === usuario.email);

  const lista = document.getElementById("listaPedidos");

  if (pedidos.length === 0) {
    lista.innerHTML = "<li>Nenhum pedido ainda.</li>";
  } else {
    lista.innerHTML = "";
    pedidos.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `🧾 Pedido #${p.id} • Total: R$ ${p.total} • ${p.data}`;
      lista.appendChild(li);
    });
  }
}

carregarPedidos();

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("usuario");
  location.href = "login.html";
});
