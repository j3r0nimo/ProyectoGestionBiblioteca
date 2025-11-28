---
id: estrategiaTesting
title: Estrategia de Testing
---

# Estrategia de Testing

# Estrategia de Testing

Utilizamos **Vitest** como nuestro "Test Runner" principal debido a su velocidad instantánea y su compatibilidad nativa con ESM (ECMAScript Modules), lo cual evita los problemas comunes de configuración que ocurren con Jest en proyectos modernos.

## A. Test Unitario (Unit Testing)

Los tests unitarios se enfocan en probar la lógica de negocio de forma aislada, **sin tocar la base de datos real**.

- **Ubicación:** backend/src/services/libroService.test.js
- **Qué probamos:** La capa de Servicios (libroService.js).

### Cómo funciona

- Utilizamos vi.mock() para "burlar" (mock) los modelos de Mongoose (Libro, Contenido).
- Esto nos permite simular respuestas de la base de datos (ej. _"el libro fue encontrado"_ o _"el libro es null"_) sin necesidad de tener una instancia de MongoDB corriendo.
- Probamos lógica pura, como borrados en cascada o validaciones condicionales.

## B. Test de Integración (Integration Testing)

Los tests de integración prueban el flujo completo de una petición HTTP, asegurando que las diferentes piezas (**Ruta -> Middleware -> Controlador -> Servicio**) funcionen bien juntas.

- **Ubicación:** backend/src/controllers/libroController.test.js
- **Qué probamos:** La capa de Controladores y Rutas (libroController.js).
- **Herramientas:** Utilizamos **Supertest** (supertest) para simular peticiones HTTP reales.

### Cómo funciona

- Importamos la app de Express.
- Supertest levanta un servidor temporal en memoria.
- Enviamos peticiones reales (ej. GET /libros/123).
- Verificamos que la API responda con los códigos de estado correctos (200, 404, 500) y que la estructura del JSON sea la esperada.

**Nota:** Incluso en los tests de integración, también "mockeamos" el servicio para evitar escribir en la base de datos real y mantener los tests rápidos y deterministas.

## Cómo Ejecutar los Tests

Para correr toda la suite de pruebas (Unitarias + Integración):

```
cd backend
npm run test
```

Esto ejecutará vitest run, mostrará un resumen de los tests que pasaron/fallaron y generará un reporte detallado en la terminal.
