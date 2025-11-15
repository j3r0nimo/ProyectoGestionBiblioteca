import { useEffect, useState } from "react";
import { getLibros } from "../services/libros";
import Lista from "../components/listaLibros";
function ListLibros() {
    const [libros, setLibros] = useState([])
    const [page, setPage] = useState(1)
    const [meta, setMeta] = useState(null)
    const [keyword, setKeyword] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getLibros(page, 10, keyword).then(res => {
            setLibros(res.data);
            setMeta(res.meta)
        });
    }, [page, keyword])

    const nextPage = () => {
        if (meta?.hasNext) setPage(page + 1);
    }
    const prevPage = () => {
        if (meta?.hasPrev) setPage(page - 1);
    }
    const handleSearch = () => {
        setKeyword(searchTerm);
        setPage(1);
    }
    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Buscar por título, género..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            <ul className="lista">
                {libros.length === 0 ? (
                    <p>no hay libros</p>
                ) : (
                    <Lista libros={libros} />
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