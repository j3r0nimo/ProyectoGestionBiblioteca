export default function LibroInfo({ libro, onDeleteLibro }) {
    return (
        <div>
            <h1>{libro.tituloLibro}</h1>
            <img src={libro.portada} alt={libro.tituloLibro} style={{ maxWidth: '300px' }} />
            <p><strong>Autor:</strong> {libro.autor}</p>
            <p><strong>Editorial:</strong> {libro.editorial}</p>
            <p><strong>Género:</strong> {libro.genero}</p>
            <p><strong>Año:</strong> {libro.anio}</p>
            <p><strong>ISBN:</strong> {libro.isbn || 'N/A'}</p>
            <p><strong>ISSN:</strong> {libro.issn || 'N/A'}</p>
            <button 
                onClick={onDeleteLibro} 
                style={{ backgroundColor: '#b80000', color: 'white', borderColor: 'transparent' }}
            >
                Eliminar Libro
            </button>
        </div>
    );
}