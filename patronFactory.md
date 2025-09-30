## Patron Factory
El patron Factory es un patron de diseño creacional el cual se usa para crear objetos sin que el codigo cliente sepa que clase o tipo de objeto se esta instanciando.

### Caracteristicas:
- Facilitar la extension: si se quiere añadir una nueva clase, hay que nada mas expandir el Factory, dando la posibilidad de evitar romper el codigo cliente
- Encapsulamiento de la creacion de objetos: se evita que el cliente use el "new"
- Mejor abstraccion: el cliente trabaja con una interfaz comun

## Implementacion del patron Factory en el Frontend

En nuestro frontend implementariamos el patron Factory por varias razones:
- Desacoplamiento: el cliente no tiene que saber como se crean los componentes, solo nos tiene que pedir que objeto quiere ver.
  Sin el Factory tendriamos que decidir que renderizar (tarjeta del autor, del libro o de la revista), pero al implementarlo tenemos que nada mas llamar al factory y la logica estaria encapsulada
- Escalabilidad y mantenimiento: en caso futuro de añadir una clase o modificar algo de otras, solo tendriamos que ir al Factory y no ir cambiando todos los archivos en los que usamos cada clase
- Manejo de varios objetos: en nuestro caso usamos libros, revistas y autores. Cada uno requiere un componente distinto en sus interfaces (libro tiene el ISBN, revista tiene numero de edicion e ISSN y el autor tiene la biografia).
  Al usar Factory ponemos todo en un solo lugar y nos evitamos el trabajo de usar miles de Ifs o Switchs que estan repartidos por todos los archivos.

### Abreviando todo:
El usar Factory nos va a facilitar el mantenimiento, la escalabilidad y la organizacion en nuestra aplicacion de gestion de biblioteca, evitando repetir codigo, tener codigo limpio y facilitando el incorporacion de nuevas entidades en planes futuros
