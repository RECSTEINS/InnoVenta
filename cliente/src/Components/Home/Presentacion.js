import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Presentacion.css';
import { Button } from 'bootstrap';
import imagen1 from "../../Assets/Img_Home/imagen1_editada_presentacion.JPG"
import imagen2 from "../../Assets/Img_Home/imagen2_editada.JPG"
import imagen3 from "../../Assets/Img_Home/presentacion-imagen.jpg"

import imagen1mobile from "../../Assets/Img_Home/presentacion-mobile.jpg"
import imagen2mobile from "../../Assets/Img_Home/presentacion-mobile2.jpg"
import imagen3mobile from "../../Assets/Img_Home/presentacion-mobile3.jpg"

function Presentacion(){

    const handleOpenMenus = () => {
        console.log("Botón de abrir menú clickeado");
    };

    return(
        <div class="presentacion-fondo">
            <div class="container">
                <div class="row align-items-center mx-md-5">        
                    <div class="col-md-7 col-12 text-left">
                        <p class="display-4 presentacion-title prueba ">Gestiona tu negocio como<br/>un profesional.</p>
                        <p class="presentacion-text  d-none d-md-block">InnoVenta: Gestión que se adapta, resultados que<br/>crecen.</p>

                        <p class="presentacion-text d-md-none d-md-block">InnoVenta: Gestión que se adapta, resultados que crecen.</p>
                        
                        <p class="presentacion-subtext1 ">La solución definitiva para restaurantes: controla ventas,<br/> automatiza pago, gestiona inventarios y accede a reportes.</p>
                        <button class="btn btn-warnings" onClick={handleOpenMenus}>Obtén Membresía</button>
                    </div>
                    <div class="col-md-5 col-12">
                        <div class="image-grid">                  
                            <img src={imagen1} alt="Imagen 1" class="grid-image presentacion-imagen-1 d-none d-md-block"/>
                            <img src={imagen1mobile} alt="Imagen 1" class="grid-image presentacion-imagen-1-mobile d-md-none w-100"/>

                            <img src={imagen2} alt="Imagen 2" class="grid-image presentacion-imagen-2 d-none d-md-block"/>
                            <img src={imagen2mobile} alt="Imagen 1" class="grid-image presentacion-imagen-2-mobile d-md-none w-100"/>

                            <img src={imagen3} alt="Imagen 3" class="grid-image presentacion-imagen-3 d-none d-md-block"/>
                            <img src={imagen3mobile} alt="Imagen 1" class="grid-image presentacion-imagen-3-mobile d-md-none w-100"/>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
    )
}

export default Presentacion;