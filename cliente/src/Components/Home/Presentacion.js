import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Presentacion.css';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import CloudImage from '../../cloudinary/CloudImage';
import BotpressChat from '../../BotpressChat/BotpressProvider';

function Presentacion(){

    const handleOpenMenus = () => {
        console.log("Botón de abrir menú clickeado");
    };

    return(
        <div class="presentacion-fondo">
            <div class="container mx-[252px]">
                <div class="row align-items-center mx-md-3">        
                    <div class="col-md-7 col-12 text-left">
                        <p class="display-4 presentacion-title prueba ">Gestiona tu negocio como<br/>un profesional.</p>
                        <p class="presentacion-text  d-none d-md-block">InnoVenta: Gestión que se adapta, resultados que<br/>crecen.</p>

                        <p class="presentacion-text d-md-none d-md-block">InnoVenta: Gestión que se adapta, resultados que crecen.</p>
                        
                        <p class="presentacion-subtext1 ">La solución definitiva para restaurantes: controla ventas,<br/> automatiza pago, gestiona inventarios y accede a reportes.</p>
                        
                        <Link to={"/login"}>
                            <button class="btn btn-warnings" onClick={handleOpenMenus}>Probar Gratis Ahora</button>
                        </Link>
                        
                        <ScrollLink
                            to="footer"
                            smooth={true}
                            duration={1500}
                        >
                            <button class="btn btn-warnings-2" onClick={handleOpenMenus}>Contáctanos</button>
                        </ScrollLink>
                    </div>
                    <div class="col-md-5 col-12">
                        <div class="image-grid">                  
                        <CloudImage publicId="imagen1_editada_presentacion_otoefr" className="grid-image presentacion-imagen-1 d-none d-md-block" alt="Imagen 1" />
                        <CloudImage publicId="presentacion-mobile_a2zqos" className="grid-image presentacion-imagen-1-mobile d-md-none w-100"/>

                        <CloudImage publicId="imagen2_editada_s8vavf" className="grid-image presentacion-imagen-2 d-none d-md-block"/>
                        <CloudImage publicId="presentacion-mobile2_qnbj25" className="grid-image presentacion-imagen-2-mobile d-md-none w-100"/>

                        <CloudImage publicId="presentacion-imagen_y8xbyi" className="grid-image presentacion-imagen-3 d-none d-md-block"/>
                        <CloudImage publicId="presentacion-mobile3_fr3ahk" className="grid-image presentacion-imagen-3-mobile d-md-none w-100"/>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
    )
}

export default Presentacion;