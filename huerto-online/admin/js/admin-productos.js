function crearFilaProductoAdmin(producto) {
  return `
    <tr data-id="${producto.id}">
      <td>${producto.id}</td>
      <td><img src="../img/${producto.imagen}" alt="${producto.nombre}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;" /></td>
      <td>${producto.nombre}</td>
      <td>${producto.categoria}</td>
      <td>$${producto.precio.toLocaleString("es-CL")}</td>
      <td>${producto.stock}</td>
      <td>
        <a href="nuevo-producto.html?id=${producto.id}" class="btn-secundario">Editar</a>
        <button onclick="abrirModalEliminar(${producto.id})" class="btn-peligro">Eliminar</button>
      </td>
    </tr>
  `;
}

function renderTablaProductosAdmin(lista) {
  const tbody = document.getElementById("tabla-productos");
  const tablaVacia = document.getElementById("tabla-vacia");
  if (!tbody) return;

  if (lista.length === 0) {
    tbody.innerHTML = "";
    if (tablaVacia) tablaVacia.style.display = "block";
    return;
  }

  if (tablaVacia) tablaVacia.style.display = "none";
  tbody.innerHTML = lista.map(crearFilaProductoAdmin).join("");
}

function filtrarTablaProductos() {
  const texto = document.getElementById("buscar-producto").value.toLowerCase();
  const categoria = document.getElementById("filtro-categoria-admin").value;

  let filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));

  if (categoria !== "todos") {
    filtrados = filtrados.filter(p => p.categoria === categoria);
  }

  renderTablaProductosAdmin(filtrados);
}

let idProductoAEliminar = null;

function abrirModalEliminar(id) {
  idProductoAEliminar = id;
  document.getElementById("modal-eliminar").style.display = "flex";
}

function cerrarModal() {
  idProductoAEliminar = null;
  document.getElementById("modal-eliminar").style.display = "none";
}

function confirmarEliminar() {
  if (idProductoAEliminar === null) return;
  const index = productos.findIndex(p => p.id === idProductoAEliminar);
  if (index !== -1) productos.splice(index, 1);
  guardarProductosEnStorage();
  cerrarModal();
  renderTablaProductosAdmin(productos);
}

function validarFormularioProducto(event) {
  event.preventDefault();
  let esValido = true;

  const idEditar = document.getElementById("producto-id").value;
  const nombre = document.getElementById("nombre").value.trim();
  const categoria = document.getElementById("categoria").value;
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;
  const imagen = document.getElementById("imagen").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const origen = document.getElementById("origen").value.trim();
  const destacado = document.getElementById("destacado").checked;

  ["error-nombre", "error-categoria", "error-precio", "error-stock", "error-imagen", "error-descripcion", "error-origen"].forEach(limpiarError);

  if (nombre === "") {
    mostrarError("error-nombre", "El nombre es requerido");
    esValido = false;
  } else if (nombre.length < 3) {
    mostrarError("error-nombre", "Mínimo 3 caracteres");
    esValido = false;
  }

  if (categoria === "") {
    mostrarError("error-categoria", "Selecciona una categoría");
    esValido = false;
  }

  if (precio === "" || Number(precio) < 0) {
    mostrarError("error-precio", "El precio debe ser 0 o mayor");
    esValido = false;
  }

  if (stock === "" || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
    mostrarError("error-stock", "El stock debe ser un número entero igual o mayor a 0");
    esValido = false;
  }

  if (descripcion.length > 500) {
    mostrarError("error-descripcion", "Máximo 500 caracteres");
    esValido = false;
  }

  if (!esValido) return false;

  if (idEditar) {
    const producto = productos.find(p => p.id === Number(idEditar));
    producto.nombre = nombre;
    producto.categoria = categoria;
    producto.precio = Number(precio);
    producto.stock = Number(stock);
    producto.imagen = imagen || producto.imagen;
    producto.descripcion = descripcion;
    producto.origen = origen;
    producto.destacado = destacado;
  } else {
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    productos.push({
      id: nuevoId,
      nombre,
      categoria,
      precio: Number(precio),
      stock: Number(stock),
      imagen: imagen || "default.jpg",
      descripcion,
      origen,
      destacado
    });
  }
  guardarProductosEnStorage();

  const mensaje = document.getElementById("mensaje-form-producto");
  mensaje.textContent = "✅ Producto guardado correctamente";
  mensaje.style.display = "block";
  mensaje.style.color = "#2E8B57";

  setTimeout(() => { window.location.href = "productos.html"; }, 1200);

  return false;
}

function precargarFormularioProducto() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const producto = productos.find(p => p.id === Number(id));
  if (!producto) return;

  document.getElementById("titulo-formulario").textContent = "Editar Producto";
  document.getElementById("producto-id").value = producto.id;
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("categoria").value = producto.categoria;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("stock").value = producto.stock;
  document.getElementById("imagen").value = producto.imagen;
  document.getElementById("descripcion").value = producto.descripcion;
  document.getElementById("origen").value = producto.origen;
  document.getElementById("destacado").checked = producto.destacado;
}

document.addEventListener("DOMContentLoaded", () => {
  renderTablaProductosAdmin(productos);
  precargarFormularioProducto();

  const form = document.getElementById("form-producto");
  if (form) form.addEventListener("submit", validarFormularioProducto);
});