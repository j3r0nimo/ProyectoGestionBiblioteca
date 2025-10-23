import mongoose from 'mongoose';
import createError from 'http-errors';
// Esta version permite mayor flexibilidad
// porque no solo trabaja con /:id
// sino también con versiones como /:clienteId

export const validateObjectId = (paramName = 'id') =>{

    return (req, res, next) =>{
        const id = req.params[paramName];

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, `Este Id no es válido: ${id}`));
        }

        next()
    };
};
