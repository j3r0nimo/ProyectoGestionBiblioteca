import express from 'express';
import connectDB from './db/db.js';
import librosRutas from '../src/routes/libroRoutes.js';
import contenidosRutas from '../src/routes/contenidoRoutes.js';
import apiInfoRoutes from '../src/routes/apiInfoRoutes.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import { notFound } from '../src/middlewares/notFound.js';

// para servir las imágenes
import { fileURLToPath} from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app: instancia de express
const app = express();

// app: para servir json content
app.use(express.json());

// app: para servir las imágenes
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); 


// rutas

app.use('/libros', librosRutas);
app.use('/contenidos', contenidosRutas);

// Ruta para la raiz

/*
app.get('/', (req, res) => {
    res.send('Skynet is fully operational.');
});
*/

app.use('/', apiInfoRoutes);

// Middleware Error 404
app.use(notFound);

// Middleware para administración centralizada de errores
// Must be the last middleware
// DESPUES de las rutas, justo antes del inicio del servidor
app.use(errorHandler);


// inicio del servidor
(async() => {
    try{
        await connectDB();
        const PORT = process.env.BACK_PORT || process.env.PORT || 3000;        
        app.listen(PORT, () => {
            console.log(`Skynet is fully operational at http://localhost:${PORT}`);
        });        
    } catch(error) {
        console.error('Skynet no permite la conección...', error);
    }
})();