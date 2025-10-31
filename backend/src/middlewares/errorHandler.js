export function errorHandler(err, req, res, next) {

  // Mongoose: Error de Validación 
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: Object.values(err.errors).map(e => e.message).join(', ')
    });
  }

  // Mongoose: CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `ID inválido: ${err.value}`
    });
  }

  // Mongoose: Duplicate Key (unique index violation)
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue).join(', ');
    return res.status(400).json({
      success: false,
      error: `Ya existe un registro con ese valor en el campo: ${campo}`
    });
  }

  // General error fallback
  // Se conserva el mensaje personalizado del controlador, por ejemplo:
  // return next(createError(500, 'Error al obtener el listado de libros'));
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({ 
    success: false,
    error: message 
  });
}





