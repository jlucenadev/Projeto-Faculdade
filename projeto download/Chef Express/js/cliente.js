// Verificar login
const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
  alert("Você precisa fazer login primeiro");
  location.href = "login.html";
}

// Preencher dados na tela
document.getElementById("userNome").textContent = usuario.nome;
document.getElementById("userEmail").textContent = usuario.email;

// Buscar pedidos
let pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");

// Filtrar só os pedidos desse usuário
pedidos = pedidos.filter(p => p.email === usuario.email);

const lista = document.getElementById("listaPedidos");

if (pedidos.length === 0) {
  lista.innerHTML = "<li>Nenhum pedido ainda.</li>";
} else {
  pedidos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `Pedido #${p.id} • Total: R$ ${p.total} • ${p.data}`;
    lista.appendChild(li);
  });
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("usuario");
  location.href = "login.html";
});
