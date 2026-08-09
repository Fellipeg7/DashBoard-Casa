<div align="center">

# 🏠 DashBoard-Casa

**Dashboard de contas da casa** — uma aplicação web completa para gerenciar as contas a pagar do lar, construída com uma **API REST em Node.js/Express** e um **frontend vanilla (HTML/CSS/JS)** com autenticação e CRUD de contas.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JSON](https://img.shields.io/badge/Persist%C3%AAncia-JSON-38BDF8?style=for-the-badge&logo=json&logoColor=white)

</div>

---

## ✨ Funcionalidades

- 🔐 **Autenticação de usuários** — login com token para proteger as rotas da aplicação
- 📊 **Dashboard** — visão geral de todas as contas da casa em um só lugar
- 💰 **CRUD completo de contas** — adicionar, listar, marcar como paga e remover contas
- ✅ **Controle de pagamento** — alterne rapidamente o status *pago / não pago* de cada conta
- 📁 **Persistência em JSON** — dados salvos localmente em `server/data/`, sem banco de dados externo
- 🎨 **Interface leve e responsiva** — frontend puro em HTML/CSS/JS, sem dependências de framework

## 🖥️ Screenshots

| 🔐 Tela de login | 📊 Dashboard |
|:---:|:---:|
| ![Tela de login](docs/screenshots/login.png) | ![Dashboard de contas](docs/screenshots/dashboard.png) |

> As capturas de tela serão adicionadas na pasta `docs/screenshots/`.

## 🛠️ Stack

| Camada | Tecnologia |
|--------|------------|
| **Backend** | [Node.js](https://nodejs.org/) + [Express 4](https://expressjs.com/) |
| **Frontend** | HTML5, CSS3 e JavaScript puro (sem frameworks) |
| **API** | REST com suporte a **CORS** e corpo em JSON |
| **Persistência** | Arquivos JSON locais (`server/data/`) |
| **Autenticação** | Token simples via header `Authorization` |

## 🚀 Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (qualquer versão LTS recente)
- `npm` (já incluso na instalação do Node.js)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/Fellipeg7/DashBoard-Casa.git
cd DashBoard-Casa

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
npm start
```

Abra o navegador em **http://localhost:3000** 🎉

> O servidor roda na porta `3000` e serve tanto a API (`/api`) quanto o frontend estático.

### 🔐 Credenciais padrão

Para desenvolvimento local, utilize o usuário padrão:

```
usuário: admin
senha:   admin
```

> ⚠️ *As credenciais são armazenadas em texto puro no `users.json` — ideal para estudos e uso doméstico. Para produção, utilize hash de senha e tokens JWT.*

## 🔌 API

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|:---:|
| `POST` | `/api/login` | Autentica o usuário e retorna o token | — |
| `GET` | `/api/contas` | Lista todas as contas | — |
| `POST` | `/api/contas` | Cria uma nova conta | — |
| `PUT` | `/api/contas/:id` | Alterna o status *pago / não pago* | 🔒 |
| `DELETE` | `/api/contas/:id` | Remove uma conta | — |

### Exemplo de conta

```json
{
  "id": 1776396286156,
  "nome": "Internet",
  "valor": "99,99",
  "vencimento": "2026-05-10",
  "pago": false
}
```

## 📁 Estrutura do projeto

```
DashBoard-Casa/
├── client/                     → Frontend vanilla (HTML/CSS/JS)
│   ├── index.html              → Tela de login
│   ├── login.html              → Tela de login (servida em /)
│   ├── dashboard.html          → Painel de contas
│   ├── css/
│   │   └── style.css           → Estilos da aplicação
│   └── js/
│       ├── api.js              → Cliente HTTP (fetch) para a API
│       ├── login.js            → Lógica da tela de login
│       └── dashboard.js        → Lógica do painel de contas
├── server/                     → API Express
│   ├── app.js                  → Ponto de entrada do servidor
│   ├── routes/
│   │   ├── authRoutes.js       → Rotas de autenticação
│   │   └── contasRoutes.js     → Rotas do CRUD de contas
│   ├── controllers/
│   │   ├── authController.js   → Lógica de autenticação
│   │   └── contasController.js → Lógica das contas
│   ├── middleware/
│   │   └── authMiddleware.js   → Proteção de rotas (token)
│   ├── models/
│   │   └── contasModel.js      → Acesso e gravação em JSON
│   └── data/
│       ├── contas.json         → Persistência das contas
│       └── users.json          → Usuários do sistema
├── package.json
└── README.md
```

## 🗺️ Próximos passos

- [ ] Hash de senhas com **bcrypt**
- [ ] Autenticação com **JWT**
- [ ] Migração para banco de dados (SQLite/PostgreSQL)
- [ ] Gráficos e estatísticas de gastos mensais
- [ ] Modo claro/escuro

## 👤 Autor

Desenvolvido por [Fellipe Gabriel](https://github.com/Fellipeg7) — feito com 💙 para organizar as contas de casa.

---

<div align="center">

⭐ Se este projeto te ajudou, deixe uma estrela!

</div>
