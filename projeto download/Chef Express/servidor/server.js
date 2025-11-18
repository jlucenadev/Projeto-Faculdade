import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

// 🟢 CONEXÃO MYSQL
const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// 🔹 FUNÇÃO PARA LIMPAR CPF
function limparCPF(cpf) {
  return cpf.replace(/\D/g, "");
}

// 🟢 CADASTRO
app.post("/register", async (req, res) => {
  let { nome, email, senha, cpf, endereco1, endereco2 } = req.body;

  if (!nome || !email || !senha || !cpf || !endereco1) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  cpf = limparCPF(cpf);

  if (cpf.length !== 11) {
    return res.status(400).json({ error: "CPF inválido" });
  }

  const hash = await bcrypt.hash(senha, 10);

  try {
    await db.query(
      `INSERT INTO usuarios (nome, email, senha_hash, cpf, endereco1, endereco2)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, email, hash, cpf, endereco1, endereco2 ?? null]
    );

    res.json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Email ou CPF já cadastrados" });
  }
});

// 🟢 LOGIN
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);

  if (!rows.length) return res.status(401).json({ error: "Usuário não encontrado" });

  const user = rows[0];

  const ok = await bcrypt.compare(senha, user.senha_hash);
  if (!ok) return res.status(401).json({ error: "Senha incorreta" });

  const token = jwt.sign(
    { id: user.id, nome: user.nome, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  res.json({
    message: "Login realizado!",
    token,
    usuario: {
      id: user.id,
      nome: user.nome,
      email: user.email
    }
  });
});

// 🟢 ROTA TESTE (VER SE LOGIN FUNCIONA)
app.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "Token ausente" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ autenticado: true, usuario: decoded });
  } catch {
    res.status(401).json({ autenticado: false });
  }
});

app.listen(3000, () =>
  console.log("🔥 Servidor rodando em http://localhost:3000")
);
