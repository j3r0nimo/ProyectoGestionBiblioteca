export default function ItemContenido({ item, onEdit, onDelete }) {
    return (
        <li style={{ borderBottom: '1px solid #444', padding: '10px' }}>
            <h4>{item.titulo_articulo} (Pág. {item.pagina})</h4>
            <p>{item.resumen}</p>
            <button onClick={() => onEdit(item)}>Editar</button>
            <button onClick={() => onDelete(item.articuloId)}>Borrar</button>
        </li>
    );
}