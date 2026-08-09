# DashBoard-Casa

Dashboard de **contas da casa** — API REST em Node.js/Express com frontend vanilla (HTML/CSS/JS). Gerencie contas a pagar com autenticação de usuário.

## ✨ Funcionalidades

- 🔐 **Login** — autenticação de usuários (token)
- 📊 **Dashboard** — visão geral das contas
- 💰 **CRUD de contas** — criar, editar, listar e atualizar contas
- 📁 **Persistência** — dados salvos em JSON local (`server/data/`)

## 🚀 Rodar

```bash
npm install
npm start          # sobe em http://localhost:3000
```

Abrir `client/index.html` no navegador.

## 📁 Estrutura

```
DashBoard-Casa/
├── client/              → frontend (HTML/CSS/JS puro)
│   ├── index.html       → login
│   ├── dashboard.html   → painel de contas
│   └── js/              → api.js, dashboard.js, login.js
└── server/              → API Express
    ├── app.js           → entrada do servidor
    ├── routes/          → authRoutes, contasRoutes
    ├── controllers/     → lógica de autenticação e contas
    ├── middleware/      → authMiddleware (protege rotas)
    ├── models/          → contasModel
    └── data/            → contas.json, users.json
```

## 🛠️ Stack

- Node.js + Express 4
- CORS
- Frontend vanilla (sem framework)
