import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import './css/Demo.css';
import imagen3 from '../../Assets/Img_Home/Demo.jpg';
 
function Demo(){
    return(
    <div class="fondo-demo">
        <div class="container ">
            <div class="row align-items-center section-container mx-md-5">
                <div class="col-md-7 col-12 demo-text">
                    <h2 class="section-title">Innoventa Premium</h2>
                    <p class="section-text">
                    Descubre todas las herramientas que optimizan tu restaurante. Accede al inventario en tiempo real, 
                    ventas simuladas y reportes básicos con nuestra demo.
                    </p>
                    <a href="#" class="btn btn-demo">Solicita una demo</a>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4 image-section">
                    <img src={imagen3} alt="Imagen de demo"/>
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default Demo;