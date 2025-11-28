---
id: intro_back
title: Introducción al Backend
---

# Introducción al Backend

Esta sección documenta la arquitectura y lógica de negocio, tecnologías y endpoints.

### Arquitectura & Lógica del negocio

El backend del sitio sigue la arquitectura de una API REST, donde se define un modelo que permite a la capa de servicios interactuar con la base de datos.
A través del servidor, las rutas reciben las solicitudes del usuario y las envían a la capa de controladores.
Los controladores se encargan de comunicar dichas solicitudes a la capa de servicios y, finalmente, de devolver la respuesta al usuario que realizó la petición.

### Tecnologías

- Entorno Node.js
- Lenguaje Javascript
- Base de datos MongoDB
- Librería Mongoose

### Endpoints

La API tiene dos endpoints básicos, sobre los cuales se puede actuar con las operaciones
estandar del concepto de REST:

- /libros
- /contenidos
