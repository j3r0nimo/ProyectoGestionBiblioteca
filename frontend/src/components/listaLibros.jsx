import TarjetaLibro from "./tarjetaLibros"

function Lista({ libros }) {
    return (
        libros.map(l =>
            <TarjetaLibro key={l._id} libro={l} />
        )
    )

}
export default Lista;