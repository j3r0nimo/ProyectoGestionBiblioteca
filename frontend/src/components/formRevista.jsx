import { useState } from 'react';
import { createLibro } from '../services/libros';
import api from '../services/api';

export default function FormRevista() {
    const [tituloLibro, setTituloLibro] = useState('');
    const [autor, setAutor] = useState('');
    const [issn, setIssn] = useState('');
    const [idioma, setIdioma] = useState('');
    const [editorial, setEditorial] = useState('');
    const [medidas, setMedidas] = useState('');
    const [genero, setGenero] = useState('');
    const [subgenero, setSubgenero] = useState('');
    const [anio, setAnio] = useState(0);
    const [paginas, setPaginas] = useState(0);
    const [portada, setPortada] = useState(null);
    const [errores, setErrores] = useState({})

    const validarFormulario = async () => {
        const nuevosErrores = {};

        try {
            const respuesta = await api.get(`/libros/issn/${issn}`);

            if (respuesta.data) {

                nuevosErrores.issn = "el issn ya esta en el sistema";
            }
        } catch (err) {
            if (err.response?.status !== 404) {

                nuevosErrores.issn = "Error al verificar issn";
            }
        }
        if (!issn || issn == "") nuevosErrores.issn = "ingrese issn"
        if (!tituloLibro || tituloLibro == "") nuevosErrores.tituloLibro = "ingrese titulo";
        if (!autor || autor == "") nuevosErrores.autor = "ingrese autor";
        if (!idioma) nuevosErrores.idioma = "seleccione idioma";
        if (!editorial || editorial == "") nuevosErrores.editorial = "ingrese editorial";
        if (!medidas || medidas == "") nuevosErrores.medidas = "ingrese medida";
        if (!genero || genero == "") nuevosErrores.genero = "ingrese genero";
        if (!subgenero || subgenero == "") nuevosErrores.subgenero = "ingrese subgenero";
        if (!anio || isNaN(anio)) nuevosErrores.anio = "ingrese año";
        if (!paginas || paginas <= 0 || isNaN(paginas)) nuevosErrores.paginas = "ingrese paginas";
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const esValido = await validarFormulario();
        if (!esValido) return;

        const formData = new FormData();
        formData.append('tipo', 'Revista');
        formData.append('tituloLibro', tituloLibro);
        formData.append('autor', autor);
        formData.append('issn', issn);
        formData.append('idioma', idioma);
        formData.append('editorial', editorial);
        formData.append('medidas', medidas);
        formData.append('genero', genero);
        formData.append('subgenero', subgenero);
        formData.append('anio', anio);
        formData.append('paginas', paginas);
        formData.append('portada', portada);

        try {
            await createLibro(formData);
            alert('Revista subido con éxito!');
            setTituloLibro('');
            setAutor('');
            setIssn('');
            setEditorial('');
            setMedidas('');
            setGenero('');
            setSubgenero('');
            setAnio(0);
            setPaginas(0);
            setPortada(null);
        } catch (error) {
            alert('Error al subir');
        }
    };

    return (
        <>
            <h2>Ingrese datos de Revista</h2>
            <form id="añadir" onSubmit={handleSubmit}>
                <label htmlFor="issn">ISSN:</label>
                <input
                    name="issn"
                    id="issn"
                    type="text"
                    value={issn}
                    onChange={(e) => setIssn(e.target.value)}
                /><br />

                {errores.issn && <div style={{ color: 'red' }}>{errores.issn}</div>}

                <label htmlFor="tituloLibro">Titulo:</label>
                <input
                    name="tituloLibro"
                    id="tituloLibro"
                    type="text"
                    value={tituloLibro}
                    onChange={(e) => setTituloLibro(e.target.value)}
                /><br />
                {errores.tituloLibro && <div style={{ color: 'red' }}>{errores.tituloLibro}</div>}

                <label htmlFor="autor">Autor:</label>
                <input
                    name="autor"
                    id="autor"
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                /><br />
                {errores.autor && <div style={{ color: 'red' }}>{errores.autor}</div>}

                <label htmlFor="idioma-select">Idioma:</label>
                <select id="idioma-select"
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}>
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
                    value={editorial}
                    onChange={(e) => setEditorial(e.target.value)}
                /><br />
                {errores.editorial && <div style={{ color: 'red' }}>{errores.editorial}</div>}

                <label htmlFor="medidas">Medidas:</label>
                <input
                    name="medidas"
                    id="medidas"
                    type="text"
                    value={medidas}
                    onChange={(e) => setMedidas(e.target.value)}
                /><br />
                {errores.medidas && <div style={{ color: 'red' }}>{errores.medidas}</div>}

                <label htmlFor="genero">Genero:</label>
                <input
                    name="genero"
                    id="genero"
                    type="text"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                /><br />
                {errores.genero && <div style={{ color: 'red' }}>{errores.genero}</div>}

                <label htmlFor="subgenero">Subgenero:</label>
                <input
                    name="subgenero"
                    id="subgenero"
                    type="text"
                    value={subgenero}
                    onChange={(e) => setSubgenero(e.target.value)}
                /><br />
                {errores.subgenero && <div style={{ color: 'red' }}>{errores.subgenero}</div>}

                <label htmlFor="anio">Año:</label>
                <input
                    name="anio"
                    id="anio"
                    type="number"
                    value={anio}
                    onChange={(e) => setAnio(e.target.value)}
                /><br />
                {errores.anio && <div style={{ color: 'red' }}>{errores.anio}</div>}

                <label htmlFor="paginas">Paginas:</label>
                <input
                    name="paginas"
                    id="paginas"
                    type="text"
                    value={paginas}
                    onChange={(e) => setPaginas(e.target.value)}
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