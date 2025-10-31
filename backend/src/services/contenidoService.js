import Contenido from '../models/contenido.js';
import Libro from '../models/libro.js';
import createError from 'http-errors';

// NORMAS DEL DISEÑO:
    // Estilo de función: function expression (o sea: asignar la función a una variable)
    // Ejemplo: const nombreFuncion = async () => { }
    // Error handling: a nivel de la capa del controller
    // id validation: a nivel ruta, mediante un middleware

// Lista de funciones:
    // getContenidosService           RETORNAR EL LISTADO DE CONTENIDOS
    // getContenidoByIdService        RETORNAR EL CONTENIDO POR SU /:id
    // getContenidoByLibroService     RETORNAR CONTENIDO DE UN LIBRO EN PARTICULAR
    // newContenidoService            CREAR UN NUEVO CONTENIDO
    // deleteContenidoService         ELIMINAR UN CONTENIDO
    // updateContenidoService         ACTUALIZAR UN CONTENIDO EXISTENTE




// RETORNAR EL LISTADO DE CONTENIDOS
export const getContenidosService = async (page = 1, limit = 10, keyword = '') => {

  const skip = (page - 1) * limit;    // skip(n) le dice a mongodb n° resultados a evitar (y por donde empezar)

  const filter = keyword
    ? {
        $or: [
          { tituloArticulo : { $regex: keyword, $options: 'i' } },      // busqueda en el campo tituloArticulo	
          { resumenArticulo	: { $regex: keyword, $options: 'i' } }      // o en resumenArticulo		
        ]
      }
    : {};

    const [contenidos, total] = await Promise.all([    
        Contenido.find(filter).sort({ libroId: 1, paginaArticulo: 1 }).skip(skip).limit(limit).lean(),
        Contenido.countDocuments(filter)
      ]);

    return {
      contenidos,
      total,
      page,
      pages: Math.ceil(total / limit)
    };  
};




// RETORNAR EL CONTENIDO POR SU /:id
export const getContenidoByIdService = async (id) => {

  const contenido = await Contenido.findById(id).lean();

  if (!contenido) throw createError(404, 'Contenido no encontrado');

  return contenido;
};



// RETORNAR CONTENIDO DE UN LIBRO EN PARTICULAR (MISMO libroId)
export const getContenidoByLibroService = async (libroId) => {
  const contenidos = await Contenido
    .find({ libroId })
    .populate('libroId', 'tituloLibro autor genero subgenero idioma portadaImagePath mes anio') // RELACION con Libro
    .sort({ paginaArticulo: 1 })
    .lean();
  
  if (!contenidos.length) {
    throw createError(404, 'No hay contenido para este libro');
  }
  
  // Extracción de la información del libro, usando el primer registro retornado:
  //const { _id, tituloLibro} = contenidos[0].libroId;
  const libroInfo = contenidos[0].libroId;
  
  
  return {
    libroId: libroInfo._id,
    titulo_libro: libroInfo.tituloLibro,
    autor: libroInfo.autor,
    idioma: libroInfo.idioma,
    genero: libroInfo.genero,
    subgenero: libroInfo.subgenero,
    portadaImagePath: libroInfo.portadaImagePath,
    mes: libroInfo.mes,  
    año: libroInfo.anio,
    contenidos: contenidos.map(({ _id, tituloArticulo, resumenArticulo, paginaArticulo }) => ({
      articuloId: _id,      
      titulo_articulo: tituloArticulo,      
      resumen: resumenArticulo,
      pagina: paginaArticulo
    }))
  };
};




// CREAR UN NUEVO CONTENIDO
// Verificar que el libroId provisto exista, para no crear un documento huérfano
export const newContenidoService = async (data) => {
    const { libroId } = data;
    const libroExiste = await Libro.exists({ _id: libroId });

    if (!libroExiste){
      throw createError(400, 'No es posible crear contenido: no existe un libro asociado a este ID');
    }

    const contenido = new Contenido(data);
    return await contenido.save();
};




// ELIMINAR UN CONTENIDO
export const deleteContenidoService = async (id) => {
  const contenidoEliminado = await Contenido.findByIdAndDelete(id);

  if (!contenidoEliminado) {
    throw createError(404, `No se pudo eliminar este contenido porque no se encontró ese id`);
  }

  return contenidoEliminado;
};




// ACTUALIZAR UN CONTENIDO EXISTENTE
export const updateContenidoService = async (id, data) => {
  const contenidoupd = await Contenido.findById(id);

  if (!contenidoupd) {    
    throw createError(404, 'Contenido no encontrado');
  }

  // Actualizar los campos del libro
  Object.keys(data).forEach(key => {
    contenidoupd[key] = data[key];
  });

  return await contenidoupd.save();
};