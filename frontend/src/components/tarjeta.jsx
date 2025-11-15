import { useRef } from "react";
import { Link } from "react-router-dom";

function Tarjeta({ libro }) {
    const ticketRef = useRef();

    return (
        <div className="tarjeta">
            <div ref={ticketRef}>
                <Link to={`/libros/${libro._id}`}>
                    <h3>{libro.tituloLibro}</h3>
                </Link>
                <hr />
                <img src={libro.portada} />
            </div>
        </div>
    );
}

export default Tarjeta;