# 🌱 HuertoHogar

Tienda online de productos orgánicos del campo, desarrollada como proyecto de la asignatura **Front End** (TI3V31) de INACAP.

## 📋 Descripción

HuertoHogar conecta productores locales de la Región Metropolitana con consumidores finales, ofreciendo frutas, verduras, hierbas y otros productos orgánicos a domicilio. El proyecto incluye una vista pública de tienda y un panel administrador para gestionar productos y usuarios.

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (Flexbox, Grid, Media Queries)
- JavaScript (Vanilla JS, sin frameworks)
- LocalStorage para persistencia de datos
- Google Fonts (Playfair Display + Montserrat)
- Git / GitHub para control de versiones

## 📁 Estructura del proyecto

```
huerto-hogar/

├── index.html, productos.html, carrito.html, etc.

├── css/

│   └── styles.css

├── js/

│   ├── productos.js

│   ├── carrito.js

│   ├── validaciones.js

│   ├── regiones.js

│   └── blogs.js

├── img/

└── admin/

├── index.html, productos.html, usuarios.html, etc.

└── js/

├── admin-productos.js

├── admin-usuarios.js

└── admin-dashboard.js
```

## ✨ Funcionalidades principales

### Vista pública
- Catálogo de productos con filtros por categoría
- Detalle de producto con productos relacionados
- Carrito de compras con persistencia en LocalStorage, cupones de descuento y cálculo de totales
- Registro de usuarios con validación de RUT chileno (algoritmo Módulo 11)
- Login con validación de dominios de correo permitidos
- Formulario de contacto con validaciones
- Blog con artículo destacado, filtros por categoría y detalle de artículo
- Diseño responsive (escritorio, tablet y móvil)

### Panel administrador
- Dashboard con resumen de productos, usuarios y stock crítico
- Gestión de productos (crear, editar, eliminar, buscar, filtrar)
- Gestión de usuarios (crear, editar, eliminar, buscar, filtrar por estado)
- Roles de usuario: Administrador, Cliente y Vendedor

## 🚀 Cómo ejecutar el proyecto

1. Clonar el repositorio
2. Abrir la carpeta con Visual Studio Code
3. Ejecutar con la extensión **Live Server** (clic derecho sobre `index.html` → "Open with Live Server")

No requiere instalación de dependencias ni servidor backend.

## 👥 Autores

- Oscar Leiva — INACAP La Granja
- Pedro Rivas — INACAP La Granja

## 📚 Contexto académico

Proyecto desarrollado para la **Evaluación Parcial 2 (35%)** de la asignatura Front End, INACAP.