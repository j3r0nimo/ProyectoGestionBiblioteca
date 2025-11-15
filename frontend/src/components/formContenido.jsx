import { useState, useEffect } from 'react';

const formContenidoInicial = {
    tituloArticulo: '',
    resumenArticulo: '',
    paginaArticulo: 0
};

export default function FormularioContenido({ itemToEdit, onSave, onCancel }) {

    const [formData, setFormData] = useState(formContenidoInicial);
    const [errores, setErrores] = useState({});

    const editingId = itemToEdit ? itemToEdit.articuloId : null;

    useEffect(() => {
        if (itemToEdit) {
            setFormData({
                tituloArticulo: itemToEdit.titulo_articulo,
                resumenArticulo: itemToEdit.resumen,
                paginaArticulo: itemToEdit.pagina
            });
        } else {
            setFormData(formContenidoInicial);
        }
        setErrores({});
    }, [itemToEdit]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!formData.tituloArticulo || formData.tituloArticulo.trim() === "") {
            nuevosErrores.tituloArticulo = "Ingrese un título";
        }
        if (!formData.resumenArticulo || formData.resumenArticulo.trim() === "") {
            nuevosErrores.resumenArticulo = "Ingrese un resumen";
        }
        if (!formData.paginaArticulo || isNaN(formData.paginaArticulo) || formData.paginaArticulo <= 0) {
            nuevosErrores.paginaArticulo = "Ingrese un número de página válido";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) {
            return; 
        }
        
        onSave(formData, editingId);
    };

    return (
        <>
            <h2>{editingId ? "Editar" : "Añadir"} Contenido</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título del Artículo:</label>
                    <input
                        type="text"
                        name="tituloArticulo"
                        value={formData.tituloArticulo}
                        onChange={handleFormChange}
                    />
                    {errores.tituloArticulo && <div style={{ color: 'red' }}>{errores.tituloArticulo}</div>}
                </div>
                <div>
                    <label>Resumen:</label>
                    <textarea
                        name="resumenArticulo"
                        value={formData.resumenArticulo}
                        onChange={handleFormChange}
                    />
                    {errores.resumenArticulo && <div style={{ color: 'red' }}>{errores.resumenArticulo}</div>}
                </div>
                <div>
                    <label>Página:</label>
                    <input
                        type="number"
                        name="paginaArticulo"
                        value={formData.paginaArticulo}
                        onChange={handleFormChange}
                    />
                    {errores.paginaArticulo && <div style={{ color: 'red' }}>{errores.paginaArticulo}</div>}
                </div>
                <button type="submit" className="btn-formulario">
                    {editingId ? "Actualizar" : "Guardar"}
                </button>
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </form>
        </>
    );
}