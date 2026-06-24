function obtenerCarrito() {
  const data = localStorage.getItem("carritoHuertoHogar");
  return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carritoHuertoHogar", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;

  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  contador.textContent = totalItems;
}

function agregarAlCarrito() {
  const id = obtenerIdDeUrl();
  const producto = obtenerProductoPorId(id);
  if (!producto) return;

  const cantidadInput = document.getElementById("cantidad");
  const cantidad = Number(cantidadInput.value);

  if (cantidad < 1 || cantidad > producto.stock) {
    alert(`Ingresa una cantidad entre 1 y ${producto.stock}`);
    return;
  }

  const carrito = obtenerCarrito();
  const itemExistente = carrito.find(item => item.id === producto.id);

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad
    });
  }

  guardarCarrito(carrito);

  const mensaje = document.getElementById("mensaje-confirmacion");
  if (mensaje) {
    mensaje.style.display = "block";
    setTimeout(() => { mensaje.style.display = "none"; }, 2500);
  }
}

function eliminarDelCarrito(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito(carrito);
  renderCarrito();
}

function cambiarCantidadCarrito(id, nuevaCantidad) {
  const carrito = obtenerCarrito();
  const item = carrito.find(item => item.id === id);
  if (!item) return;

  if (nuevaCantidad < 1) {
    eliminarDelCarrito(id);
    return;
  }

  item.cantidad = nuevaCantidad;
  guardarCarrito(carrito);
  renderCarrito();
}

function crearFilaCarrito(item) {
  const subtotalItem = item.precio * item.cantidad;

  return `
    <div class="fila-carrito" data-id="${item.id}">
      <img src="img/${item.imagen}" alt="${item.nombre}" />
      <div class="fila-carrito-info">
        <h3>${item.nombre}</h3>
        <p>$${item.precio.toLocaleString("es-CL")} c/u</p>
      </div>
      <div class="fila-carrito-cantidad">
        <button onclick="cambiarCantidadCarrito(${item.id}, ${item.cantidad - 1})">-</button>
        <span>${item.cantidad}</span>
        <button onclick="cambiarCantidadCarrito(${item.id}, ${item.cantidad + 1})">+</button>
      </div>
      <p class="fila-carrito-subtotal">$${subtotalItem.toLocaleString("es-CL")}</p>
      <button class="fila-carrito-eliminar" onclick="eliminarDelCarrito(${item.id})">🗑️</button>
    </div>
  `;
}

let descuentoAplicado = 0;

const cuponesValidos = {
  "HUERTO10": 0.10,
  "BIENVENIDO": 0.05
};

function calcularTotales() {
  const carrito = obtenerCarrito();
  const subtotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const despacho = subtotal > 0 ? 2990 : 0;
  const descuento = subtotal * descuentoAplicado;
  const total = subtotal + despacho - descuento;

  return { subtotal, despacho, descuento, total };
}

function renderCarrito() {
  const lista = document.getElementById("lista-carrito");
  const vacio = document.getElementById("carrito-vacio");
  const resumen = document.getElementById("resumen-carrito");
  if (!lista) return;

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    lista.style.display = "none";
    if (vacio) vacio.style.display = "block";
    if (resumen) resumen.style.display = "none";
    return;
  }

  lista.style.display = "block";
  if (vacio) vacio.style.display = "none";
  if (resumen) resumen.style.display = "block";

  lista.innerHTML = carrito.map(crearFilaCarrito).join("");

  const { subtotal, despacho, descuento, total } = calcularTotales();

  document.getElementById("subtotal").textContent = subtotal.toLocaleString("es-CL");
  document.getElementById("total").textContent = total.toLocaleString("es-CL");

  const filaDescuento = document.getElementById("fila-descuento");
  if (descuento > 0) {
    filaDescuento.style.display = "flex";
    document.getElementById("valor-descuento").textContent = descuento.toLocaleString("es-CL");
  } else {
    filaDescuento.style.display = "none";
  }
}

function aplicarCupon() {
  const input = document.getElementById("input-cupon");
  const mensaje = document.getElementById("mensaje-cupon");
  const codigo = input.value.trim().toUpperCase();

  if (cuponesValidos[codigo]) {
    descuentoAplicado = cuponesValidos[codigo];
    mensaje.textContent = "✅ Cupón aplicado correctamente";
    mensaje.style.color = "#2E8B57";
  } else {
    descuentoAplicado = 0;
    mensaje.textContent = "❌ Cupón inválido";
    mensaje.style.color = "#c0392b";
  }

  renderCarrito();
}

function finalizarCompra() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  alert("¡Gracias por tu compra! Este es un proyecto académico, no se procesará un pago real.");
  localStorage.removeItem("carritoHuertoHogar");
  descuentoAplicado = 0;
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  renderCarrito();
});