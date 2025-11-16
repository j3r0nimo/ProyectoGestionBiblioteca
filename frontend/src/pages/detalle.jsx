import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLibroById, deleteLibro } from '../services/libros';
import { getContenidoPorLibro, createContenido, updateContenido, deleteContenido } from '../services/contenidos';
import LibroInfo from '../components/infoDet';
import ListaContenidos from '../components/listaContenido';
import FormularioContenido from '../components/formContenido';

export default function LibroDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [libro, setLibro] = useState(null);
    const [contenido, setContenido] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [itemParaEditar, setItemParaEditar] = useState(null);

    useEffect(() => {
        setLoading(true);
        getLibroById(id)
            .then(setLibro)
            .catch(console.error);

        getContenidoPorLibro(id)
            .then(data => setContenido(data.contenidos || []))
            .catch(() => setContenido([]))
            .finally(() => setLoading(false));
    }, [id]);

    // funcion para borrar libro
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
    // funcion para borrar el contenido relacionado al libro
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
    // actualiza o sube el contenido, dependiendo de que se le pida
    const handleSaveContenido = async (formData, editingId) => {
        try {
            if (editingId) {
                const dbResponse = await updateContenido(editingId, formData);
                const dataNormalizada = {
                    articuloId: dbResponse._id,
                    titulo_articulo: dbResponse.tituloArticulo,
                    resumen: dbResponse.resumenArticulo,
                    pagina: dbResponse.paginaArticulo
                };
                setContenido(contenido.map(item =>
                    item.articuloId === editingId ? dataNormalizada : item
                ));
            } else {
                const dataConLibroId = { ...formData, libroId: id };
                const dbResponse = await createContenido(dataConLibroId);
                const dataNormalizada = {
                    articuloId: dbResponse._id,
                    titulo_articulo: dbResponse.tituloArticulo,
                    resumen: dbResponse.resumenArticulo,
                    pagina: dbResponse.paginaArticulo
                };
                setContenido([...contenido, dataNormalizada]);
            }
            setMostrarFormulario(false);
            setItemParaEditar(null);
        } catch (error) {
            alert("Error al guardar el contenido.");
        }
    };
    // guarda el contenido para editar y muestra el formulario
    const handleEditClick = (item) => {
        setItemParaEditar(item);
        setMostrarFormulario(true);
    };
    // funcion para mostrar el formulario en caso de que se toque el boton editar contenido
    const handleToggleForm = (visible, item = null) => {
        setMostrarFormulario(visible);
        setItemParaEditar(item);
    };

    if (loading) return <h2>Cargando...</h2>;
    if (!libro) return <h2>Libro no encontrado</h2>;

    return (
        <div>
            <LibroInfo libro={libro} />
            <button
                onClick={handleDeleteLibro}
                style={{ backgroundColor: '#b80000', color: 'white', borderColor: 'transparent' }}>
                Eliminar Libro
            </button>

            <Link to={`/formulario/editar/${libro._id}`}>
                <button>
                    Editar Libro
                </button>
            </Link>
            <hr />

            {!mostrarFormulario && (
                <button onClick={() => handleToggleForm(true, null)}>
                    Añadir Nuevo Contenido
                </button>
            )}

            {mostrarFormulario && (
                <FormularioContenido itemToEdit={itemParaEditar} onSave={handleSaveContenido} onCancel={() => handleToggleForm(false, null)} />
            )}

            <hr />

            <ListaContenidos contenido={contenido} onEdit={handleEditClick} onDelete={handleDeleteContenido} />

            <hr />
            <Link to="/">Volver al listado</Link>
        </div>
    );
}