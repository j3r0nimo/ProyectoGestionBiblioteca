---
id: patrones
title: Patrones usados 
---

## Patrón Singleton

La conexión a la base de datos es una situación ideal para aplicar **un diseño** de patrón singleton, dado que una conexión a una base de datos tiene necesariamente que ser una instancia única, que se comparte con cualquier otro sector del sistema y su configuración se centraliza en un único punto.

Mongoose tiene la característica de no permitir que la conexión pueda duplicarse y de emplear siempre la misma, pero esa no es la cuestión; la cuestión es si la conexión **está diseñada** bajo un patrón singleton, esto es: si sacamos a mongoose, ¿la conexión se instancia con cada llamada a la base de datos o su diseño lo impide?

Por todo lo anterior, la conexión a una base de datos es un lugar perfecto para aplicar el patrón singleton en nuestro proyecto, con un diseño que en vez de crear la conexión ante la llamada, primero verifique si hay una conexión ya instanciada.

## Patron Factory 

El manejo de formularios en el Frontend es buena razon para implementar el patron de diseño Factory.

Lo implementariamos por varias razones:

* Desacoplamiento: el cliente no tiene que saber como se crean los componentes, solo nos tiene que pedir que objeto quiere ver.
  Sin el Factory tendriamos que decidir que renderizar (tarjeta del autor, del libro o de la revista), pero al implementarlo tenemos que nada mas llamar al factory y la logica estaria encapsulada
* Escalabilidad y mantenimiento: en caso futuro de añadir otro formulario o modificar algo, solo tendriamos que ir al Factory y no ir cambiando todos los archivos en los que usamos cada formulario
* Manejo de varios objetos: en nuestro caso usamos libros, revistas y otros(manuales, folletos y catalogos). Cada uno requiere un componente distinto en sus interfaces (libro tiene el ISBN, revista tiene numero de edicion e ISSN y los otros no requieren ninguno de esos 2).

