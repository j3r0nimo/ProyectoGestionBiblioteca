import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import librosRutas from '../src/routes/libroRoutes.js';
import contenidosRutas from '../src/routes/contenidoRoutes.js';
import apiInfoRoutes from '../src/routes/apiInfoRoutes.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import { notFound } from '../src/middlewares/notFound.js';

// para servir las imágenes
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app: instancia de express
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
// app: para servir json content
app.use(express.json());

// app: para servir las imágenes
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// rutas
app.use('/libros', librosRutas);
app.use('/contenidos', contenidosRutas);
app.use('/', apiInfoRoutes);

// Middleware Error 404
app.use(notFound);

// Middleware para administración centralizada de errores
app.use(errorHandler);

// Solo inicia el servidor y conecta a la DB si NO se está en modo "test".
if (!process.env.VITEST) {
  // inicio del servidor
  (async () => {
    try {
      console.log('Conectando a MongoDB con URI:', process.env.MONGODB_URI);
      await connectDB();
      const PORT = process.env.BACK_PORT || process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Skynet is fully operational at http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Skynet no permite la conección...', error);
    }
  })();
}
// exporta la app para futuros tests
export default app;
