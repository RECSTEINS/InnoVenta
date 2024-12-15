import NavBar from "./Components/Home/Navbar";
import Presentacion from "./Components/Home/Presentacion";
import Funcionalidades from "./Components/Home/Funcionalidades";
import Demo from "./Components/Home/Demo";
import Casos from "./Components/Home/Casos";
import Brindamos from "./Components/Home/Brindamos";
import Planes from "./Components/Home/Planes";
import Footer from "./Components/Home/Footer";
import Resenas from "./Components/Home/Resenas";
import Elite from "./Components/Home/Elite";
import Formulario from "./Components/Home/Formulario";
import { Form } from "react-bootstrap"; 
import './App.css';
import RecoverPassword from "./Components/Login/RecoverPassword";
import Beneficios from "./Components/Home/Beneficios";
import Nosotros from "./Components/Home/Nosotros";
import Nosotros2 from "./Components/Home/Nosotros2";

import UpdatePassword from "./Components/Login/UpdatePassword";
import Tarjeta from "./Components/Home/Tarjeta";

function App() {
  return (
    <div className="prueba-app">
        <NavBar/>
        <Presentacion/>
        <Beneficios/>
        <Nosotros/>
        <Nosotros2/>
        <Demo/>
        <Planes/>
        {/*<Formulario/>*/}
       
        <Casos/>
        <Resenas/>
        <Footer/>
    </div>
  );
}

export default App;
