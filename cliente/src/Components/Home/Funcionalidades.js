import 'bootstrap/dist/css/bootstrap.min.css';
//import './css/Presentacion.css';
import { Button } from 'bootstrap';
import './css/Funcionalidades.css'
import imagen13 from '../../Assets/Img_Home/imagen15.JPG';
import imagen13mobile from '../../Assets/Img_Home/funcionalidades-mobile.jpg';


function Funcionalidades(){
    return(
        <div class="fondo-funcionalidades">
            <div class="container py-md-5 py-3">
                <div class="row mx-md-5 align-items-center"> 
                    <div class="col-md-7 col-12 text-left">
                        <p class="display-4 funcionalidades-title">¿Por qué elegir <span class="highlight-text">Innoventa</span>?</p>
                        <p class="subheading ">Porque inoventa gestiona las mejores herramientas, usuarios, roles, ventas y pagos.</p>
                        <p class="subheading d-none d-md-block ">Tambien cuenta con un control de inventario en tiempo real y una membresía <strong class="premiun-color">PREMIUN</strong> para funciones avanzadas; <strong class="elite-color">ELITE</strong> para personalizar y contamos con una básica.<br/>
                        Descubre todas las herramientas que optimizan tu restaurante. Accede al inventario en tiempo real, ventas simuladas y reportes avanzados con nuestra demo</p>
                        
                        <p class="subheading d-md-none">Tambien cuenta con un control de inventario en tiempo real y una membresia premium para funciones avanzadas.</p>
                        <button class="btn btn-warning-funci boton-comenzar funcionalidades-button"><stong>Contacto </stong></button>
                    </div>
                  
                    <div class="col-md-5 col-12 image-grid-funcionalidades">
                        <img src={imagen13} class="grid-image-funcionalidades imagen13 d-none d-md-block"/>

                        <img src={imagen13mobile} alt="Imagen 1" class="funcionalidades-imagen-1-mobile d-md-none"/>  
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Funcionalidades;