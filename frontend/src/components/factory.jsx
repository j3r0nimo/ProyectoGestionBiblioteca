import FormLibro from "./formLibro";
import FormRevista from "./formRevista";
import FormOtro from "./formOtro";

export function FormFactory({ tipo, libroAEditar }) {
  switch (tipo) {
    case "libro":
      return <FormLibro libroAEditar={libroAEditar} />;
    case "revista":
      return <FormRevista libroAEditar={libroAEditar} />;
    case "manual":
    case "catalogo":
    case "folleto":
      return <FormOtro libroAEditar={libroAEditar} />;
    default:
      return <h2>Selecciona un tipo de formulario</h2>;
  }
}