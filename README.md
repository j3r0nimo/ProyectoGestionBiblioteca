# Proyecto Gestion De Biblioteca Personal

# Backend API

## Integrantes Grupo 6

- Jeronimo Baltian Ortiz
- Jimena Martinez Arana
- Carlos Alberto Arce
- Marcos Diaz

---

## Proyecto propuesto & Backend

El proyecto del Grupo 6, para su aplicación a la materia Metodología de Sistemas II, es un Sistema de Gestión de Biblioteca Personal, con un servicio online accesible por medio de un navegador web. Las herramientas y la arquitectura de su diseño son un Backend donde se emplean Node.js, Express y mongoDB para servir los datos, con un concepto de servicio exclusivamente de tipo API, mas un Frontend diseñado en React.js, en ambos casos con el lenguaje javascript.

El Backend es una API que permite operar a través de endpoints, los cuales brindan servicios para crear, leer, actualizar y eliminar los documentos almacenados en la base de datos. La base de datos almacena dos colecciones, libros y contenido y el diseño del backend sigue un patrón de diseño estándar: modelo, servicio, controlador, rutas y aplicación.

---

## Instalación & ejecución del entorno

- Ubicarse dentro de la carpeta **backend**
- npm install
- npm run dev

---

## Carpetas src

| Carpeta     | Resumen de su propósito                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| controllers | Control de las rutas, atiende las solicitudes HTTP (GET, POST, PUT, DELETE), interactua con modelos y servicios |
| db          | Contiene la configuración y conexión a la base de datos y archivo de seed inicial.                              |
| middlewares | Funciones intermedias que se ejecutan antes de llegar al controlador.                                           |
| models      | Definición de los modelos de datos, que representan las entidades de la base de datos.                          |
| routes      | Rutas de la API. Se define qué controlador se debe invocar para una ruta y método HTTP específicos.             |
| services    | Funciones de negocio o lógicas que no pertenecen directamente al controlador.                                   |

---

## Patrón Singleton en el proyecto de Grupo

Nuestro proyecto es un sistema web de gestión de biblioteca desarrollado en javascript, con una API en el backend y un frontend diseñado en React, el cual consume esa API. La base de datos es MongoDB y la librería es mongoose.

La conexión a la base de datos es una situación ideal para aplicar **un diseño** de patrón singleton, dado que una conexión a una base de datos tiene necesariamente que ser una instancia única, que se comparte con cualquier otro sector del sistema y su configuración se centraliza en un único punto.

Mongoose tiene la característica de no permitir que la conexión pueda duplicarse y de emplear siempre la misma, pero esa no es la cuestión; la cuestión es si la conexión **está diseñada** bajo un patrón singleton, esto es: si sacamos a mongoose, ¿la conexión se instancia con cada llamada a la base de datos o su diseño lo impide?

Por todo lo anterior, la conexión a una base de datos es un lugar perfecto para aplicar el patrón singleton en nuestro proyecto, con un diseño que en vez de crear la conexión ante la llamada, primero verifique si hay una conexión ya instanciada.

## Diseño Singleton en nuestra conexión

El proceso de conexión y la aplicación del patrón singleton es:

1. Se crea una variable booleana y se la declara false.
2. Se inicia la función de conexión.
3. Si la variable booleana es true, se retorna la conexión que debería existir.
4. Sabemos que es falsa, por ser la primera oportunidad que se intenta la conexión.
5. Se inicia un algoritmo try/catch para crear la conexión y atender los errores.
6. Se crea una constante con los valores para acceder a la base de datos.
7. Si no se puede acceder, se lanza un error y se detiene la ejecución.
8. Si se puede acceder, se crea la conexión.
9. Se declara a la variable booleana inicial como verdadera, fin del try.
10. El catch se ocupa de la posibilidad de error.
11. Se exporta la conexión.
12. La siguiente llamada encontrará que la variable booleana es true.
13. Esa llamada entonces, recibirá la conexión existente.
14. Por lo mismo, se detendrá el proceso y no se creará una nueva conexión.
