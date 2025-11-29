// Beneficios de esta utilidad:
// Reduce la necesidad de escribir
// Pero principalmente, reduce la duplicación y la posibilidad de error que conlleva duplicar


// Construccion de la URL para un recurso estático
// En este caso, para acceder a las imágenes de la portada
// La función cubre la posibilidad de ausencia de la imagen
export const buildFullUrl = (req, relativePath) => {
  if (!relativePath) return null;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}${relativePath}`;
};



// Construccion de la URL para los enlaces de paginado
export const buildPaginationUrl = (req, page, limit, keyword) => {
  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
  const params = new URLSearchParams({
    page,
    limit,
    keyword: keyword || ''
  });
  return `${baseUrl}?${params.toString()}`;
};