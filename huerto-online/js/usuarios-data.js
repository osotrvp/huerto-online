// Fuente única de datos de usuarios (clientes y administradores).
// Se usa tanto en el login/registro de la tienda como en el panel administrador.

const usuariosIniciales = [
  {
    id: 1,
    nombre: "Oscar",
    apellido: "Leiva",
    rut: "191234565",
    email: "oscar.leiva@inacapmail.cl",
    password: "admin123",
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
    password: "cliente123",
    telefono: "+56987654321",
    region: "Región Metropolitana",
    comuna: "Santiago",
    rol: "cliente",
    estado: "activo",
    fechaRegistro: "2026-04-02"
  }
];

// Carga la lista de usuarios desde localStorage. Si no existe, la inicializa.
function cargarUsuariosDesdeStorage() {
  const data = localStorage.getItem("usuariosHuertoHogar");
  if (data) return JSON.parse(data);
  localStorage.setItem("usuariosHuertoHogar", JSON.stringify(usuariosIniciales));
  return usuariosIniciales;
}

// Guarda la lista completa de usuarios en localStorage.
function guardarListaUsuarios(lista) {
  localStorage.setItem("usuariosHuertoHogar", JSON.stringify(lista));
}

// Busca un usuario activo cuyo correo y contraseña coincidan.
function buscarUsuarioPorCredenciales(email, password) {
  const lista = cargarUsuariosDesdeStorage();
  const correoNormalizado = email.trim().toLowerCase();
  return (
    lista.find(
      (u) =>
        u.email.toLowerCase() === correoNormalizado &&
        u.password === password &&
        u.estado === "activo"
    ) || null
  );
}

// Verifica si ya existe un usuario registrado con ese correo.
function existeCorreoUsuario(email) {
  const lista = cargarUsuariosDesdeStorage();
  const correoNormalizado = email.trim().toLowerCase();
  return lista.some((u) => u.email.toLowerCase() === correoNormalizado);
}

// Agrega un nuevo usuario (por ejemplo, desde el formulario de registro público).
function agregarUsuario(datosUsuario) {
  const lista = cargarUsuariosDesdeStorage();
  const nuevoId = lista.length > 0 ? Math.max(...lista.map((u) => u.id)) + 1 : 1;
  const usuario = { id: nuevoId, ...datosUsuario };
  lista.push(usuario);
  guardarListaUsuarios(lista);
  return usuario;
}
