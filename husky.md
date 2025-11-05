# Configuración de Husky y Calidad de Código

Este documento explica la configuración de Husky y las herramientas de calidad de código (ESLint, Prettier) implementadas en este proyecto. Por ahora, su implementación está solo en el backend.

## Resumen

El proyecto utiliza `husky` para ejecutar "hooks" de Git que automatizan la revisión y el formateo del código. Esto asegura que todo el código subido al repositorio mantenga un estilo consistente y pase las revisiones básicas.

Hay dos hooks configurados: `pre-commit` y `pre-push` (Aún no configurado).

---

## 1. Hook `pre-commit` (Linting y Formateo)

Este hook se ejecuta automáticamente **cada vez que se intenta hacer un `git commit`**.

**Propósito:** Formatear el código automáticamente para asegurar un estilo consistente.

**Herramientas:**
* **`lint-staged`**: Es la herramienta que gestiona la ejecución. Revisa solo los archivos que se van a "commitear".
* **`eslint`**: Revisa el código en busca de errores y problemas de estilo (ej. variables no usadas, comillas incorrectas).
* **`prettier`**: Reformatea el código para asegurar un estilo visual consistente (ej. indentación, espaciado, saltos de línea).

## Funcionamiento

1. Hacer `git commit` (posterior a `git add`).
2. `lint-staged` toma los archivos `.js` de `backend/src/` que están en el commit (solo a los que se le hicieron `git add`).
3. Ejecuta `eslint --fix` para arreglar problemas.
4. Ejecuta `npx prettier --write` para formatear el código.
5. Si ambos tienen éxito, el commit se completa con el código ya limpio.

