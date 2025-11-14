import { useState } from "react";
import { FormFactory } from "../utils/factory";

export default function App() {
  const [formActivo, setFormActivo] = useState(null);

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
