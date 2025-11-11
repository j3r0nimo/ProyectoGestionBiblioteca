import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

// 1. Importa la App de Express
import app from '../app.js';

// 2. Importa el servicio que el controlador va a llamar para poder mockearlo
import * as libroServicio from '../services/libroService.js';

// 3. Burlamos (mock) el módulo de servicio completo
// No queremos que el test hable con la base de datos, solo que pruebe la RUTA.
vi.mock('../services/libroService.js', () => ({
  // Burlamos solo las funciones que nuestro controlador usa
  getLibroByIdService: vi.fn(),
  // si se probara POST, también haríamos mock de newLibroService
}));

// Limpia los mocks antes de cada test
beforeEach(() => {
  vi.clearAllMocks();
});

// TESTS PARA LA RUTA GET /libros/:id
describe('GET /libros/:id', () => {
  it('debe retornar 200 y el libro si se encuentra', async () => {
    // 1. Arrange (Preparar)
    const idTest = '12345';
    const mockLibro = {
      _id: idTest,
      tituloLibro: 'Test de Supertest',
      portadaImagePath: 'test.jpg', // Añadimos esto para probar la lógica de 'buildFullUrl'
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
    // El controlador getLibroById añade la URL completa
    expect(res.body.portada).toContain('http://');
  });

  it('debe retornar 404 si el libro no se encuentra', async () => {
    // 1. Arrange
    const idTest = 'id-falso';
    // El servicio devuelve null (no encontrado)
    libroServicio.getLibroByIdService.mockResolvedValue(null);

    // 2. Act
    const res = await request(app).get(`/libros/${idTest}`);

    // 3. Assert
    expect(res.status).toBe(404); // Código 404
    // Verifica el mensaje de error que está definidido en el controlador
    expect(res.body.message).toBe('Libro no encontrado');
  });

  it('debe retornar 500 si el servicio falla', async () => {
    // 1. Arrange
    const idTest = 'id-error';
    const errorMsg = 'Fallo de la base de datos';
    // Simula un error en la capa de servicio
    libroServicio.getLibroByIdService.mockRejectedValue(new Error(errorMsg));

    // 2. Act
    const res = await request(app).get(`/libros/${idTest}`);

    // 3. Assert
    expect(res.status).toBe(500); // El middleware errorHandler debe atrapar esto
    expect(res.body.message).toContain('Error al obtener el libro');
  });
});
