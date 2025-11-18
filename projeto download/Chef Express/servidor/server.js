import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "..")));

// ================================
// 🔌 Conexão MySQL
// ================================
const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// ================================
// 🟢 Cadastro
// ================================
aapp.post("/register", async (req, res) => {
  const { nome, email, senha, cpf, endereco1, endereco2 } = req.body;

  console.log("Cadastro recebido:", { nome, email, senha, cpf, endereco1, endereco2 });

  if (!nome || !email || !senha || !cpf || !endereco1) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
  }

  try {
    const hash = await bcrypt.hash(senha, 10);

    const query = `
      INSERT INTO usuarios 
      (nome, email, senha_hash, cpf, endereco1, endereco2) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [nome, email, hash, cpf, endereco1, endereco2 || ""]);

    res.json({ message: "Usuário cadastrado!" });

  } catch (err) {
    console.error("❌ ERRO REGISTRO:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================================
// 🔵 Login
// ================================
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);

    if (!rows.length) return res.status(401).json({ error: "Usuário não encontrado" });

    const user = rows[0];
    const senhaOK = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaOK) return res.status(401).json({ error: "Senha incorreta" });

    // Retorna dados do usuário
    res.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      cpf: user.cpf,
      endereco1: user.endereco1,
      endereco2: user.endereco2
    });

  } catch (err) {
    console.error("❌ ERRO LOGIN:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================================
// 🟣 Rota de pedidos (simulação local)
// ================================
app.get("/pedidos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pedidos");
    res.json(rows);
  } catch (err) {
    console.error("❌ ERRO PEDIDOS:", err);
    res.status(500).json([]);
  }
});

// ================================
// 🚀 Iniciar servidor
// ================================
app.listen(3000, () => {
  console.log("🔥 Servidor rodando em http://localhost:3000");
});
