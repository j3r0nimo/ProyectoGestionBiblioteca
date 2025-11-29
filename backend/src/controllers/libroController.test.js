import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

// 1. Importa la App de Express
import app from '../app.js';

// 2. Importa el servicio para mockearlo
import * as libroServicio from '../services/libroService.js';

// 3. Burla (mock) el módulo de servicio completo
// No queremos que el test hable con la base de datos, solo que pruebe la ruta.
vi.mock('../services/libroService.js', () => ({
  getLibroByIdService: vi.fn(),
  // ... (si probáramos POST, también haríamos mock de newLibroService)
}));

// Un ID falso que parece un ObjectId de Mongo válido (24 caracteres hex)
// Esto permite pasar el middleware 'validateObjectId'.
const mockValidMongoId = '60d0fe4f5311236168a109cb';

// Limpia los mocks antes de cada test
beforeEach(() => {
  vi.clearAllMocks();
});

// TESTS PARA LA RUTA GET /libros/:id
describe('GET /libros/:id', () => {
  it('debe retornar 200 y el libro si se encuentra', async () => {
    // 1. Arrange (Preparar)
    // Usa el ID válido
    const idTest = mockValidMongoId;
    const mockLibro = {
      _id: idTest,
      tituloLibro: 'Test de Supertest',
      portadaImagePath: 'test.jpg', // Para probar la lógica de 'buildFullUrl'
    };

    // Le decimos al mock del servicio qué debe devolver
    libroServicio.getLibroByIdService.mockResolvedValue(mockLibro);

    // 2. Act (Actuar)
    // Usa supertest para simular la petición a nuestra app
    const res = await request(app).get(`/libros/${idTest}`);

    // 3. Assert (Verificar)
    expect(res.status).toBe(200); // Código de estado
    expect(res.body.tituloLibro).toBe(mockLibro.tituloLibro); // Contenido

    // Verifica que el controlador SÍ llamó al servicio con el ID correcto
    expect(libroServicio.getLibroByIdService).toHaveBeenCalledWith(idTest);

    // Verifica que la lógica de 'portada' funciona
    expect(res.body.portada).toContain('http://');
  });

  it('debe retornar 404 si el libro no se encuentra', async () => {
    // 1. Arrange
    // Usa el ID válido (el middleware lo dejará pasar)
    const idTest = mockValidMongoId;

    // El servicio devuelve null (no encontrado)
    libroServicio.getLibroByIdService.mockResolvedValue(null);

    // 2. Act
    const res = await request(app).get(`/libros/${idTest}`);

    // 3. Assert
    expect(res.status).toBe(404); // Código 404
    // Verifica el mensaje de error que está definido en el controlador
    expect(res.body.error).toBe('Libro no encontrado');
  });

  it('debe retornar 500 si el servicio falla', async () => {
    // 1. Arrange
    // Usa el ID válido (el middleware lo dejará pasar)
    const idTest = mockValidMongoId;
    const errorMsg = 'Fallo de la base de datos';

    // Simula un error en la capa de servicio
    libroServicio.getLibroByIdService.mockRejectedValue(new Error(errorMsg));

    // 2. Act
    const res = await request(app).get(`/libros/${idTest}`);

    // 3. Assert
    expect(res.status).toBe(500); // El middleware errorHandler debe atrapar esto
    expect(res.body.error).toContain('Error al obtener el libro');
  });
});
