import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLibroById } from "../services/libros";
import { FormFactory } from "../components/factory";

export default function Formulario() {
  const [formActivo, setFormActivo] = useState(null);
  const [libroAEditar, setLibroAEditar] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      setCargando(true);
      getLibroById(id)
        .then(libro => {
          setLibroAEditar(libro);
          if (libro.tipo) {
            setFormActivo(libro.tipo.toLowerCase());
          } else {
            setFormActivo('libro');
          }
        })
        .catch(err => console.error("Error al cargar libro para editar:", err))
        .finally(() => setCargando(false));
    }
  }, [id]); 

  if (cargando) {
    return <h2>Cargando editor...</h2>;
  }

  if (id) {
    return (
      <div>
        <h1>Editando: {libroAEditar?.tituloLibro || '...'}</h1>
        <hr />
        <FormFactory
          tipo={formActivo}
          libroAEditar={libroAEditar} 
        />
      </div>
    );
  }
  return (
    <div>
      <h1>Gestión de Biblioteca</h1>

      <button onClick={() => setFormActivo("libro")}>
        Subir Libro
      </button>

      <button onClick={() => setFormActivo("revista")}>
        Subir Revista
      </button>

      <button onClick={() => setFormActivo("otro")}>
        Subir otro tipo
      </button>

      <hr />

      <FormFactory tipo={formActivo} />
    </div>
  );
}
