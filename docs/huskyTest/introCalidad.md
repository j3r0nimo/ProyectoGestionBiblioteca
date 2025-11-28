---
id: introCalidad
title: Guia de Calidad
---

# Calidad de Código y Automatización

Esta sección detalla la estrategia de testing y las herramientas de automatización implementadas en el proyecto para asegurar la robustez y mantenibilidad del código.

:::note Nota de Arquitectura

La configuración de Husky en la raíz está diseñada para ser escalable.

Actualmente orquesta el ciclo de vida del Backend como una prueba de concepto sólida, pero la infraestructura está lista para integrar el Frontend en un futuro sin necesidad de reestructurar la raíz del proyecto.

:::

## Configuración General

La filosofía de este proyecto es "Cero Configuración Manual". Todo lo necesario se instala y configura automáticamente al preparar el entorno de desarrollo.

Simplemente sigue estos pasos:

- Ve a la carpeta del backend:  
   `cd backend`

- Instala las dependencias:  
   `npm install`

¡Y listo! El script de instalación configurará Husky automáticamente en tu máquina, activando los hooks de Git sin que tengas que hacer nada más.
