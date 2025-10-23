import mongoose from 'mongoose';


const contenidoSchema = new mongoose.Schema({
    libroId: {
        type: mongoose.Schema.Types.ObjectId,       
        ref: 'Libro',
        required: [true, 'El contenido debe estar asociado a una publicación']
    },
    tituloArticulo: {
        type: String,
        required: [true, 'Ingrese el título del artículo'],
        trim: true
    },
    resumenArticulo: {
        type: String,
        required: [true, 'Ingrese un resumen'],
        trim: true
    },
    paginaArticulo: {
        type: Number,
        required: [true, 'Ingrese el numero de la página inicial del artículo']
    },
    },{
        collection: 'contenidos',
        timestamps: true
    }
);

export default mongoose.model('Contenido', contenidoSchema);