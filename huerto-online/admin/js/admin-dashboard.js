function renderResumenDashboard() {
  const totalProductos = document.getElementById("total-productos");
  if (!totalProductos) return;

  totalProductos.textContent = productos.length;

  const totalUsuarios = document.getElementById("total-usuarios");
  totalUsuarios.textContent = usuarios.length;

  const stockBajo = productos.filter(p => p.stock <= 10).length;
  document.getElementById("stock-bajo").textContent = stockBajo;

  const categorias = new Set(productos.map(p => p.categoria));
  document.getElementById("total-categorias").textContent = categorias.size;
}

function renderTablaUltimosProductos() {
  const tbody = document.getElementById("tabla-ultimos-productos");
  if (!tbody) return;

  const ultimos = productos.slice(-5).reverse();

  tbody.innerHTML = ultimos.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>$${p.precio.toLocaleString("es-CL")}</td>
      <td>${p.stock}</td>
    </tr>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderResumenDashboard();
  renderTablaUltimosProductos();
});