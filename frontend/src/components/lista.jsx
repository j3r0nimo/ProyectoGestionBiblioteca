import Tarjeta from "./tarjeta"

function Lista({ libros }) {
    return (
        libros.map(l =>
            <Tarjeta key={l._id} libro={l} />
        )
    )

}
export default Lista;