export default function FormRevista() {

    return (
        <>
            <h3>ingrese datos de revista:</h3>
            <form id="actualizar">
                <label>ISSN:</label>
                <input type="text" /> <br />

                <label>Titulo:</label>
                <input type="text" /><br />

                <label>Autor:</label>
                <input type="text" /><br />

                <label>Idioma:</label>
                <input type="text" /><br />

                <label>Editorial:</label>
                <input type="text" /><br />

                <label>Medidas:</label>
                <input type="text" /><br />

                <label>Genero:</label>
                <input type="text" /><br />

                <label>Subgenero:</label>
                <input type="text" /><br />

                <label>Año:</label>
                <input type="text" /><br />

                <label>Paginas:</label>
                <input type="text" /><br />

                <label for="imagen">Portada:</label>
                <input type="file" id="imagen" name="imagen" accept="image/*" />

            </form>
            <div>
                <button type="submit" form="actualizar">Actualizar usuario</button>
            </div>
        </>

    );
}
