const contasModel = require("../models/contasModel");

exports.getContas = (req, res) => {
  const contas = contasModel.getAll();
  res.json(contas);
};

exports.addConta = (req, res) => {
  const novaConta = contasModel.add(req.body);
  res.json(novaConta);
};

exports.deleteConta = (req, res) => {
  contasModel.remove(req.params.id);
  res.json({ message: "Removido" });
};

exports.togglePago = (req, res) => {
  const conta = contasModel.toggle(req.params.id);
  res.json(conta);
};