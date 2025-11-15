import { useEffect, useState } from "react";
import { getLibros } from "../services/libros";
import Lista from "../components/lista";
function ListLibros() {
    const [libros, setLibros] = useState([])
    const [page, setPage] = useState(1)
    const [meta, setMeta] = useState(null)

    useEffect(() => {
        getLibros(page).then(res => {
            setLibros(res.data);
            setMeta(res.meta)
        });
    }, [page])

    const nextPage = () => {
        if (meta?.hasNext) setPage(page + 1);
    }
    const prevPage = () => {
        if (meta?.hasPrev) setPage(page - 1);
    }
    return (
        <>
            <ul className="lista">
                {libros.length === 0 ? (
                    <p>no hay libros</p>
                ) : (
                    <Lista libros={libros}/>
                )
                }

            </ul>
            <button onClick={prevPage} disabled={!meta?.hasPrev}>Anterior</button>
            <button onClick={nextPage} disabled={!meta?.hasNext}>Siguiente</button>

        </>


    )
}

export default function Libreria() {
    return <ListLibros />
}