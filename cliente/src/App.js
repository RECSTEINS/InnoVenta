import NavBar from "./Components/Home/Navbar";
import Presentacion from "./Components/Home/Presentacion";
import Funcionalidades from "./Components/Home/Funcionalidades";
import Demo from "./Components/Home/Demo";
import Casos from "./Components/Home/Casos";
import Descuentos from "./Components/Home/Descuento";
import Brindamos from "./Components/Home/Brindamos";
import Planes from "./Components/Home/Planes";
import Footer from "./Components/Home/Footer";
import Resenas from "./Components/Home/Resenas";
import Elite from "./Components/Home/Elite";
import Formulario from "./Components/Home/Formulario";
import { Form } from "react-bootstrap"; 


import RecoverPassword from "./Components/Login/RecoverPassword";

function App() {
  return (
    <div>
        <NavBar/>
        <Presentacion/>
        <Funcionalidades/>
        <Demo/>
        <Planes/>
        <Formulario/>
        <Elite/>
        <Casos/>
        <Resenas/>
        <Footer/>
    </div>
  );
}

export default App;
