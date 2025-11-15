import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLibroById, deleteLibro } from '../services/libros';
import { 
    getContenidoPorLibro, 
    createContenido, 
    updateContenido, 
    deleteContenido 
} from '../services/contenidos';

const formContenidoInicial = {
    tituloArticulo: '',
    resumenArticulo: '',
    paginaArticulo: 0
};

export default function LibroDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [libro, setLibro] = useState(null);
    const [contenido, setContenido] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState(formContenidoInicial);
    const [editingId, setEditingId] = useState(null);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        setLoading(true);
        getLibroById(id).then(setLibro).catch(console.error);
        getContenidoPorLibro(id)
            .then(data => setContenido(data.contenidos || []))
            .catch(() => setContenido([]))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDeleteLibro = async () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este libro? Esta acción también eliminará su contenido asociado.")) {
            try {
                await deleteLibro(libro._id);
                alert("Libro eliminado exitosamente.");
                navigate('/'); 
            } catch (error) {
                alert("Error al eliminar el libro.");
            }
        }
    };

    const handleDeleteContenido = async (contenidoId) => {
        if (window.confirm("¿Eliminar este artículo?")) {
            try {
                await deleteContenido(contenidoId);
                setContenido(contenido.filter(item => item.articuloId !== contenidoId));
            } catch (error) {
                alert("Error al eliminar el artículo.");
            }
        }
    };

    const handleContenidoSubmit = async (e) => {
        try {
            if (editingId) {
                const dataActualizada = await updateContenido(editingId, formData);
                setContenido(contenido.map(item => 
                    item.articuloId === editingId ? dataActualizada : item
                ));
            } else {
                const dataConLibroId = { ...formData, libroId: id };
                const nuevoContenido = await createContenido(dataConLibroId);
                setContenido([...contenido, nuevoContenido]);
            }
            
            setFormData(formContenidoInicial);
            setEditingId(null);
            setMostrarFormulario(false);
        } catch (error) {
            alert("Error al guardar el contenido.");
        }
    };

    const handleEditClick = (item) => {
        setEditingId(item.articuloId);
        setFormData({
            tituloArticulo: item.titulo_articulo,
            resumenArticulo: item.resumen,
            paginaArticulo: item.pagina
        });
        setMostrarFormulario(true); 
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (loading) return <h2>Cargando...</h2>;
    if (!libro) return <h2>Libro no encontrado</h2>;

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

            <hr />
            <button 
                onClick={handleDeleteLibro} 
                style={{ backgroundColor: '#b80000', color: 'white', borderColor: 'transparent' }}
            >
                Eliminar Libro
            </button>
            <hr />
            
            {!mostrarFormulario && (
                <button onClick={() => setMostrarFormulario(true)}>
                    Añadir Nuevo Contenido
                </button>
            )}

            {mostrarFormulario && (
                <>
                    <h2>{editingId ? "Editar" : "Añadir"} Contenido</h2>
                    <form onSubmit={handleContenidoSubmit}>
                        <div>
                            <label>Título del Artículo:</label>
                            <input 
                                type="text" 
                                name="tituloArticulo" 
                                value={formData.tituloArticulo} 
                                onChange={handleFormChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label>Resumen:</label>
                            <textarea 
                                name="resumenArticulo" 
                                value={formData.resumenArticulo} 
                                onChange={handleFormChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label>Página:</label>
                            <input 
                                type="number" 
                                name="paginaArticulo" 
                                value={formData.paginaArticulo} 
                                onChange={handleFormChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn-formulario">
                            {editingId ? "Actualizar" : "Guardar"}
                        </button>
                        
                        {/* 6. Botón "Cancelar" unificado */}
                        <button type="button" onClick={() => { 
                            setEditingId(null); 
                            setFormData(formContenidoInicial); 
                            setMostrarFormulario(false); 
                        }}>
                            Cancelar
                        </button>
                    </form>
                </>
            )}

            <hr />

            {/* --- SECCIÓN 3: LISTA DE CONTENIDOS --- */}
            <h2>Artículos y Contenidos</h2>
            {contenido.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {contenido.map(item => (
                        <li key={item.articuloId} style={{ borderBottom: '1px solid #444', padding: '10px' }}>
                            <h4>{item.titulo_articulo} (Pág. {item.pagina})</h4>
                            <p>{item.resumen}</p>
                            <button onClick={() => handleEditClick(item)}>Editar</button>
                            <button onClick={() => handleDeleteContenido(item.articuloId)}>Borrar</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay artículos o contenido asociado a esta publicación.</p>
            )}

            <hr />
            <Link to="/">Volver al listado</Link>
        </div>
    );
}