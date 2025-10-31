import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Skynet is fully operational.',
    
    variables_GET: '&page=1, &limit=2, &keyword=(busca en tituloLibro, genero, subgenero & tituloArticulo, resumenArticulo)',
   
    crud: 'GET, GET:id, POST:id, PUT:id, DELETE:id',
    endpoints: {
      Libros: {
        acceso: 'http://localhost:3000/libros',
        descripcion: 'Listados de libros.',
        ejemplo: 'http://localhost:3000/libros?page=1&limit=15&keyword=naval',
        coleccion: 'tipo, isbn, issn, tituloLibro, autor, idioma, editorial, medidas, genero, subgenero, mes, anio, paginas, portadaImagePath'
      },
      Contenidos: {
        acceso: 'http://localhost:3000/contenidos',
        descripcion: 'Contenido & artículos de todos los libros.',
        ejemplo: 'http://localhost:3000/contenidos?page=1&limit=15&keyword=malvinas',
        coleccion: 'libroId, tituloArticulo, resumenArticulo, paginaArticulo'
      }
    },
    Libro_por_ID: {
        acceso: 'http://localhost:3000/libros/:id',
        descripcion: 'Detalle por libro.',
        ejemplo: 'http://localhost:3000/libros/687d986fb9dc0e83b054974d'
      },
    Contenido_por_ID: {
        acceso: 'http://localhost:3000/contenidos/:id',
        descripcion: 'Un contenido individual.',
        ejemplo: 'http://localhost:3000/contenidos/6886c9694c2b582f7a768b1c'
      },      
    Contenido_por_Libro: {
        acceso: 'http://localhost:3000/contenidos/libro/:id',
        descripcion: 'Contenido & artículos por libro.',
        ejemplo: 'http://localhost:3000/contenidos/libro/687d9789b9dc0e83b0549747'
      }    
  });
});

export default router;
