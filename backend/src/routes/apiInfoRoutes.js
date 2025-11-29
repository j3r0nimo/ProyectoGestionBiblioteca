import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'La librería personal está en red.',
    
    variables_GET: '&page=1, &limit=2, &keyword=(busca en tituloLibro, genero, subgenero & tituloArticulo, resumenArticulo)',
   
    crud: 'GET, GET:id, POST:id, PUT:id, DELETE:id',
    endpoints: {
      Libros: {
        acceso: 'http://localhost:3000/libros',
        descripcion: 'Listados de libros.',        
        coleccion: 'tipo, isbn, issn, tituloLibro, autor, idioma, editorial, medidas, genero, subgenero, mes, anio, paginas, portadaImagePath'
      },
      Contenidos: {
        acceso: 'http://localhost:3000/contenidos',
        descripcion: 'Contenido & artículos de todos los libros.',        
        coleccion: 'libroId, tituloArticulo, resumenArticulo, paginaArticulo'
      }
    },
    Libro_por_ID: {
        acceso: 'http://localhost:3000/libros/:id',
        descripcion: 'Detalle por libro.'
      },
    Contenido_por_ID: {
        acceso: 'http://localhost:3000/contenidos/:id',
        descripcion: 'Un contenido individual.'
      },      
    Contenido_por_Libro: {
        acceso: 'http://localhost:3000/contenidos/libro/:id',
        descripcion: 'Contenido & artículos por libro.'
      }    
  });
});

export default router;
