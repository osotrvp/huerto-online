const usuariosIniciales = [
  {
    id: 1,
    nombre: "Oscar",
    apellido: "Leiva",
    rut: "191234565",
    email: "oscar.leiva@inacapmail.cl",
    passwordHash: "",
    telefono: "+56912345678",
    region: "Región Metropolitana",
    comuna: "La Granja",
    rol: "admin",
    estado: "activo",
    fechaRegistro: "2026-03-10"
  }
];

async function hashearTexto(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function inicializarUsuarios() {
  const data = localStorage.getItem("usuariosHuertoHogar");
  if (data) return JSON.parse(data);

  usuariosIniciales[0].passwordHash = await hashearTexto("admin123");
  localStorage.setItem("usuariosHuertoHogar", JSON.stringify(usuariosIniciales));
  return usuariosIniciales;
}

function obtenerUsuarios() {
  const data = localStorage.getItem("usuariosHuertoHogar");
  return data ? JSON.parse(data) : [];
}

function guardarListaUsuarios(lista) {
  localStorage.setItem("usuariosHuertoHogar", JSON.stringify(lista));
}

async function buscarUsuarioPorCredenciales(email, password) {
  const lista = obtenerUsuarios();
  const correoNormalizado = email.trim().toLowerCase();
  const hashIngresado = await hashearTexto(password);

  return lista.find(u =>
    u.email.toLowerCase() === correoNormalizado &&
    u.passwordHash === hashIngresado &&
    u.estado === "activo"
  ) || null;
}

function existeCorreoUsuario(email) {
  const lista = obtenerUsuarios();
  const correoNormalizado = email.trim().toLowerCase();
  return lista.some(u => u.email.toLowerCase() === correoNormalizado);
}

async function agregarUsuario(datosUsuario) {
  const lista = obtenerUsuarios();
  const nuevoId = lista.length > 0 ? Math.max(...lista.map(u => u.id)) + 1 : 1;

  const passwordHash = await hashearTexto(datosUsuario.password);
  const { password, ...resto } = datosUsuario;

  const usuario = { id: nuevoId, ...resto, passwordHash };
  lista.push(usuario);
  guardarListaUsuarios(lista);
  return usuario;
}

let usuarios = [];
inicializarUsuarios().then(lista => { usuarios = lista; });