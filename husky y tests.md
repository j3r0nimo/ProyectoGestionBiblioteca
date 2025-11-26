# Guía de Calidad de Código y Automatización

Este documento detalla la estrategia de testing y las herramientas de automatización (Husky)implementadas en el proyecto para asegurar la calidad del código.

#### Nota: 
La configuración de Husky en la raíz está diseñada para ser escalable. Actualmente orquesta el ciclo de vida del Backend para una prueba de concepto, pero está lista para integrar el Frontend en un futuro sin necesidad de reestructurar el proyecto.

## 1. Testing Automatizado

Utilizamos Vitest como nuestro "Test Runner" principal debido a su velocidad y compatibilidad nativa con ESM (ECMAScript Modules).

* A. Test Unitario (Unit Testing)

Los tests unitarios se enfocan en probar la lógica de negocio de forma aislada, sin tocar la base de datos real.

Ubicación: `backend/src/services/libroService.test.js`

Qué probamos: La capa de Servicios `libroService.js`

Cómo funciona:

Utilizamos vi.mock() para "burlar" (mock) los modelos de Mongoose (Libro, Contenido).

Esto nos permite simular respuestas de la base de datos (ej. "el libro fue encontrado" o "el libro es null") sin necesidad de tener MongoDB corriendo.

Probamos lógica pura, como borrados en cascada o validaciones condicionales.

* B. Test de Integración (Integration Testing)

Los tests de integración prueban el flujo completo de una petición HTTP, asegurando que las diferentes piezas (Ruta -> Middleware -> Controlador -> Servicio) funcionen bien juntas.

Ubicación: `backend/src/controllers/libroController.test.js`

Qué probamos: La capa de Controladores y Rutas `libroController.js`.

Herramientas: Utilizamos Supertest (supertest) para simular peticiones HTTP reales (GET, POST, etc.) a nuestra API.

Cómo funciona:

Importamos la app de Express.

Supertest levanta un servidor temporal en memoria.

Enviamos peticiones reales (ej. GET /libros/123).

Verificamos que la API responda con los códigos de estado correctos (200, 404, 500) y que la estructura del JSON sea la esperada.

* Nota: También "mockeamos" el servicio para evitar escribir en la base de datos real durante los tests.

### Cómo Ejecutar los Tests

Para correr toda la suite de pruebas (Unitarias + Integración):
```
cd backend
npm run test
```

Esto ejecutará vitest run, mostrará un resumen de los tests que pasaron/fallaron y generará un reporte en la terminal.

-----

## 2. Automatización con Husky (Git Hooks)

Utilizamos Husky para gestionar "Git Hooks". Estos son scripts que se ejecutan automáticamente ante ciertos eventos de Git (como hacer un commit o un push) para proteger el repositorio de código de mala calidad.

Hook pre-commit (Calidad y Formato)

Este hook se ejecuta automáticamente antes de que se cree un commit (git commit).

Objetivo: Asegurar que ningún código "sucio" o con errores de sintaxis entre al historial de versiones.

Herramienta: lint-staged.

Qué hace:

Analiza solo los archivos que están en el "stage" (los que vas a subir).

Ejecuta `ESLint (eslint --fix)` para encontrar errores y corregir automáticamente problemas de estilo (ej. comillas dobles, punto y coma).

Ejecuta `Prettier (prettier --write)` para reformatear el código y dejarlo visualmente perfecto.

Si falla: El commit se cancela automáticamente y debes corregir los errores antes de intentar de nuevo.

Hook pre-push (Seguridad y Tests)

Este hook se ejecuta automáticamente antes de subir código al repositorio remoto (git push).

Objetivo: Asegurar que ninguna subida rompa la aplicación existente.

Qué hace:

Ejecuta el comando `npm run test` (que corre todos los tests explicados arriba).

Si falla: Si un solo test falla (rojo), el push se cancela totalmente. Esto garantiza que la rama main o developer siempre tenga código funcional y testeado.

---

## 3. Personalización de Reglas

El estilo de código no es estático; el equipo puede decidir cambiar las normas (ej. usar comillas simples en lugar de dobles). Aquí se explica dónde y cómo realizar esos cambios.

### A. Reglas de Lógica y Calidad (ESLint)
Las reglas que detectan errores o malas prácticas (ej. variables no usadas, `console.log` olvidados) se configuran en ESLint.

* **Archivo:** `backend/eslint.config.js`
* **Cómo editar:** Busca el objeto `rules`.
* **Niveles de severidad:**
    * `"off"` o `0`: Desactiva la regla.
    * `"warn"` o `1`: Muestra una advertencia amarilla (no detiene el commit).
    * `"error"` o `2`: Muestra un error rojo (Husky detendrá el commit).

### B. Reglas Activas en el Backend
Actualmente, estas son las reglas específicas configuradas en `backend/eslint.config.js` que gobiernan nuestro código:

```javascript
rules: {
  "no-unused-vars": "warn",
  "no-console": "off",
  "semi": ["error", "always"],
  "quotes": ["error", "single"]
}
```
### Explicación detallada:

1. `"no-unused-vars": "warn"`

* Qué hace: Detecta variables que fueron declaradas pero nunca se usaron en el código.

* Comportamiento: Muestra una advertencia amarilla en la terminal.

* Por qué: No detiene el commit (porque a veces dejamos variables mientras estamos programando/debuggeando), pero nos avisa para mantener el código limpio a largo plazo.

2. `"no-console": "off"`

* Qué hace: Controla el uso de `console.log`, `console.error`, etc.

* Comportamiento: La regla está desactivada.

* Por qué: En el backend, es común y necesario usar `console.log` para mostrar mensajes del servidor (ej. "Conectado a la base de datos" o "Escuchando en puerto 3000"). No queremos bloquear esto.

3. `"semi": ["error", "always"]`

* Qué hace: Controla el uso de puntos y coma al final de las sentencias.

* Comportamiento: Marca un error rojo (detiene el commit) si falta un punto y coma.

* Por qué: Asegura consistencia estricta. `eslint --fix` agregará automáticamente los puntos y coma faltantes al hacer commit.

4. `"quotes": ["error", "single"]`

* Qué hace: Controla el tipo de comillas usadas para los strings.

* Comportamiento: Marca un error rojo (detiene el commit) si se usan comillas dobles (") en lugar de simples (').

* Por qué: Mantiene un estilo visual uniforme. `eslint --fix` convertirá automáticamente las comillas dobles a simples.

## 4. Configuración general

Todo lo necesario se instala al momento de hacer `npm install` en la carpeta `backend`. No hace falta ninguna configuración.