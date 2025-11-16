# Servicios

La comunicación con el backend se centraliza en la carpeta `/services` usando `axios`:

* `api.jsx`: Instancia la base de Axios.
* `libros.jsx`: Contiene todas las llamadas a la API para el CRUD de publicaciones (GET, POST, PUT, DELETE), manejando `FormData` para las imágenes.
* `contenidos.jsx`: Contiene las llamadas a la API para el CRUD de los contenidos de las publicaciones.
