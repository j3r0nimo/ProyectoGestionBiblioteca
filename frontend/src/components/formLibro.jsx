import { useState } from 'react';
import { createLibro } from '../services/libros';
import api from '../services/api';

// <<< 1. Define el estado inicial en un objeto
const initialState = {
    tituloLibro: '',
    autor: '',
    isbn: '',
    idioma: '',
    editorial: '',
    medidas: '',
    genero: '',
    subgenero: '',
    anio: 0,
    paginas: 0,
};

export default function FormLibro() {
    const [formData, setFormData] = useState(initialState);
    const [portada, setPortada] = useState(null);
    const [errores, setErrores] = useState({});

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validarFormulario = async () => {
        const nuevosErrores = {};

        try {
            const respuesta = await api.get(`/libros/isbn/${formData.isbn}`);
            if (respuesta.data) {
                nuevosErrores.isbn = "el isbn ya esta en el sistema";
            }
        } catch (err) {
            if (err.response?.status !== 404) {
                nuevosErrores.isbn = "Error al verificar isbn"; 
            }
        }

        if (!formData.isbn || formData.isbn === "") nuevosErrores.isbn = "ingrese isbn"
        if (!formData.tituloLibro || formData.tituloLibro === "") nuevosErrores.tituloLibro = "ingrese titulo";
        if (!formData.autor || formData.autor === "") nuevosErrores.autor = "ingrese autor";
        if (!formData.idioma) nuevosErrores.idioma = "seleccione idioma";
        if (!formData.editorial || formData.editorial === "") nuevosErrores.editorial = "ingrese editorial";
        if (!formData.medidas || formData.medidas === "") nuevosErrores.medidas = "ingrese medida";
        if (!formData.genero || formData.genero === "") nuevosErrores.genero = "ingrese genero";
        if (!formData.subgenero || formData.subgenero === "") nuevosErrores.subgenero = "ingrese subgenero";
        if (!formData.anio || isNaN(formData.anio)) nuevosErrores.anio = "ingrese año";
        if (!formData.paginas || isNaN(formData.paginas) || formData.paginas <= 0) nuevosErrores.paginas = "ingrese paginas";

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const esValido = await validarFormulario();
        if (!esValido) return;

        const payload = new FormData(); 
        payload.append('tipo', 'Libro');
        Object.keys(formData).forEach(key => {
            payload.append(key, formData[key]);
        });

        payload.append('portada', portada);

        try {
            await createLibro(payload);
            alert('¡Libro subido con éxito!');
            setFormData(initialState);
            setPortada(null);
            setErrores({});
            event.target.reset();
        } catch (error) {
            alert('Error al subir el libro');
        }
    };

    return (
        <>
            <h2>Ingrese datos de Libro</h2>
            <form id="añadir" onSubmit={handleSubmit}>
                <label htmlFor="isbn">ISBN:</label>
                <input
                    name="isbn"
                    id="isbn"
                    type="text"
                    value={formData.isbn}
                    onChange={handleFormChange}
                /><br />
                {errores.isbn && <div style={{ color: 'red' }}>{errores.isbn}</div>}

                <label htmlFor="tituloLibro">Titulo:</label>
                <input
                    name="tituloLibro"
                    id="tituloLibro"
                    type="text"
                    value={formData.tituloLibro}
                    onChange={handleFormChange}
                /><br />
                {errores.tituloLibro && <div style={{ color: 'red' }}>{errores.tituloLibro}</div>}

                <label htmlFor="autor">Autor:</label>
                <input
                    name="autor"
                    id="autor"
                    type="text"
                    value={formData.autor}
                    onChange={handleFormChange}
                /><br />
                {errores.autor && <div style={{ color: 'red' }}>{errores.autor}</div>}

                <label htmlFor="idioma-select">Idioma:</label>
                <select
                    id="idioma-select"
                    name="idioma"
                    value={formData.idioma}
                    onChange={handleFormChange}>
                    <option value="">-Elija una opcion-</option>
                    <option value="Español">Español</option>
                    <option value="Ingles">Ingles</option>
                    <option value="Portugues">Portugues</option>
                    <option value="Griego">Griego</option>
                </select><br />
                {errores.idioma && <div style={{ color: 'red' }}>{errores.idioma}</div>}

                <label htmlFor="editorial">Editorial:</label>
                <input
                    name="editorial"
                    id="editorial"
                    type="text"
                    value={formData.editorial}
                    onChange={handleFormChange}
                /><br />
                {errores.editorial && <div style={{ color: 'red' }}>{errores.editorial}</div>}

                <label htmlFor="medidas">Medidas:</label>
                <input
                    name="medidas"
                    id="medidas"
                    type="text"
                    value={formData.medidas}
                    onChange={handleFormChange}
                /><br />
                {errores.medidas && <div style={{ color: 'red' }}>{errores.medidas}</div>}

                <label htmlFor="genero">Genero:</label>
                <input
                    name="genero"
                    id="genero"
                    type="text"
                    value={formData.genero}
                    onChange={handleFormChange}
                /><br />
                {errores.genero && <div style={{ color: 'red' }}>{errores.genero}</div>}

                <label htmlFor="subgenero">Subgenero:</label>
                <input
                    name="subgenero"
                    id="subgenero"
                    type="text"
                    value={formData.subgenero}
                    onChange={handleFormChange}
                /><br />
                {errores.subgenero && <div style={{ color: 'red' }}>{errores.subgenero}</div>}

                <label htmlFor="anio">Año:</label>
                <input
                    name="anio"
                    id="anio"
                    type="number"
                    value={formData.anio}
                    onChange={handleFormChange}
                /><br />
                {errores.anio && <div style={{ color: 'red' }}>{errores.anio}</div>}

                <label htmlFor="paginas">Paginas:</label>
                <input
                    name="paginas"
                    id="paginas"
                    type="number"
                    value={formData.paginas}
                    onChange={handleFormChange}
                /><br />
                {errores.paginas && <div style={{ color: 'red' }}>{errores.paginas}</div>}


                <label htmlFor="portada">Portada:</label>
                <input
                    type="file"
                    id="portada"
                    name="portada"
                    accept="image/*"
                    onChange={(e) => setPortada(e.target.files[0])}
                />

                <div>
                    <button type="submit" form="añadir">Añadir</button>
                </div>
            </form>
        </>
    );
}