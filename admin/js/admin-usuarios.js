const usuariosIniciales = [
  {
    id: 1,
    nombre: "Oscar",
    apellido: "Leiva",
    rut: "191234565",
    email: "oscar.leiva@inacapmail.cl",
    telefono: "+56912345678",
    region: "Región Metropolitana",
    comuna: "La Granja",
    rol: "admin",
    estado: "activo",
    fechaRegistro: "2026-03-10"
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González Pérez",
    rut: "152345671",
    email: "maria.gonzalez@gmail.com",
    telefono: "+56987654321",
    region: "Región Metropolitana",
    comuna: "Santiago",
    rol: "cliente",
    estado: "activo",
    fechaRegistro: "2026-04-02"
  }
];

function cargarUsuariosDesdeStorage() {
  const data = localStorage.getItem("usuariosHuertoHogar");
  if (data) return JSON.parse(data);
  localStorage.setItem("usuariosHuertoHogar", JSON.stringify(usuariosIniciales));
  return usuariosIniciales;
}

function guardarUsuariosEnStorage() {
  localStorage.setItem("usuariosHuertoHogar", JSON.stringify(usuarios));
}

let usuarios = cargarUsuariosDesdeStorage();

function crearFilaUsuarioAdmin(usuario) {
  const badgeClase = usuario.estado === "activo" ? "badge-activo" : "badge-inactivo";

  return `
    <tr data-id="${usuario.id}">
      <td>${usuario.id}</td>
      <td>${usuario.nombre} ${usuario.apellido}</td>
      <td>${usuario.email}</td>
      <td>${usuario.region}</td>
      <td><span class="${badgeClase}">${usuario.estado}</span></td>
      <td>${usuario.fechaRegistro}</td>
      <td>
        <a href="nuevo-usuario.html?id=${usuario.id}" class="btn-secundario">Editar</a>
        <button onclick="abrirModalEliminarUsuario(${usuario.id})" class="btn-peligro">Eliminar</button>
      </td>
    </tr>
  `;
}

function renderTablaUsuariosAdmin(lista) {
  const tbody = document.getElementById("tabla-usuarios");
  const tablaVacia = document.getElementById("tabla-usuarios-vacia");
  if (!tbody) return;

  if (lista.length === 0) {
    tbody.innerHTML = "";
    if (tablaVacia) tablaVacia.style.display = "block";
    return;
  }

  if (tablaVacia) tablaVacia.style.display = "none";
  tbody.innerHTML = lista.map(crearFilaUsuarioAdmin).join("");
}

function filtrarTablaUsuarios() {
  const texto = document.getElementById("buscar-usuario").value.toLowerCase();
  const estado = document.getElementById("filtro-estado-usuario").value;

  let filtrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(texto) ||
    u.apellido.toLowerCase().includes(texto) ||
    u.email.toLowerCase().includes(texto)
  );

  if (estado !== "todos") {
    filtrados = filtrados.filter(u => u.estado === estado);
  }

  renderTablaUsuariosAdmin(filtrados);
}

let idUsuarioAEliminar = null;

function abrirModalEliminarUsuario(id) {
  idUsuarioAEliminar = id;
  document.getElementById("modal-eliminar-usuario").style.display = "flex";
}

function cerrarModalUsuario() {
  idUsuarioAEliminar = null;
  document.getElementById("modal-eliminar-usuario").style.display = "none";
}

function confirmarEliminarUsuario() {
  if (idUsuarioAEliminar === null) return;
  const index = usuarios.findIndex(u => u.id === idUsuarioAEliminar);
  if (index !== -1) usuarios.splice(index, 1);
  guardarUsuariosEnStorage();
  cerrarModalUsuario();
  renderTablaUsuariosAdmin(usuarios);
}

function cargarComunasAdmin() {
  const region = document.getElementById("region").value;
  cargarComunasPorRegion(region, "comuna");
}

