export default function LibroInfo({ libro }) {
    return (

        <div>
            <h1>{libro.tituloLibro}</h1>
            <img src={libro.portada} alt={libro.tituloLibro} style={{ maxWidth: '300px' }} />
            <p><strong>Tipo:</strong> {libro.tipo}</p>
            <p><strong>Autor:</strong> {libro.autor}</p>
            <p><strong>Editorial:</strong> {libro.editorial}</p>
            <p><strong>Idioma:</strong> {libro.idioma}</p>
            <p><strong>Género:</strong> {libro.genero}</p>
            <p><strong>SubGenero:</strong> {libro.subgenero}</p>
            <p><strong>Paginas:</strong> {libro.paginas}</p>
            <p><strong>Año:</strong> {libro.anio}</p>
            <p><strong>Medidas:</strong> {libro.medidas}</p>
            <p><strong>ISBN:</strong> {libro.isbn || 'N/A'}</p>
            <p><strong>ISSN:</strong> {libro.issn || 'N/A'}</p>
        </div>
    );
}