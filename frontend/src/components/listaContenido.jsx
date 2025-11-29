import ItemContenido from "./tarjetaContenido";

export default function ListaContenidos({ contenido, onEdit, onDelete }) {
    return (
        <div>
            <h2>Artículos y Contenidos</h2>
            {contenido.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {contenido.map(item => (
                        <ItemContenido 
                            key={item.articuloId} 
                            item={item}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            ) : (
                <p>No hay artículos o contenido asociado a esta publicación.</p>
            )}
        </div>
    );
}