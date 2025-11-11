// Test unitario para libroService.js

// 1. Importa todo desde vitest
import { describe, it, expect, vi, beforeEach } from 'vitest';

// 2. Importa las funciones que se van a probar
import { getLibroByIdService, deleteLibroService } from './libroService.js';

// 3. Importa los modelos (solo para que vi.mock sepa qué burlar)
import Libro from '../models/libro.js';
import Contenido from '../models/contenido.js';

// Mock a los modelos de Mongoose
vi.mock('../models/libro.js', () => ({
  __esModule: true,
  default: {
    findById: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

vi.mock('../models/contenido.js', () => ({
  __esModule: true,
  default: {
    deleteMany: vi.fn(),
  },
}));

//
describe('LibroService (Tests Unitarios)', () => {
  // Antes de cada test, limpia los mocks
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Pruebas para getLibroByIdService
  describe('getLibroByIdService', () => {
    it('debe retornar un libro si se encuentra por ID', async () => {
      // 1. Arrange
      const mockLibro = { _id: '12345', tituloLibro: 'El Gran Libro de Vitest' };

      // Simula la cadena .lean()
      Libro.findById.mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockLibro),
      });

      // 2. Act
      const result = await getLibroByIdService('12345');

      // 3. Assert
      expect(result).toEqual(mockLibro);
      expect(Libro.findById).toHaveBeenCalledTimes(1);
      expect(Libro.findById).toHaveBeenCalledWith('12345');
    });

    it('debe retornar null si no se encuentra el libro', async () => {
      // 1. Arrange
      Libro.findById.mockReturnValue({
        lean: vi.fn().mockResolvedValue(null),
      });

      // 2. Act
      const result = await getLibroByIdService('id-inexistente');

      // 3. Assert
      expect(result).toBeNull();
      expect(Libro.findById).toHaveBeenCalledWith('id-inexistente');
    });
  });

  describe('deleteLibroService', () => {
    it('debe eliminar un libro y su contenido en cascada', async () => {
      // 1. Arrange
      const mockLibroEliminado = { _id: '789', tituloLibro: 'Libro a Borrar' };
      Libro.findByIdAndDelete.mockResolvedValue(mockLibroEliminado);
      Contenido.deleteMany.mockResolvedValue({ deletedCount: 5 });

      // 2. Act
      const result = await deleteLibroService('789');

      // 3. Assert
      expect(result).toEqual(mockLibroEliminado);
      expect(Libro.findByIdAndDelete).toHaveBeenCalledWith('789');
      expect(Contenido.deleteMany).toHaveBeenCalledTimes(1);
      expect(Contenido.deleteMany).toHaveBeenCalledWith({ libroId: '789' });
    });

    it('no debe llamar a deleteMany si el libro no existe', async () => {
      // 1. Arrange
      Libro.findByIdAndDelete.mockResolvedValue(null);

      // 2. Act
      const result = await deleteLibroService('404');

      // 3. Assert
      expect(result).toBeNull();
      expect(Libro.findByIdAndDelete).toHaveBeenCalledWith('404');
      expect(Contenido.deleteMany).not.toHaveBeenCalled();
    });
  });
});
