const API = window.location.origin + "/api";
let chartCategoria;
let chartStatus;
let chartTempo;

// TEMA
function toggleTheme() {
  document.body.classList.toggle('light');
}

// CARREGAR
async function load() {
  const res = await fetch(`${API}/contas`);
  const contas = await res.json();

  renderLista(contas);
  renderGrafico(contas);
}

// LISTA
function renderLista(contas) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  contas.forEach(c => {
    const li = document.createElement("li");

    li.innerHTML = `
  <strong>${c.nome}</strong>
  R$${c.valor} - ${c.vencimento}

  <span class="status ${c.pago ? "pago" : "pendente"}">
    ${c.pago ? "✔ Pago" : "⏳ Pendente"}
  </span>

  <div class="actions">
    <button onclick="toggle(${c.id})">✔</button>
    <button onclick="remover(${c.id})">X</button>
  </div>
`;

    lista.appendChild(li);
  });
}

// GRÁFICO
function renderGrafico(contas) {
  const ctx = document.getElementById("grafico");

  const totais = {};

  contas.forEach(c => {
    totais[c.nome] = (totais[c.nome] || 0) + Number(c.valor);
  });

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(totais),
      datasets: [{
        label: "Gastos por categoria",
        data: Object.values(totais)
      }]
    }
  });
}

// CRUD
async function addConta() {
  const nome = document.getElementById("nome").value;
  const valor = document.getElementById("valor").value;
  const vencimento = document.getElementById("vencimento").value;

  await fetch(`${API}/contas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, valor, vencimento, pago: false })
  });

  load();
}

async function remover(id) {
  await fetch(`${API}/contas/${id}`, { method: "DELETE" });
  load();
}

async function toggle(id) {
  const token = localStorage.getItem("token");

  await fetch(`${API}/contas/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": token
    }
  });

  load();
}

function navigate(view) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));

  document.getElementById(`view-${view}`).classList.add("active");

  if (view === "dashboard") loadGrafico();
  if (view === "contas") load();
  if (view === "relatorios") loadRelatorio();
}

async function load() {
  const res = await fetch(`${API}/contas`);
  const contas = await res.json();

  renderLista(contas);
}

async function loadRelatorio() {
  const res = await fetch(`${API}/contas`);
  const contas = await res.json();

  let total = 0;
  let pagos = 0;
  let pendentes = 0;

  const categorias = {};

  contas.forEach(c => {
    contas.forEach(c => {
  const valor = parseFloat(String(c.valor).replace(",", ".")) || 0;

  total += valor;

  if (c.pago) {
    pagos += valor;
  } else {
    pendentes += valor;
  }
});

    categorias[c.nome] = (categorias[c.nome] || 0) + valor;
  });

  // RESUMO
  document.getElementById("resumo").innerHTML = `
  <div class="card total">
    <h3>Total</h3>
    <p>R$ ${total.toFixed(2)}</p>
  </div>

  <div class="card pagos">
    <h3>Pagos</h3>
    <p>R$ ${pagos.toFixed(2)}</p>
  </div>

  <div class="card pendentes">
    <h3>Pendentes</h3>
    <p>R$ ${pendentes.toFixed(2)}</p>
  </div>
`;

  // DESTROI GRÁFICOS ANTIGOS
  if (chartCategoria) chartCategoria.destroy();
  if (chartStatus) chartStatus.destroy();

  // 📊 GRÁFICO POR CATEGORIA
  chartCategoria = new Chart(
    document.getElementById("graficoCategoria"),
    {
      type: "bar",
      data: {
        labels: Object.keys(categorias),
        datasets: [{
          label: "Gastos por categoria",
          data: Object.values(categorias)
        }]
      }
    }
  );

  // 📈 GRÁFICO STATUS
  chartStatus = new Chart(
    document.getElementById("graficoStatus"),
    {
      type: "pie",
      data: {
        labels: ["Pagos", "Pendentes"],
        datasets: [{
          data: [pagos, pendentes]
        }]
      }
    }
  );
}

async function loadRelatorio() {
  const res = await fetch(`${API}/contas`);
  const contas = await res.json();

  let total = 0;
  let pagos = 0;
  let pendentes = 0;

  const categorias = {};
  const datas = {};

  contas.forEach(c => {
    const valor = parseFloat(
  String(c.valor).replace(",", ".")
) || 0;
    total += valor;

    // STATUS
    if (c.pago) pagos += valor;
    else pendentes += valor;

    // CATEGORIAS
    categorias[c.nome] = (categorias[c.nome] || 0) + valor;

    // TEMPO (por data)
    datas[c.vencimento] = (datas[c.vencimento] || 0) + valor;
  });

  // RESUMO
  document.getElementById("relatorio").innerHTML = `
    <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
    <p><strong>Pagos:</strong> R$ ${pagos.toFixed(2)}</p>
    <p><strong>Pendentes:</strong> R$ ${pendentes.toFixed(2)}</p>
  `;

  // LIMPA GRÁFICOS ANTIGOS
  if (chartCategoria) chartCategoria.destroy();
  if (chartStatus) chartStatus.destroy();
  if (chartTempo) chartTempo.destroy();

  // 📊 CATEGORIAS
  chartCategoria = new Chart(
    document.getElementById("graficoCategoria"),
    {
      type: "bar",
      data: {
        labels: Object.keys(categorias),
        datasets: [{
          label: "Gastos por categoria",
          data: Object.values(categorias)
        }]
      }
    }
  );

  // 🥧 STATUS
  chartStatus = new Chart(
    document.getElementById("graficoStatus"),
    {
      type: "pie",
      data: {
        labels: ["Pagos", "Pendentes"],
        datasets: [{
          data: [pagos, pendentes]
        }]
      }
    }
  );

  // 📈 TEMPO
  chartTempo = new Chart(
    document.getElementById("graficoTempo"),
    {
      type: "line",
      data: {
        labels: Object.keys(datas),
        datasets: [{
          label: "Gastos por data",
          data: Object.values(datas)
        }]
      }
    }
  );
}

window.onload = () => {
  document.getElementById("loader").style.display = "none";
};

function navigate(view) {
  const views = document.querySelectorAll(".view");

  views.forEach(v => v.classList.remove("active"));

  setTimeout(() => {
    document.getElementById(`view-${view}`).classList.add("active");
  }, 100);

  if (view === "dashboard") loadGrafico();
  if (view === "contas") load();
  if (view === "relatorios") loadRelatorio();
  
}

options: {
  animation: {
    duration: 1200;
    easing: "easeOutQuart"
  }
}

load();