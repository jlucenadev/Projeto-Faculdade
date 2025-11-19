# 🍕 Chef Express - Sistema de Gerenciamento de Restaurante

![GitHub](https://img.shields.io/github/license/jlucenadev/Projeto-Faculdade)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

## 📖 Sobre o Projeto

O **Chef Express** é um sistema completo de gerenciamento para restaurantes desenvolvido como projeto de faculdade. A aplicação oferece interfaces para clientes, administradores e gestão de pedidos, com uma arquitetura full-stack robusta que inclui front-end responsivo e API RESTful personalizada.

## 🏗️ Arquitetura do Sistema
```text
Projeto-Faculdade/
├── frontend/ # Aplicação cliente (Chef Express)
│ ├── html/ # Páginas da aplicação
│ │ ├── index.html # Página inicial
│ │ ├── login.html # Autenticação
│ │ ├── cliente.html # Área do cliente
│ │ ├── admin.html # Painel administrativo
│ │ ├── carrinho.html # Gestão de carrinho
│ │ ├── checkout.html # Finalização de pedido
│ │ └── pedido.html # Acompanhamento de pedidos
│ ├── css/ # Estilos e design
│ ├── js/ # Lógica do front-end
│ │ ├── login.js # Autenticação
│ │ ├── produtos.js # Catálogo de produtos
│ │ ├── carrinho.js # Gestão do carrinho
│ │ ├── pedido.js # Controle de pedidos
│ │ ├── cliente.js # Perfil do cliente
│ │ ├── checkout.js # Processo de checkout
│ │ └── admin-dashboard.js # Painel admin
│ └── img/ # Assets e imagens
└── servidor/ # API Back-end
├── server.js # Servidor principal Express.js
├── package.json # Dependências e scripts
├── package-lock.json # Lock das dependências
├── .env # Variáveis de ambiente
└── node_modules/ # Dependências instaladas
```

## ⚙️ Tecnologias Utilizadas

### **Front-end**
- **HTML5** - Estrutura semântica das páginas
- **CSS3** - Estilização avançada e design responsivo
- **JavaScript Vanilla** - Interatividade e consumo de API
- **Local Storage** - Persistência de dados no cliente
- **Fetch API** - Comunicação com o back-end

### **Back-end**
- **Node.js** - Runtime environment JavaScript
- **Express.js** - Framework web para construção da API
- **MySQL** - Banco de dados relacional
- **dotenv** - Gerenciamento de variáveis de ambiente
- **CORS** - Middleware para requisições cross-origin
- **Body Parser** - Processamento de dados das requisições

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
- Node.js (versão 14 ou superior)
- MySQL Server (versão 5.7 ou 8.0)
- Navegador web moderno
- Git (para clonar o repositório)

### **1. Clonar o Repositório**
```bash
git clone https://github.com/jlucenadev/Projeto-Faculdade.git
cd Projeto-Faculdade
2. Configurar o Banco de Dados
sql
-- Criar database
CREATE DATABASE chef_express;

-- Executar scripts SQL de criação de tabelas
-- (Os scripts devem estar incluídos no projeto)
3. Configurar o Back-end
bash
# Navegar para a pasta do servidor
cd servidor

# Instalar dependências
npm install

# Configurar variáveis de ambiente (arquivo .env)
cp .env.example .env
# Editar .env com suas configurações:
# DB_HOST=localhost
# DB_USER=seu_usuario
# DB_PASSWORD=sua_senha
# DB_NAME=chef_express
# PORT=3000

# Iniciar o servidor
npm start
# ou para desenvolvimento
npm run dev
4. Executar o Front-end
bash
# Em outro terminal, navegar para a pasta frontend
cd frontend

# Servir os arquivos estáticos
# Pode usar qualquer servidor HTTP, como:
npx http-server -p 8080
# ou
python -m http.server 8000
5. Acessar a Aplicação
Front-end: http://localhost:8080

API Back-end: http://localhost:3000

📡 API Endpoints
Autenticação
POST /api/login - Autenticar usuário

POST /api/logout - Encerrar sessão

POST /api/register - Registrar novo usuário

Produtos
GET /api/produtos - Listar todos os produtos

GET /api/produtos/:id - Obter produto específico

POST /api/produtos - Criar novo produto (admin)

PUT /api/produtos/:id - Atualizar produto (admin)

DELETE /api/produtos/:id - Remover produto (admin)

Pedidos
GET /api/pedidos - Listar pedidos do usuário

POST /api/pedidos - Criar novo pedido

GET /api/pedidos/:id - Detalhes do pedido

PUT /api/pedidos/:id/status - Atualizar status

Clientes
GET /api/clientes/perfil - Perfil do cliente

PUT /api/clientes/perfil - Atualizar perfil

Administração
GET /api/admin/dashboard - Dados do dashboard

GET /api/admin/pedidos - Todos os pedidos (admin)

GET /api/admin/relatorios - Relatórios do sistema

🗄️ Estrutura do Banco de Dados
Tabelas Principais
usuarios - Dados de autenticação e perfil

produtos - Catálogo de produtos do restaurante

categorias - Categorias de produtos

pedidos - Registro de pedidos

itens_pedido - Itens de cada pedido

clientes - Informações dos clientes

Exemplo de Modelo
sql
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    categoria_id INT,
    imagem VARCHAR(500),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
👥 Funcionalidades
Para Clientes
✅ Catálogo de produtos com busca e filtros

✅ Carrinho de compras dinâmico

✅ Processo de checkout completo

✅ Acompanhamento de pedidos em tempo real

✅ Perfil pessoal e histórico de pedidos

✅ Sistema de autenticação seguro

Para Administradores
✅ Dashboard com métricas e estatísticas

✅ Gestão completa de produtos

✅ Controle de pedidos e status

✅ Relatórios de vendas e desempenho

✅ Gerenciamento de usuários

🔧 Desenvolvimento
Scripts Disponíveis
json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "jest",
  "db:seed": "node scripts/seed.js"
}
Estrutura de Desenvolvimento
Modularização - Código organizado em módulos

Separação de Concerns - Front-end e back-end independentes

API RESTful - Padrões REST para endpoints

Error Handling - Tratamento consistente de erros

🐛 Solução de Problemas
Erros Comuns
Conexão com MySQL falha

Verificar credenciais no .env

Confirmar se MySQL está rodando

Porta já em uso

Alterar PORT no .env

Matar processo na porta: npx kill-port 3000

CORS errors

Verificar configuração CORS no server.js

Confirmar URLs do front-end

🤝 Contribuição
Fork o projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

👨‍💻 Autor
Josué Lucena

GitHub: @jlucenadev

Projeto desenvolvido como trabalho de faculdade