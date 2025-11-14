import FormLibro from "./formLibro";
import FormRevista from "./formRevista";
import FormOtro from "./formOtro";

export function FormFactory({ tipo }) {
  switch (tipo) {
    case "libro":
      return <FormLibro />;
    case "revista":
      return <FormRevista />;
    case "otro":
      return <FormOtro />;
    default:
      return <h2>Selecciona un tipo de formulario</h2>;
  }
}
