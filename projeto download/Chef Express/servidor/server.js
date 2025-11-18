import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

// Conexão MySQL
const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// ROTAS
app.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);

  try {
    await db.query(
      "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)",
      [nome, email, hash]
    );
    res.json({ message: "Usuário cadastrado!" });
  } catch {
    res.status(400).json({ error: "Email já cadastrado" });
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  if (!rows.length) return res.status(401).json({ error: "Usuário não encontrado" });

  const ok = await bcrypt.compare(senha, rows[0].senha_hash);
  if (!ok) return res.status(401).json({ error: "Senha incorreta" });

  const token = jwt.sign({ id: rows[0].id, nome: rows[0].nome }, process.env.JWT_SECRET);

  res.json({ message: "Login OK", token });
});

app.listen(3000, () => console.log("🔥 Servidor rodando em http://localhost:3000"));
