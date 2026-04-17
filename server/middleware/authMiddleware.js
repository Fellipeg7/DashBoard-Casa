module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== "admin-token") {
    return res.status(403).json({ error: "Não autorizado" });
  }

  next();
};