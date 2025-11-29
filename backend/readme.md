# Proyecto Gestion De Biblioteca Personal

# Backend API

## Proyecto

El proyecto del Grupo 6, para su aplicación a la materia Metodología de Sistemas II, es un Sistema de Gestión de Biblioteca Personal, con un servicio accesible por medio de un navegador web.

---

## Backend

El Backend es una API REST, que brinda endpoints para crear, leer, actualizar y eliminar los documentos almacenados en la base de datos. La base de datos almacena dos colecciones, libros y contenido y el diseño del backend sigue un patrón de diseño estándar: modelo, servicio, controlador, rutas y aplicación.

---

## Requerimientos

Se requiere tener instalado mongoDB en el sistema local.

---

## Datos iniciales

Los datos iniciales se cargarán mediante el comando npm run seed.

---

## Instalación & ejecución del entorno

- Ubicarse dentro de la carpeta **backend**-
- npm install
- npm run seed
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

## Integrantes Grupo 6

- Jeronimo Baltian Ortiz
- Jimena Martinez Arana
- Carlos Alberto Arce
- Marcos Diaz

---
