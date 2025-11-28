---
id: reglasEslint
title: Personalización de Reglas
---

# Personalización de Reglas

El estilo de código no es estático; el equipo puede decidir cambiar las normas. Aquí documentamos las reglas activas y su justificación.

## Reglas Activas en el Backend

Actualmente, estas son las reglas específicas configuradas en backend/eslint.config.js que gobiernan nuestro código:

rules: {  
"no-unused-vars": "warn",  
"no-console": "off",  
"semi": \["error", "always"\],  
"quotes": \["error", "single"\]  
}

### Explicación Detallada

#### 1\. "no-unused-vars": "warn"

- **Qué hace:** Detecta variables que fueron declaradas pero nunca se usaron en el código.
- **Comportamiento:** Muestra una **advertencia amarilla** en la terminal.
- **Por qué:** No detiene el commit (porque a veces dejamos variables mientras estamos programando/debuggeando), pero nos avisa para mantener el código limpio a largo plazo.

#### 2\. "no-console": "off"

- **Qué hace:** Controla el uso de console.log, console.error, etc.
- **Comportamiento:** La regla está **desactivada**.
- **Por qué:** En el backend, es común y necesario usar console.log para mostrar mensajes del servidor (ej. _"Conectado a la base de datos"_ o _"Escuchando en puerto 3000"_). No queremos bloquear esto.

#### 3\. "semi": \["error", "always"\]

- **Qué hace:** Controla el uso de puntos y coma al final de las sentencias.
- **Comportamiento:** Marca un **error rojo** (detiene el commit) si falta un punto y coma.
- **Por qué:** Asegura consistencia estricta. eslint --fix agregará automáticamente los puntos y coma faltantes al hacer commit.

#### 4\. "quotes": \["error", "single"\]

- **Qué hace:** Controla el tipo de comillas usadas para los strings.
- **Comportamiento:** Marca un **error rojo** (detiene el commit) si se usan comillas dobles (") en lugar de simples (').
- **Por qué:** Mantiene un estilo visual uniforme. eslint --fix convertirá automáticamente las comillas dobles a simples.
