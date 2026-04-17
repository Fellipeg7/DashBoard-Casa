const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const contasRoutes = require("./routes/contasRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
app.use("/api", authRoutes);
app.use("/api/contas", contasRoutes);

// FRONTEND
app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Rodando...");
});

document.body.classList.toggle("light");