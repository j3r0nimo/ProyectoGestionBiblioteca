import * as contenidoServicio from '../services/contenidoService.js';
import createError from 'http-errors';
import { buildFullUrl, buildPaginationUrl } from '../utils/urlHelper.js'; 

// NORMAS DEL DISEÑO:
    // Estilo de función: function expression (o sea: asignar la función a una variable)
    // Ejemplo: const nombreFuncion = async () => { }
    // Error handling: a nivel de la capa del controller
    // id validation: a nivel ruta, mediante un middleware

// Lista de funciones:
    // getContenidos            RESPONDER CON LA LISTA DE TODOS LOS CONTENIDOS
    // getContenidoById         RESPONDER CON UN CONTENIDO POR SU /:id
    // getContenidoByLibro      RESPONDER CON EL CONTENIDO DE UN LIBRO EN PARTICULAR (mismo libroId)
    // newContenido             RESPONDER CON LA CREACION DE UN NUEVO CONTENIDO
    // deleteContenido          RESPONDER CON LA ELIMINACION DE UN CONTENIDO
    // updateContenido          RESPONDER CON LA ACTUALIZACION DE UN CONTENIDO EXISTENTE




// RESPONDER CON LA LISTA DE TODOS LOS CONTENIDOS
export const getContenidos = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const keyword = req.query.keyword || '';                    // ej.: ?keyword=aircraft

        const { contenidos, total, pages } = await contenidoServicio.getContenidosService(page, limit, keyword);
      

        res.status(200).json({
        success: true,
        data: contenidos,
        meta: {
            total,
            page,
            pages,
            prevPage: page > 1 ? buildPaginationUrl(req, page - 1, limit, keyword) : null,

            nextPage: page < pages ? buildPaginationUrl(req, page + 1, limit, keyword) : null,

            hasPrev: page > 1,            // bool. Asi el front sabe si usar el botón "PREVIO" 

            hasNext: page < pages         // bool. Asi el front sabe si usar el botón "NEXT"
        }
        });
        
    } catch (err) {
        console.error('Error al obtener el listado de contenidos:', err);
        return next(createError(500, 'Error al obtener el listado de contenidos'));
    }
};




// RESPONDER CON UN CONTENIDO POR SU /:id
export const getContenidoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contenido = await contenidoServicio.getContenidoByIdService(id);

        res.status(200).json(contenido);

    } catch (error) {
        return next(error);
    }
};




// RESPONDER CON EL CONTENIDO DE UN LIBRO EN PARTICULAR (mismo libroId)
export const getContenidoByLibro = async (req, res, next) => {
    try {
        const { libroId } = req.params;
        const contenidoLibro = await contenidoServicio.getContenidoByLibroService(libroId);      
       
        // Al responder, añadir la url a la imagen de la tapa del libro
        const responseData = {
        ...contenidoLibro,
        portadaImagePath: buildFullUrl(req, contenidoLibro.portadaImagePath)
        };
      
        res.status(200).json(responseData);
    } catch (error) {
        return next(error);
    }
};




// RESPONDER CON LA CREACION DE UN NUEVO CONTENIDO
export const newContenido = async (req, res, next) => {
    try {
        const data = req.body;
        const contenidoNuevo = await contenidoServicio.newContenidoService(data);
        res.status(201).json(contenidoNuevo);
    } catch (error) {
        console.error('Error al crear el contenido', error);

        if (error.name === 'ValidationError') {
            // Specific error for validation failures                       
            return next(error);     // errorHandler.js 
        }

        return next(error);         // errorHandler.js
    }
};




// RESPONDER CON LA ELIMINACION DE UN CONTENIDO
export const deleteContenido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contenidoEliminado = await contenidoServicio.deleteContenidoService(id);

    console.log(`Contenido con ID ${contenidoEliminado._id} eliminado`);
    res.status(200).json({ 
      mensaje: 'Contenido correctamente eliminado.',
      id: contenidoEliminado._id,
      titulo: contenidoEliminado.tituloArticulo
    });
  } catch (error) {
    next(error); 
  }
};




// RESPONDER CON LA ACTUALIZACION DE UN CONTENIDO EXISTENTE
export const updateContenido = async (req, res, next) => {
    try {
        const { id } = req.params;        
        
        const updatedContenido = await contenidoServicio.updateContenidoService(id, req.body);
       
        res.status(200).json(updatedContenido);
    } catch (error) {
        return next(error);
    }
};