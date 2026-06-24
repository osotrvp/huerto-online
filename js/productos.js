const productos = [
  {
    id: 1,
    nombre: "Tomate orgánico",
    categoria: "verduras",
    precio: 1990,
    stock: 45,
    imagen: "tomate.jpg",
    descripcion: "Tomates cultivados sin pesticidas, cosechados en su punto óptimo de maduración.",
    origen: "Melipilla",
    destacado: true
  },
  {
    id: 2,
    nombre: "Lechuga hidropónica",
    categoria: "verduras",
    precio: 1490,
    stock: 30,
    imagen: "lechuga.jpg",
    descripcion: "Lechuga cultivada en sistema hidropónico, libre de tierra y pesticidas.",
    origen: "Buin",
    destacado: true
  },
  {
    id: 3,
    nombre: "Manzana fuji",
    categoria: "frutas",
    precio: 2290,
    stock: 60,
    imagen: "manzana.jpg",
    descripcion: "Manzanas dulces y crujientes, cultivadas de forma orgánica en el Valle del Maipo.",
    origen: "Valle del Maipo",
    destacado: true
  },
  {
    id: 4,
    nombre: "Plátano",
    categoria: "frutas",
    precio: 1690,
    stock: 50,
    imagen: "platano.jpg",
    descripcion: "Plátanos importados de comercio justo, ricos en potasio y fibra.",
    origen: "Comercio justo",
    destacado: false
  },
  {
    id: 5,
    nombre: "Albahaca fresca",
    categoria: "hierbas",
    precio: 990,
    stock: 25,
    imagen: "albahaca.jpg",
    descripcion: "Albahaca aromática, ideal para salsas y ensaladas frescas.",
    origen: "Peñaflor",
    destacado: false
  },
  {
    id: 6,
    nombre: "Cilantro",
    categoria: "hierbas",
    precio: 790,
    stock: 8,
    imagen: "cilantro.jpg",
    descripcion: "Cilantro fresco cultivado de forma orgánica, sin pesticidas.",
    origen: "Talagante",
    destacado: false
  },
  {
    id: 7,
    nombre: "Miel orgánica",
    categoria: "otros",
    precio: 5990,
    stock: 15,
    imagen: "miel.jpg",
    descripcion: "Miel pura de abejas, producida por apicultores locales de la Región Metropolitana.",
    origen: "Melipilla",
    destacado: true
  },
  {
    id: 8,
    nombre: "Huevos de campo",
    categoria: "otros",
    precio: 3490,
    stock: 5,
    imagen: "huevos.jpg",
    descripcion: "Docena de huevos de gallinas libres, criadas en pastoreo.",
    origen: "Paine",
    destacado: false
  }
];

function crearCardProducto(producto) {
  return `
    <a href="detalle-producto.html?id=${producto.id}" class="card-producto">
      <img src="img/${producto.imagen}" alt="${producto.nombre}" />
      <div class="card-producto-info">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <span class="card-producto-precio">$${producto.precio.toLocaleString("es-CL")}</span>
      </div>
    </a>
  `;
}

function renderProductosDestacados() {
  const contenedor = document.getElementById("contenedor-productos-destacados");
  if (!contenedor) return;

  const destacados = productos.filter(p => p.destacado);
  contenedor.innerHTML = destacados.map(crearCardProducto).join("");
}

function renderCatalogoProductos(categoria = "todos") {
  const contenedor = document.getElementById("contenedor-productos");
  const mensajeVacio = document.getElementById("mensaje-vacio");
  if (!contenedor) return;

  const filtrados = categoria === "todos"
    ? productos
    : productos.filter(p => p.categoria === categoria);

  if (filtrados.length === 0) {
    contenedor.innerHTML = "";
    if (mensajeVacio) mensajeVacio.style.display = "block";
  } else {
    contenedor.innerHTML = filtrados.map(crearCardProducto).join("");
    if (mensajeVacio) mensajeVacio.style.display = "none";
  }
}

function inicializarFiltrosProductos() {
  const botones = document.querySelectorAll(".btn-filtro");
  if (botones.length === 0) return;

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      botones.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");
      renderCatalogoProductos(boton.dataset.categoria);
    });
  });
}

function obtenerProductoPorId(id) {
  return productos.find(p => p.id === Number(id));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductosDestacados();
  renderCatalogoProductos();
  inicializarFiltrosProductos();
});