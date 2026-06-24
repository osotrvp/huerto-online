const regiones = [
  {
    nombre: "Región Metropolitana",
    comunas: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "La Florida", "Maipú", "Puente Alto", "San Bernardo", "La Granja", "Peñalolén"]
  },
  {
    nombre: "Región de Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"]
  },
  {
    nombre: "Región del Biobío",
    comunas: ["Concepción", "Talcahuano", "Chillán", "Los Ángeles"]
  },
  {
    nombre: "Región de La Araucanía",
    comunas: ["Temuco", "Villarrica", "Angol"]
  },
  {
    nombre: "Región de Los Lagos",
    comunas: ["Puerto Montt", "Osorno", "Castro"]
  }
];

function cargarRegiones(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  regiones.forEach(region => {
    const option = document.createElement("option");
    option.value = region.nombre;
    option.textContent = region.nombre;
    select.appendChild(option);
  });
}

function cargarComunasPorRegion(nombreRegion, selectComunaId) {
  const selectComuna = document.getElementById(selectComunaId);
  if (!selectComuna) return;

  selectComuna.innerHTML = '<option value="">-- Selecciona una comuna --</option>';

  const region = regiones.find(r => r.nombre === nombreRegion);
  if (!region) return;

  region.comunas.forEach(comuna => {
    const option = document.createElement("option");
    option.value = comuna;
    option.textContent = comuna;
    selectComuna.appendChild(option);
  });
}

function cargarComunas() {
  const region = document.getElementById("region").value;
  cargarComunasPorRegion(region, "comuna");
}

document.addEventListener("DOMContentLoaded", () => {
  cargarRegiones("region");
});