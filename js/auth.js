const CLAVE_SESION = "sesionHuertoHogar";

function iniciarSesion(usuario) {
  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    rol: usuario.rol
  };
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  return sesion;
}

function obtenerSesion() {
  const data = localStorage.getItem(CLAVE_SESION);
  return data ? JSON.parse(data) : null;
}

function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
  const enAdmin = window.location.pathname.includes("/admin/");
  window.location.href = enAdmin ? "../login.html" : "login.html";
}

function protegerVistaAdmin() {
  const sesion = obtenerSesion();
  if (!sesion || (sesion.rol !== "admin" && sesion.rol !== "vendedor")) {
    window.location.href = "../login.html";
    return null;
  }
  return sesion;
}

function actualizarNavbarSegunSesion() {
  const sesion = obtenerSesion();
  const acciones = document.querySelector(".nav-acciones");
  if (!acciones) return;

  if (sesion) {
    acciones.innerHTML = `
      <span>👋 ${sesion.nombre}</span>
      <a href="#" onclick="cerrarSesion(); return false;">Cerrar sesión</a>
      <a href="carrito.html">🛒 <span id="contador-carrito">0</span></a>
    `;
    actualizarContadorCarrito();
  }
}

function mostrarUsuarioActivoAdmin() {
  const sesion = obtenerSesion();
  const span = document.getElementById("admin-nombre-activo");
  if (sesion && span) {
    span.textContent = `👋 Hola, ${sesion.nombre}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const enAdmin = window.location.pathname.includes("/admin/");
  if (enAdmin) {
    protegerVistaAdmin();
    mostrarUsuarioActivoAdmin();
  } else {
    actualizarNavbarSegunSesion();
  }
});