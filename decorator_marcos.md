### ## Patrón Decorator

El patrón **Decorator** se utiliza para añadir nuevas funcionalidades o responsabilidades a un objeto de forma dinámica, sin necesidad de modificar su clase original. Funciona "envolviendo" el objeto base con uno o más objetos "decoradores" que añaden el nuevo comportamiento.

Un ejemplo clásico es el de una cafetería: el objeto base es un "Café solo". A este se le pueden añadir decoradores como "Leche", "Azúcar" o "Crema". Cada decorador añade un costo y una descripción, pero el objeto final sigue siendo un tipo de café. No es necesario crear una clase para cada posible combinación de ingredientes.

Las características del patrón Decorator son:
* Permite añadir o quitar responsabilidades de un objeto en tiempo de ejecución.
* Es una alternativa flexible a la herencia para extender la funcionalidad.
* Los decoradores tienen la misma interfaz que el objeto que envuelven.
* Se pueden anidar múltiples decoradores para combinar funcionalidades complejas.

---
### ## Decorator en nuestro proyecto

Nuestro proyecto de gestión de biblioteca necesita enriquecer los datos de los libros antes de enviarlos como respuesta en la API. El modelo base de `Libro` contiene la información esencial, pero para el cliente (frontend) necesitamos datos adicionales o procesados.

El patrón Decorator se aplica para añadir esta información de forma limpia y modular. Hemos implementado tres decoradores específicos:

* **PortadaDecorator**: Transforma la ruta relativa de la imagen de portada (ej: `/uploads/imagen.jpg`) en una URL completa y accesible (ej: `http://localhost:3000/uploads/imagen.jpg`), utilizando el contexto de la petición (`req`).
* **DisponibilidadDecorator**: Añade un campo para indicar si el libro está disponible para préstamo.
* **StatsDecorator**: Agrega estadísticas relevantes, como el rating o el número de veces que ha sido prestado.

Este enfoque mantiene nuestro modelo de datos principal (`Libro`) limpio, mientras que la lógica para enriquecer la respuesta queda encapsulada en los controladores y las clases decoradoras.

---
### ## Diseño Decorator en nuestro sistema

El proceso de aplicación del patrón Decorator se puede ver claramente en los métodos `getLibros` y `getLibroById` del controlador. El flujo es el siguiente:

1.  El controlador recibe una petición (`req`) para obtener uno o más libros.
2.  Se llama a un servicio (`libroServicio`) que obtiene los datos crudos del libro o libros desde la base de datos.
3.  Si es una lista de libros, se utiliza el método `.map()` para aplicar el proceso de decoración a cada libro individualmente.
4.  Comienza la cadena de decoración para un libro: primero se instancia `PortadaDecorator`, pasándole el objeto del libro y el objeto `req` para construir la URL completa de la imagen.
5.  Luego, se toma el objeto resultante del primer decorador (usando `decorado.getData()`) y se pasa al constructor del `DisponibilidadDecorator`.
6.  De la misma forma, el resultado del segundo decorador se pasa al constructor del `StatsDecorator`.
7.  Finalmente, se llama al método `getData()` del último decorador en la cadena para obtener el objeto final, completamente enriquecido con todas las nuevas propiedades.
8.  Este objeto final es el que se incluye en la respuesta JSON de la API.
9.  Este método nos permite componer dinámicamente el objeto de respuesta, añadiendo solo la información necesaria de una manera ordenada y mantenible.