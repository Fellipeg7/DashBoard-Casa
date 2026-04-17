const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../data/contas.json");

function read() {
  return JSON.parse(fs.readFileSync(FILE));
}

function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

exports.getAll = () => {
  return read();
};

exports.add = (conta) => {
  const data = read();

  const nova = {
    id: Date.now(),
    ...conta,
  };

  data.push(nova);
  write(data);

  return nova;
};

exports.remove = (id) => {
  let data = read();
  data = data.filter((c) => c.id != id);
  write(data);
};

exports.toggle = (id) => {
  const data = read();

  const conta = data.find((c) => c.id == id);

  if (conta) {
    conta.pago = !conta.pago;
  }

  write(data);

  return conta;
};