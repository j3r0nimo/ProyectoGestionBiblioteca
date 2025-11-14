import FormLibros from "./formLibro";
import FormRevistas from "./formRevista";

export function FormFactory({ tipo }) {
  switch (tipo) {
    case "libro":
      return <FormLibros />;
    case "revista":
      return <FormRevistas />;
    default:
      return <p>Selecciona un tipo de formulario</p>;
  }
}
