const blogsIniciales = [
  {
    id: 1,
    titulo: "5 recetas con productos de temporada",
    categoria: "recetas",
    autor: "Equipo HuertoHogar",
    fecha: "2026-05-10",
    imagen: "blog1.jpg",
    resumen: "Aprovecha al máximo tus verduras frescas con estas recetas simples y deliciosas.",
    contenido: "<p>La temporada de otoño trae consigo una variedad de verduras frescas ideales para preparar platos reconfortantes.</p><p>En este artículo te mostramos 5 recetas simples usando productos que encuentras directamente en nuestro catálogo.</p>",
    tags: ["recetas", "temporada", "verduras"]
  },
  {
    id: 2,
    titulo: "Cómo elegir frutas y verduras orgánicas",
    categoria: "consejos",
    autor: "María Soto",
    fecha: "2026-05-15",
    imagen: "blog2.jpg",
    resumen: "Guía práctica para identificar productos realmente orgánicos en el mercado.",
    contenido: "<p>No todo lo que dice 'orgánico' lo es realmente. Aquí te enseñamos qué buscar.</p><p>Revisa siempre las certificaciones y conoce el origen de tus alimentos.</p>",
    tags: ["consejos", "organico", "salud"]
  },
  {
    id: 3,
    titulo: "Nueva alianza con productores de Melipilla",
    categoria: "noticias",
    autor: "Equipo HuertoHogar",
    fecha: "2026-05-20",
    imagen: "blog3.jpg",
    resumen: "HuertoHogar suma 10 nuevos productores locales a su red de distribución.",
    contenido: "<p>Estamos felices de anunciar una nueva alianza estratégica con productores de la zona de Melipilla.</p><p>Esto nos permite ampliar nuestro catálogo y llegar a más familias chilenas.</p>",
    tags: ["noticias", "alianzas"]
  },
  {
    id: 4,
    titulo: "El ciclo de cultivo de la lechuga hidropónica",
    categoria: "agricultura",
    autor: "Pedro Ramírez",
    fecha: "2026-05-25",
    imagen: "blog4.jpg",
    resumen: "Conoce cómo se produce nuestra lechuga sin usar tierra ni pesticidas.",
    contenido: "<p>La hidroponía es un sistema de cultivo sin tierra que utiliza soluciones de agua con nutrientes.</p><p>Este método permite cultivos más limpios y eficientes en el uso de agua.</p>",
    tags: ["agricultura", "hidroponia"]
  }
];

function cargarBlogsDesdeStorage() {
  const data = localStorage.getItem("blogsHuertoHogar");
  if (data) return JSON.parse(data);
  localStorage.setItem("blogsHuertoHogar", JSON.stringify(blogsIniciales));
  return blogsIniciales;
}

let blogs = cargarBlogsDesdeStorage();

function crearCardBlog(blog) {
  return `
    <a href="detalle-blog.html?id=${blog.id}" class="card-blog">
      <img src="img/${blog.imagen}" alt="${blog.titulo}" />
      <div class="card-blog-info">
        <span class="etiqueta-categoria">${blog.categoria}</span>
        <h3>${blog.titulo}</h3>
        <p>${blog.resumen}</p>
      </div>
    </a>
  `;
}

function renderBlogs(categoria = "todos") {
  const destacado = document.getElementById("articulo-destacado");
  const contenedor = document.getElementById("contenedor-blogs");
  const mensajeVacio = document.getElementById("mensaje-vacio-blog");
  if (!contenedor) return;

  const filtrados = categoria === "todos" ? blogs : blogs.filter(b => b.categoria === categoria);

  if (filtrados.length === 0) {
    contenedor.innerHTML = "";
    if (destacado) destacado.innerHTML = "";
    if (mensajeVacio) mensajeVacio.style.display = "block";
    return;
  }

  if (mensajeVacio) mensajeVacio.style.display = "none";

  if (destacado && categoria === "todos") {
    destacado.innerHTML = crearCardBlog(filtrados[0]);
    contenedor.innerHTML = filtrados.slice(1).map(crearCardBlog).join("");
  } else {
    if (destacado) destacado.innerHTML = "";
    contenedor.innerHTML = filtrados.map(crearCardBlog).join("");
  }
}

function inicializarFiltrosBlogs() {
  const botones = document.querySelectorAll(".filtros .btn-filtro");
  if (botones.length === 0) return;

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      botones.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");
      renderBlogs(boton.dataset.categoria);
    });
  });
}

function renderDetalleBlog() {
  const titulo = document.getElementById("blog-titulo");
  if (!titulo) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const blog = blogs.find(b => b.id === id);
  if (!blog) return;

  document.getElementById("breadcrumb-titulo").textContent = blog.titulo;
  document.getElementById("blog-imagen").src = `img/${blog.imagen}`;
  document.getElementById("blog-categoria").textContent = blog.categoria;
  document.getElementById("blog-autor").textContent = `✍️ ${blog.autor}`;
  document.getElementById("blog-fecha").textContent = `📅 ${blog.fecha}`;
  document.getElementById("blog-titulo").textContent = blog.titulo;
  document.getElementById("blog-resumen").textContent = blog.resumen;
  document.getElementById("blog-contenido").innerHTML = blog.contenido;
  document.getElementById("blog-tags").innerHTML = blog.tags.map(t => `<span class="etiqueta-categoria">${t}</span>`).join(" ");

  const recientes = blogs.slice(-3).reverse();
  document.getElementById("sidebar-recientes").innerHTML = recientes.map(b =>
    `<li><a href="detalle-blog.html?id=${b.id}">${b.titulo}</a></li>`
  ).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderBlogs();
  inicializarFiltrosBlogs();
  renderDetalleBlog();
});