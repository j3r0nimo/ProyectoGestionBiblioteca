export default function FormRevista() {

    return (
        <>
            <h3>ingrese datos de revista:</h3>
            <form id="añadir">

                <label for="issn">ISSN:</label>
                <input name="issn" id="issn" type="text" /> <br />

                <label for="titulo">Titulo:</label>
                <input name="titulo" id="titulo" type="text" /><br />

                <label for="autor">Autor:</label>
                <input name="autor" id="autor" type="text" /><br />

                <label for="idioma">Idioma:</label>
                <input name="idioma" id="idioma" type="text" /><br />

                <label for="editor">Editorial:</label>
                <input name="editor" id="editor" type="text" /><br />

                <label for="med">Medidas:</label>
                <input name="med" id="med" type="text" /><br />

                <label for="gen">Genero:</label>
                <input name="genero" id="genero" type="text" /><br />

                <label for="subgen">Subgenero:</label>
                <input name="libro" id="libro" type="text" /><br />

                <label for="year">Año:</label>
                <input name="year" id="year" type="text" /><br />

                <label for="pag">Paginas:</label>
                <input name="pag" id="pag" type="text" /><br />

                <label for="imagen">Portada:</label>
                <input type="file" id="imagen" name="imagen" accept="image/*" />

            </form>
            <div>
                <button type="submit" form="añadir">Añadir</button>
            </div>
        </>

    );
}
