const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/users.json");

exports.login = (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(DATA_PATH));

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.json({ message: "Login OK", token: "admin-token" });
};