import * as libroServicio from '../services/libroService.js';
import createError from 'http-errors';
import { buildFullUrl, buildPaginationUrl } from '../utils/urlHelper.js';                                                  

// NORMAS DEL DISEÑO:
    // Estilo de función: function expression (o sea: asignar la función a una variable)
    // Ejemplo: const nombreFuncion = async () => { }
    // Error handling: a nivel de la capa del controller
    // id validation: a nivel ruta, mediante un middleware

// Lista de funciones:
    // getLibros                RESPONDER CON LA LISTA DE TODOS LOS LIBROS
    // getLibroById             RESPONDER CON UN LIBRO POR SU /:id
    // newLibro                 RESPONDER CON LA CREACION DE UN NUEVO LIBRO
    // deleteLibro              RESPONDER CON LA ELIMINACION DE UN LIBRO
    // updateLibro              RESPONDER CON LA ACTUALIZACION DE UN LIBRO EXISTENTE




// RESPONDER CON LA LISTA DE TODOS LOS LIBROS
export const getLibros = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const keyword = req.query.keyword || '';                        // ej.: ?keyword=aircraft

        const { libros, total, pages } = await libroServicio.getLibrosService(page, limit, keyword);       

        // Construcción de la URL para las imágenes
        const librosWithFullPortada = libros.map(libro => ({
        ...libro,
        portada: buildFullUrl(req, libro.portadaImagePath)
        }));           

        res.status(200).json({
        success: true,
        data: librosWithFullPortada,
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
        console.error('Error al obtener el listado de libros:', err);        
        return next(createError(500, 'Error al obtener el listado de libros'));
    }
};




// RESPONDER CON UN LIBRO POR SU /:id
export const getLibroById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const libro = await libroServicio.getLibroByIdService(id);

        if (!libro) {
            return next(createError(404, 'Libro no encontrado'));          
        }              

        // Al responder, añadir la url a la imagen de la tapa del libro
        const responseData = {
        ...libro,        
        portada: buildFullUrl(req, libro.portadaImagePath)
        };

        res.status(200).json(responseData);
    } catch (error) {
        return next(createError(500, `Error al obtener el libro. ${error.message}`));
    }
};





// RESPONDER CON LA CREACION DE UN NUEVO LIBRO
export const newLibro = async (req, res, next) => {
    try {
        const data = req.body;
        const libroNuevo = await libroServicio.newLibroService(data);
        res.status(201).json(libroNuevo);
    } catch (error) {
        console.error('Error al crear el libro', error);

        if (error.name === 'ValidationError') {
            // Specific error for validation failures
            return next(createError(400, error.message));
        }

        return next(createError(500, 'Error al crear el libro'));
    }
};




// RESPONDER CON LA ELIMINACION DE UN LIBRO
export const deleteLibro = async (req, res, next) => {
    try {
        const { id } = req.params;        
        const libroEliminado = await libroServicio.deleteLibroService(id);

        if (!libroEliminado) {
            return next(createError(404, 'No se pudo eliminar este libro porque no se encontró ese id'));
        }
        console.log(`Libro con ID ${libroEliminado._id} eliminado`);
        res.status(200).json( { 
            mensaje: 'Libro correctamente eliminado.',
            id: libroEliminado._id,
            titulo: libroEliminado.tituloLibro
        });
    } catch (error) {
        return next(createError(500,`Error al eliminar el libro. ${error.message}`));
    }
};




// RESPONDER CON LA ACTUALIZACION DE UN LIBRO EXISTENTE
export const updateLibro = async (req, res, next) => {
    try {
        const { id } = req.params;        
        const updatedLibro = await libroServicio.updateLibroService(id, req.body);
        res.status(200).json(updatedLibro);
    } catch (error) {
        return next(createError(400,`Error al actualizar el libro. ${error.message}`));
    }
};