function validarFormularioUsuarioAdmin(event) {
  event.preventDefault();
  let esValido = true;

  const idEditar = document.getElementById("usuario-id").value;
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const rol = document.getElementById("rol").value;
  const estado = document.getElementById("estado").value;
  const password = document.getElementById("password").value;

  ["error-nombre", "error-apellido", "error-email", "error-telefono", "error-region", "error-comuna", "error-password"].forEach(limpiarError);

  if (nombre === "") {
    mostrarError("error-nombre", "El nombre es requerido");
    esValido = false;
  } else if (nombre.length > 50) {
    mostrarError("error-nombre", "Máximo 50 caracteres");
    esValido = false;
  }

  if (apellido === "") {
    mostrarError("error-apellido", "El apellido es requerido");
    esValido = false;
  } else if (apellido.length > 100) {
    mostrarError("error-apellido", "Máximo 100 caracteres");
    esValido = false;
  }

  if (email === "") {
    mostrarError("error-email", "El correo es requerido");
    esValido = false;
  } else if (email.length > 100) {
    mostrarError("error-email", "Máximo 100 caracteres");
    esValido = false;
  } else if (!validarCorreoDominio(email, ["@inacap.cl", "@profesor.inacap.cl", "@gmail.com"])) {
    mostrarError("error-email", "Solo se aceptan correos @inacap.cl, @profesor.inacap.cl o @gmail.com");
    esValido = false;
  }

  if (region === "") {
    mostrarError("error-region", "Selecciona una región");
    esValido = false;
  }

  if (comuna === "") {
    mostrarError("error-comuna", "Selecciona una comuna");
    esValido = false;
  }

  if (!idEditar && password === "") {
  mostrarError("error-password", "La contraseña es requerida para usuarios nuevos");
  esValido = false;
} else if (password !== "" && (password.length < 4 || password.length > 10)) {
  mostrarError("error-password", "Debe tener entre 4 y 10 caracteres");
  esValido = false;
}

  if (!esValido) return false;

  if (idEditar) {
    const usuario = usuarios.find(u => u.id === Number(idEditar));
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.telefono = telefono;
    usuario.region = region;
    usuario.comuna = comuna;
    usuario.rol = rol;
    usuario.estado = estado;
  } else {
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    usuarios.push({
      id: nuevoId,
      nombre,
      apellido,
      rut: "",
      email,
      telefono,
      region,
      comuna,
      rol,
      estado,
      fechaRegistro: new Date().toISOString().slice(0, 10)
    });
  }

  guardarUsuariosEnStorage();

  const mensaje = document.getElementById("mensaje-form-usuario");
  mensaje.textContent = "✅ Usuario guardado correctamente";
  mensaje.style.display = "block";
  mensaje.style.color = "#2E8B57";

  setTimeout(() => { window.location.href = "usuarios.html"; }, 1200);

  return false;
}

function precargarFormularioUsuario() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const usuario = usuarios.find(u => u.id === Number(id));
  if (!usuario) return;

  document.getElementById("titulo-formulario-usuario").textContent = "Editar Usuario";
  document.getElementById("usuario-id").value = usuario.id;
  document.getElementById("nombre").value = usuario.nombre;
  document.getElementById("apellido").value = usuario.apellido;
  document.getElementById("email").value = usuario.email;
  document.getElementById("telefono").value = usuario.telefono;
  document.getElementById("rol").value = usuario.rol;
  document.getElementById("estado").value = usuario.estado;

  document.getElementById("region").value = usuario.region;
  cargarComunasPorRegion(usuario.region, "comuna");
  setTimeout(() => {
    document.getElementById("comuna").value = usuario.comuna;
  }, 50);
}

document.addEventListener("DOMContentLoaded", () => {
  renderTablaUsuariosAdmin(usuarios);
  precargarFormularioUsuario();

  const form = document.getElementById("form-usuario-admin");
  if (form) form.addEventListener("submit", validarFormularioUsuarioAdmin);
});