import express from 'express';

import * as contenidoControlador from '../controllers/contenidoController.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';

const router = express.Router();

/*      Rule of Thumb: Always declare routes from most specific → most general:

        /productos/nuevo → specific string
        /productos/:id/editar → dynamic + specific
        /productos/:id → catch-all dynamic → ALWAYS LAST        */

router.put('/:id', validateObjectId('id'), contenidoControlador.updateContenido);       // mas específico que GET/:id, va antes de GET/:id
router.get('/libro/:libroId', validateObjectId('libroId'), contenidoControlador.getContenidoByLibro);        // Lo mas específico
router.get('/', contenidoControlador.getContenidos);                                    // Root siempre antes de los parametros dinamicos
router.post('/', contenidoControlador.newContenido);
router.delete('/:id', validateObjectId('id'), contenidoControlador.deleteContenido);    // dinámico
router.get('/:id', validateObjectId('id'), contenidoControlador.getContenidoById);      // GET dinamico siempre al final
export default router;


/*
router.get('/nuevo', renderFormularioNuevoProducto);            // Lo mas específico
router.get('/stock-bajo', renderProductosConStockBajo);
router.get('/:id/editar', renderFormularioEditarProducto);      // mas específico que /:id, va antes de /:id
router.put('/:id', actualizarProducto);                         // lo mismo que el anterior
router.get('/', renderProductosIndex);                          // Root siempre antes de los parametros dinamicos
router.post('/', crearProducto);
router.delete('/:id', eliminarProducto);                        // dinámico
router.get('/:id', renderProductoDetalle);                      // GET dinamico siempre al final
*/