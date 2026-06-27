function mostrarError(idSpan, mensaje) {
  const span = document.getElementById(idSpan);
  if (!span) return;
  span.textContent = mensaje;
  span.classList.add("visible");
}

function limpiarError(idSpan) {
  const span = document.getElementById(idSpan);
  if (!span) return;
  span.textContent = "";
  span.classList.remove("visible");
}

function validarCorreoDominio(correo, dominiosPermitidos) {
  const partes = correo.split("@");
  if (partes.length !== 2) return false;
  const dominio = "@" + partes[1].toLowerCase();
  return dominiosPermitidos.includes(dominio);
}

function validarRut(rutSinFormato) {
  const rutLimpio = rutSinFormato.replace(/[^0-9kK]/g, "");
  if (rutLimpio.length < 7 || rutLimpio.length > 9) return false;

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = 11 - (suma % 11);
  let dvCalculado;
  if (resto === 11) dvCalculado = "0";
  else if (resto === 10) dvCalculado = "K";
  else dvCalculado = String(resto);

  return dv === dvCalculado;
}

function validarLogin(event) {
  event.preventDefault();
  let esValido = true;

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  limpiarError("error-email");
  limpiarError("error-password");

  if (email === "") {
    mostrarError("error-email", "El correo es requerido");
    esValido = false;
  } else if (email.length > 100) {
    mostrarError("error-email", "Máximo 100 caracteres");
    esValido = false;
  } else if (!validarCorreoDominio(email, ["@inacap.cl", "@inacapmail.cl", "@gmail.com"])) {
    mostrarError("error-email", "Solo se aceptan correos @inacap.cl, @inacapmail.cl o @gmail.com");
    esValido = false;
  }

  if (password === "") {
    mostrarError("error-password", "La contraseña es requerida");
    esValido = false;
  } else if (password.length < 4 || password.length > 10) {
    mostrarError("error-password", "Debe tener entre 4 y 10 caracteres");
    esValido = false;
  }

  if (esValido) {
    const mensaje = document.getElementById("mensaje-login");
    const usuario = buscarUsuarioPorCredenciales(email, password);

    if (!usuario) {
      mensaje.textContent = "❌ Correo o contraseña incorrectos";
      mensaje.style.display = "block";
      mensaje.style.color = "#c0392b";
      return false;
    }

    iniciarSesion(usuario);

    mensaje.textContent = `✅ Bienvenido/a, ${usuario.nombre}. Redirigiendo...`;
    mensaje.style.display = "block";
    mensaje.style.color = "#2E8B57";

    const destino = (usuario.rol === "admin" || usuario.rol === "vendedor")
      ? "admin/index.html"
      : "index.html";

    setTimeout(() => {
      window.location.href = destino;
    }, 1200);
  }

  return false;
}

function validarContacto(event) {
  event.preventDefault();
  let esValido = true;

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const asunto = document.getElementById("asunto").value;
  const mensaje = document.getElementById("mensaje").value.trim();

  ["error-nombre", "error-email", "error-telefono", "error-asunto", "error-mensaje"].forEach(limpiarError);

  if (nombre === "") {
    mostrarError("error-nombre", "El nombre es requerido");
    esValido = false;
  } else if (nombre.length > 100) {
    mostrarError("error-nombre", "Máximo 100 caracteres");
    esValido = false;
  }

  if (email !== "") {
    if (email.length > 100) {
      mostrarError("error-email", "Máximo 100 caracteres");
      esValido = false;
    } else if (!validarCorreoDominio(email, ["@inacap.cl", "@profesor.inacap.cl", "@gmail.com"])) {
      mostrarError("error-email", "Solo se aceptan correos @inacap.cl, @profesor.inacap.cl o @gmail.com");
      esValido = false;
    }
  } else {
    mostrarError("error-email", "El correo es requerido");
    esValido = false;
  }

  if (asunto === "") {
    mostrarError("error-asunto", "Selecciona un asunto");
    esValido = false;
  }

  if (mensaje === "") {
    mostrarError("error-mensaje", "El mensaje es requerido");
    esValido = false;
  } else if (mensaje.length > 500) {
    mostrarError("error-mensaje", "Máximo 500 caracteres");
    esValido = false;
  }

  if (esValido) {
  const mensajeOk = document.getElementById("mensaje-contacto");
  mensajeOk.textContent = "✅ Mensaje enviado correctamente";
  mensajeOk.style.display = "block";
  mensajeOk.style.color = "#2E8B57";
  document.getElementById("form-contacto").reset();

  setTimeout(() => {
    mensajeOk.style.display = "none";
  }, 2500);
}

  return false;
}

function validarRegistro(event) {
  event.preventDefault();
  let esValido = true;

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const rut = document.getElementById("rut").value.trim();
  const email = document.getElementById("email").value.trim();
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const direccion = document.getElementById("direccion").value.trim();
  const password = document.getElementById("password").value;
  const confirmarPassword = document.getElementById("confirmar-password").value;
  const terminos = document.getElementById("terminos").checked;

  [
    "error-nombre", "error-apellido", "error-rut", "error-email",
    "error-region", "error-comuna", "error-direccion",
    "error-password", "error-confirmar-password", "error-terminos"
  ].forEach(limpiarError);

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

  if (rut === "") {
    mostrarError("error-rut", "El RUT es requerido");
    esValido = false;
  } else if (!validarRut(rut)) {
    mostrarError("error-rut", "RUT inválido. Formato: 19011022K (sin puntos ni guión)");
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
  } else if (typeof existeCorreoUsuario === "function" && existeCorreoUsuario(email)) {
    mostrarError("error-email", "Ese correo ya está registrado");
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

  if (direccion === "") {
    mostrarError("error-direccion", "La dirección es requerida");
    esValido = false;
  } else if (direccion.length > 300) {
    mostrarError("error-direccion", "Máximo 300 caracteres");
    esValido = false;
  }

  if (password === "") {
  mostrarError("error-password", "La contraseña es requerida");
  esValido = false;
} else if (password.length < 4 || password.length > 10) {
  mostrarError("error-password", "Debe tener entre 4 y 10 caracteres");
  esValido = false;
}

  if (confirmarPassword !== password) {
    mostrarError("error-confirmar-password", "Las contraseñas no coinciden");
    esValido = false;
  }

  if (!terminos) {
    mostrarError("error-terminos", "Debes aceptar los términos y condiciones");
    esValido = false;
  }

  if (esValido) {
  if (typeof agregarUsuario === "function") {
    agregarUsuario({
      nombre,
      apellido,
      rut,
      email,
      password,
      telefono: "",
      region,
      comuna,
      direccion,
      rol: "cliente",
      estado: "activo",
      fechaRegistro: new Date().toISOString().slice(0, 10)
    });
  }

  const mensaje = document.getElementById("mensaje-registro");
  mensaje.textContent = "✅ Cuenta creada correctamente. Ya puedes iniciar sesión";
  mensaje.style.display = "block";
  mensaje.style.color = "#2E8B57";

  setTimeout(() => {
    document.getElementById("form-registro").reset();
    mensaje.style.display = "none";
    window.location.href = "login.html";
  }, 2000);
}

  return false;
}