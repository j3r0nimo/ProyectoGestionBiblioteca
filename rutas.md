# Estructura de Rutas

La navegación se maneja con `react-router-dom`:

* `/`: Página principal. Muestra lo almacenado en la base de datos (`Libreria`).
* `/libros/:id`: Página de detalles (`LibroDetalle`). Muestra toda la informacion de las publicaciones, junto con su contenido relacionado.
* `/formulario`: Página para **crear** una nueva publicación (`Formulario`).
* `/formulario/editar/:id`: Página para **editar** una publicación existente (`Formulario`).
