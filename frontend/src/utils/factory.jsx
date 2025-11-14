import FormLibros from "./formLibro";
import FormRevistas from "./formRevista";

export function FormFactory({ tipo }) {
  switch (tipo) {
    case "libro":
      return <FormLibros />;
    case "revista":
      return <FormRevistas />;
    default:
      return <h2>Selecciona un tipo de formulario</h2>;
  }
}
