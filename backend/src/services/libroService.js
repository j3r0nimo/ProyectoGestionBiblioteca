import Libro from '../models/libro.js';
import Contenido from '../models/contenido.js';

// NORMAS DEL DISEÑO:
    // Estilo de función: function expression (o sea: asignar la función a una variable)
    // Ejemplo: const nombreFuncion = async () => { }
    // Error handling: a nivel de la capa del controller
    // id validation: a nivel ruta, mediante un middleware

// Lista de funciones:
    // getLibrosService         RETORNAR EL LISTADO DE LIBROS
    // getLibroByIdService      RETORNAR EL LIBRO POR SU /:id
    // newLibroService          CREAR UN NUEVO LIBRO
    // deleteLibroService       ELIMINAR UN LIBRO (y 'contenido' (cascada))
    // updateLibroService       ACTUALIZAR UN LIBRO EXISTENTE




// RETORNAR EL LISTADO DE LIBROS
export const getLibrosService = async (page = 1, limit = 10, keyword = '') => {

  const skip = (page - 1) * limit;    // skip(n) le dice a mongodb n° resultados a evitar (y por donde empezar)

  const filter = keyword
    ? {
        $or: [
          { tituloLibro	: { $regex: keyword, $options: 'i' } },     // busqueda en el campo tituloLibro
          { genero	: { $regex: keyword, $options: 'i' } },         // o en genero	
          { subgenero	: { $regex: keyword, $options: 'i' } },       // o en subgenero
          { editorial	: { $regex: keyword, $options: 'i' } }        // o en editorial
        ]
      }
    : {};

  const [libros, total] = await Promise.all([    
    Libro.find(filter).sort({ tituloLibro: 1, anio: 1 }).skip(skip).limit(limit).lean(),
    Libro.countDocuments(filter)
  ]);
  
  // Retorno simplemente los datos.
  return {
      libros,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
};




// RETORNAR EL LIBRO POR SU /:id 
export const getLibroByIdService = async (id) => {
  const libroById = await Libro.findById(id).lean();

  if (!libroById) return null;
  
  return libroById; 
};




// CREAR UN NUEVO LIBRO
export const newLibroService = async (data) => {
    const libro = new Libro(data);
    
    return await libro.save();
};




// ELIMINAR UN LIBRO
// Elimina los documentos relacionados que existan en 'contenido' (cascada)
export const deleteLibroService = async (id) => {
  
  const libroEliminado = await Libro.findByIdAndDelete(id);

  if (libroEliminado){
    await Contenido.deleteMany({ libroId: id });
  }

  return libroEliminado
};


// ACTUALIZAR UN LIBRO EXISTENTE
export const updateLibroService = async (id, data) => {
  const libro = await Libro.findById(id);

  if (!libro) {
    throw new Error('Libro no encontrado');
  }

  // Actualizar los campos del libro
  Object.keys(data).forEach(key => {
    libro[key] = data[key];
  });

  return await libro.save();
};