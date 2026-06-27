// Manejo de sesión activa (login) y protección de las vistas del administrador.
// Requiere que js/usuarios-data.js esté cargado antes para validar credenciales.

const CLAVE_SESION = "sesionHuertoHogar";

// Guarda la sesión activa del usuario que inició sesión correctamente.
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

// Obtiene la sesión activa (o null si no hay nadie autenticado).
function obtenerSesion() {
  const data = localStorage.getItem(CLAVE_SESION);
  return data ? JSON.parse(data) : null;
}

// Cierra la sesión activa y redirige al login.
function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
  const enAdmin = window.location.pathname.includes("/admin/");
  window.location.href = enAdmin ? "../login.html" : "login.html";
}

// Protege las vistas del panel administrador: solo accede rol "admin" (o "vendedor").
// Debe llamarse lo antes posible dentro de <body> de cada página de /admin.
function protegerVistaAdmin() {
  const sesion = obtenerSesion();
  if (!sesion || (sesion.rol !== "admin" && sesion.rol !== "vendedor")) {
    window.location.href = "../login.html";
    return null;
  }
  return sesion;
}

// Muestra el nombre real del administrador autenticado en el header del panel.
function mostrarUsuarioActivoAdmin() {
  const sesion = obtenerSesion();
  const span = document.getElementById("admin-nombre-activo");
  if (sesion && span) {
    span.textContent = `👋 Hola, ${sesion.nombre}`;
  }
}

document.addEventListener("DOMContentLoaded", mostrarUsuarioActivoAdmin);
