import "./css/Nosotros2.css";
import Venta2 from "../../Assets/Img_Home_new/venta2.png";
import ventaPalomi from "../../Assets/Img_Home_new/Vectordepalomita.png";

function Nosotros2(){
    return(
        <section class="features-section" id="nosotros2">
            <div class="features-content">
                <h2 class="features-title">Optimiza tus transacciones</h2>
      
                <div class="feature-item">
                    <img class="feature-icon" src={ventaPalomi} alt="" />
                    <p class="feature-text">Alerta de stock bajo</p>
                </div>
      
                <div class="feature-item">
                    <img class="feature-icon" src={ventaPalomi} alt="" />
                    <p class="feature-text">Gestión sencilla</p>
                </div>
      
                <div class="feature-item">
                    <img class="feature-icon" src={ventaPalomi} alt="" />
                    <p class="feature-text">Cálculo automático</p>
                </div>
      
                <div class="feature-item">
                    <img class="feature-icon" src={ventaPalomi} alt="" />
                    <p class="feature-text">Jerarquías claras</p>
                </div>
      
                <div class="cta-wrapper">
                    <button class="cta-button" tabindex="0">Comenzar</button>
                </div>
            </div>
    
            <img class="feature-image" src={Venta2} alt="Interfaz de optimización de transacciones" />
        </section>
    )
}

export default Nosotros2;