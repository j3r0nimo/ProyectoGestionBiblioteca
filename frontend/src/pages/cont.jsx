import { useEffect, useState } from "react";
import { getContenidos } from "../services/contenidos";
function ListLibros() {
    const [cont, setCont] = useState([])
    const [page, setPage] = useState(1)
    const [meta, setMeta] = useState(null)

    useEffect(() => {
        getContenidos(page).then(res => {
            setCont(res.data);
            setMeta(res.meta);
            console.log(res.data);
            
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
            <ul>
                {cont.map(c => <li key={c._id}>{c.tituloArticulo}</li>)}
            </ul>
            <button onClick={prevPage} disabled={!meta?.hasPrev}>Anterior</button>
            <button onClick={nextPage} disabled={!meta?.hasNext}>Siguiente</button>

        </>


    )
}

export default function Contenidos() {
    return <ListLibros />
}