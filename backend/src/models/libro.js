import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['Libro','Revista','Manual','Folleto','Catalogo'],
        required: true
    },
    isbn: {
        type: String,
        trim: true,
        required: function () {
            // Conditionally require ISBN if it's a 'Libro' and 'anio >= 1970'
            return this.tipo === 'Libro' && this.anio >= 1970;
        },
        validate: {
            validator: function (v) {
            // If 'isbn' is required (because 'tipo' is 'Libro' and 'anio >= 1970')
            if (this.tipo === 'Libro' && this.anio >= 1970) {
                return !!v;  // Ensure 'isbn' is not empty
            }
            return true;  // For other cases, no validation required
            },
            message: 'El ISBN es obligatorio si la publicación es un libro posterior a 1970'
        },
        unique: true,
        sparse: true
    },
    issn: {
        type: String,
        trim: true,
        required: function () {
            // Conditionally require ISSN if it's a 'Revista' and 'anio >= 1971'
            return this.tipo === 'Revista' && this.anio >= 1971;
        },
        validate: {
            validator: function (v) {
            // If 'issn' is required (because 'tipo' is 'Revista' and 'anio >= 1971')
            if (this.tipo === 'Revista' && this.anio >= 1971) {
                return !!v;  // Ensure 'issn' is not empty
            }
            return true;  // For other cases, no validation required
            },
            message: 'El ISSN es obligatorio si la publicación es una revista posterior a 1971'
        }        
    },
    tituloLibro: {
        type: String,
        required: [true, 'Ingrese el título de la publicación'],
        trim: true
    },
    autor: {
        type: String,
        required: [true, 'Ingrese un autor'],
        trim: true
    },
    idioma: {
        type: String,
        enum: {
            values: ['Español','Ingles','Portugues','Griego'],
            message: 'Español, Ingles, Portugues, Griego'
        },
        required: [true, 'Seleccione un idioma']
    },
    editorial: {
        type: String,
        required: [true, 'Ingrese una editorial'],
        trim: true
    },
    medidas: {
        type: String,
        required: [true, 'Ingrese medidas en cms: 22.5 x 12.8'],
        trim:true
    },
    genero: {
        type: String,
        required: [true, 'Ingrese un género'],
        trim: true
    },
    subgenero: {
        type: String,
        required: [true, 'Ingrese un subgenero, en función del género'],
        trim: true
    },
    mes: {
        type: String,
        enum: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        required: false
    },
    anio: {
        type: Number,
        required: [true, 'Ingrese un año a cuatro dígitos']
    },
    paginas: {
        type: Number,
        required: [true, 'Ingrese cantidad de páginas']
    },
    portadaImagePath: {
        type: String,
        required: false,
        trim: true
    },
    },{
        collection: 'libros',
        timestamps: true
    }
);

export default mongoose.model('Libro', libroSchema);