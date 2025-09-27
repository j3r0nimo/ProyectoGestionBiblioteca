### Proyecto propuesto

El proyecto del Grupo 6, para su aplicación a la materia Metodología de Sistemas II, es un Sistema de Sestión de Bibliotecas, con un servicio online accesible por medio de un navegador web. Las herramientas y la arquitectura de su diseño son un Backend donde se emplean Node.js, Express y mongoDB para servir los datos, con un concepto de servicio exclusivamente de tipo API, mas un Frontend diseñado en React.js, en ambos casos con el lenguaje javascript.

El Backend es una API que permite operar a través de endpoints, los cuales brindan servicios para crear, leer, actualizar  y eliminar los documentos almacenados en la base de datos. La base de datos almacena dos colecciones, libros y contenido y el diseño del backend sigue un patrón de diseño estándar: modelo, servicio, controlador, rutas y aplicación.

El Frontend es un diseño para el consumo de esa API, producido con React.js, basado en el uso de componentes reutilizables, el uso de un DOM virtual para las actualizaciones, la sintaxis JSX para integrar HTML y JavaScript y la capacidad de crear interfaces dinámicas y responsivas.