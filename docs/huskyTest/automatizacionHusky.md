id: automatizacionHusky
title: Automatización de Git Hooks

---

# Automatización de Git Hooks

Utilizamos **Husky** para gestionar "Git Hooks". Estos son scripts que se ejecutan automáticamente ante ciertos eventos de Git (como hacer un commit o un push) para proteger el repositorio de código de mala calidad.

## Hook pre-commit (Calidad y Formato)

Este hook se ejecuta automáticamente **antes** de que se cree un commit (git commit).

- **Objetivo:** Asegurar que ningún código "sucio", mal formateado o con errores de sintaxis entre al historial de versiones.
- **Herramienta:** lint-staged.

### ¿Qué hace?

- Analiza **solo** los archivos que están en el "stage" (los que vas a subir), lo que lo hace muy rápido.
- Ejecuta **ESLint** (eslint --fix) para encontrar errores lógicos y corregir automáticamente problemas de estilo.
- Ejecuta **Prettier** (prettier --write) para reformatear el código y dejarlo visualmente perfecto.

:::danger Bloqueo de Commit

Si el linter encuentra un error que no puede corregir automáticamente, el commit se cancela. Debes corregir el error manualmente para poder continuar.

:::

## Hook pre-push (Seguridad y Tests)

Este hook se ejecuta automáticamente **antes** de subir código al repositorio remoto (git push).

- **Objetivo:** Asegurar que ninguna subida rompa la aplicación existente (Integración Continua Local).

### ¿Qué hace?

Ejecuta el comando npm run test (que corre todos los tests explicados en la sección de Testing).

:::caution Bloqueo de Push

Si un solo test falla (rojo), el push se cancela totalmente. Esto actúa como una red de seguridad que garantiza que las ramas main o develop siempre tengan código funcional.

:::
