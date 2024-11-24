import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import './css/Elite.css';
import imagen16 from '../../Assets/Img_Home/imagen16-editada.JPG';

function Elite(){
    return(
            <div class="row elite-custom">
                <div class="col-md-4 col-12 custom-bg d-flex align-items-center justify-content-center">
                    <img src={imagen16} class="custom-image"/>
                </div>
                <div class="col-md-8 col-12 elite-info ">
                    <p class="custom-highlight">Innoventa Élite</p>
                    <h2 class="custom-title">Hecho a la medida de tu Restaurante</h2>
                    <p class="custom-text">
                        Con la membresía Élite de Innoventa, tendrás acceso a un asesor personal que colaborará contigo para comprender a fondo la visión y las necesidades específicas de tu restaurante. 
                        Juntos, trabajaremos para diseñar soluciones personalizadas que se adapten perfectamente a tu negocio.
                    <br/>
                        Personaliza completamente la interfaz de tu punto de venta, ajustándola a la dinámica única de tu operación. Configura categorías, secciones y flujos de trabajo específicos que optimicen la eficiencia diaria y potencien la experiencia de tus clientes.
                    </p>
                </div>
            </div>
          
    )
}

export default Elite;