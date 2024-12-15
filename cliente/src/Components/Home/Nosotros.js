import 'bootstrap/dist/css/bootstrap.min.css';
import VectorPalomita from "../../Assets/Img_Home_new/Vectordepalomita.png";
import venta1 from "../../Assets/Img_Home_new/venta1.png";
import './css/Nosotros.css';
import { Link } from 'react-router-dom';


function Nosotros() {
  return (
    <section class="sales-section" id='nosostros1'>
      <div class="header-content">
        <h1 class="main-title">Vender nunca fue tan fácil</h1>
        <p class="subtitle">Olvídate de capacitaciones y problemas con tu sistema</p>
      </div>
      <img
        loading="lazy"
        src={venta1}
        class="hero-image"
        alt="Sistema de punto de venta"
      />
      <div class="features-container">
        <h2 class="features-title">Punto de venta eficiente</h2>
        <div class="feature-item">
          <img
            loading="lazy"
            src={VectorPalomita}
            class="feature-icon"
            alt="Intuitivo"
          />
          <p class="feature-text">Intuitivo y fácil de usar</p>
        </div>
        <div class="feature-item">
          <img
            loading="lazy"
            src={VectorPalomita}
            class="feature-icon"
            alt="Teclado numérico"
          />
          <p class="feature-text">Teclado numérico eficiente</p>
        </div>
        <div class="feature-item">
          <img
            loading="lazy"
            src={VectorPalomita}
            class="feature-icon"
            alt="Métodos de pago"
          />
          <p class="feature-text">Métodos de pago flexibles</p>
        </div>
        <div class="feature-item">
          <img
            loading="lazy"
            src={VectorPalomita}
            class="feature-icon"
            alt="Resumen"
          />
          <p class="feature-text">Todo Resumido</p>
        </div>
        <div class="cta-wrapper">
          <Link to={"/login"}>
            <button class="cta-button" tabindex="0">Comenzar</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Nosotros;