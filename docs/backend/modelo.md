---
id: modelo
title: El modelo
---

### Diseño

La Base de Datos tiene dos colecciones (tablas), creadas en mongoDB.

### libro

La colección primaria es "libro", cuyos campos son:

- tipo - String - ['Libro', 'Revista', 'Manual', 'Folleto', 'Catalogo']
- isbn - String
- issn - String
- tituloLibro - String
- autor - String
- idioma - String - ['Español', 'Ingles', 'Portugues', 'Griego']
- editorial - String
- medidas - String
- genero - String
- subgenero - String
- mes String - ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
- anio - Number
- paginas - Number
- portadaImagePath - String

### contenido

La colección secundaria es "contenido", cuyos campos son:

- libroId - mongoose.Schema.Types.ObjectId - ref: 'Libro'
- tituloArticulo - String
- resumenArticulo - String
- paginaArticulo - Number
