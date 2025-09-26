# Patrón de Diseño: Builder

##  Builder para el modelo Libro

El modelo `Libro` tiene muchos atributos, algunos opcionales, otros condicionales según el tipo, el año, etc. Instanciar un libro correctamente puede ser poco legible y propenso a errores si se usa un constructor con muchos parámetros o un objeto literal gigante.

En el proyecto, el Builder se puede usar para:
- Crear objetos Libro de manera más clara.
- Manejar fácilmente atributos opcionales (por ejemplo, ISSN solo para revistas, ISBN solo para libros de cierto año, etc).
- Validar atributos antes de construir el objeto final, evitando errores en la base de datos.

El patrón **Builder** permite construir objetos complejos paso a paso, separando:
- **La lógica de construcción** (qué partes se agregan y en qué orden).
- **Del objeto final** que se obtiene.

Así, el mismo proceso de construcción puede generar diferentes representaciones del objeto, y el código resulta más legible y mantenible.

---

## Ventajas del patrón Builder

- Permite manejar objetos con muchos parámetros opcionales o condicionales.
- Hace que el código sea más legible que un constructor gigante.
- Permite crear diferentes configuraciones de un objeto sin duplicar código.
- Separa la lógica de construcción de la lógica de negocio.

## Desventajas

- Introduce más clases (el Builder y a veces un Director).
- Puede ser más complejo de lo necesario para objetos simples.

---

## Ejemplo aplicado al modelo Libro

Supongamos que queremos crear un libro usando Builder en JavaScript:

```js
class LibroBuilder {
    constructor() {
        this.libro = {};
    }

    setTipo(tipo) {
        this.libro.tipo = tipo;
        return this;
    }

    setISBN(isbn) {
        this.libro.isbn = isbn;
        return this;
    }

    setISSN(issn) {
        this.libro.issn = issn;
        return this;
    }

    setTitulo(titulo) {
        this.libro.tituloLibro = titulo;
        return this;
    }

    setAutor(autor) {
        this.libro.autor = autor;
        return this;
    }

    setIdioma(idioma) {
        this.libro.idioma = idioma;
        return this;
    }

    setEditorial(editorial) {
        this.libro.editorial = editorial;
        return this;
    }

    setMedidas(medidas) {
        this.libro.medidas = medidas;
        return this;
    }

    setGenero(genero) {
        this.libro.genero = genero;
        return this;
    }

    setSubgenero(subgenero) {
        this.libro.subgenero = subgenero;
        return this;
    }

    setMes(mes) {
        this.libro.mes = mes;
        return this;
    }

    setAnio(anio) {
        this.libro.anio = anio;
        return this;
    }

    setPaginas(paginas) {
        this.libro.paginas = paginas;
        return this;
    }

    setPortadaImagePath(path) {
        this.libro.portadaImagePath = path;
        return this;
    }

    build() {
        // se puede agregar validaciones extra 
        return this.libro;
    }
}

// USO:
const libro = new LibroBuilder()
    .setTipo('Libro')
    .setISBN('978-3-16-148410-0')
    .setTitulo('El Principito')
    .setAutor('Antoine de Saint-Exupéry')
    .setIdioma('Español')
    .setEditorial('Editorial Ejemplo')
    .setMedidas('22.5 x 12.8')
    .setGenero('Novela')
    .setSubgenero('Infantil')
    .setAnio(1943)
    .setPaginas(96)
    .build();
```

