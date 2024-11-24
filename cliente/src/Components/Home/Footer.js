import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import './css/Footer.css';
import logo from '../../Assets/Img_Home/footer-mobile.png'

function Footer(){
    return(
        <footer class="footer ">
            <div class="container py-5 mx-md-5 prueba-footer">
                <div class="row mx-md-5 mx-5">
                    <div class="col-12 d-md-none">
                        <img src={logo} alt="Imagen 1" class="logo-mobile d-md-none"/>
                        <p class="logo-footer-mobiler d-md-none">nnoventa</p>
                    </div>
                    <div class="col-md-3 mb-3">
                        <h5 class="text-white">Menú</h5>
                        <ul class="list-unstyled">
                            <li><a href="#" class="footer-link">Inicio</a></li>
                            <li><a href="#" class="footer-link">Registro</a></li>
                            <li><a href="#" class="footer-link">Demo</a></li>
                            <li><a href="#" class="footer-link">Membresía</a></li>
                            <li><a href="#" class="footer-link">Descuentos</a></li>
                        </ul>
                    </div>
                    <div class="col-md-5 mb-3">
                        <h5 class="text-white">Contáctanos</h5>
                        <div class="d-flex gap-5">
                            <a><i class="bi bi-facebook social-icon"></i></a>
                            <a><i class="bi bi-instagram social-icon"></i></a>
                            <a><i class="bi bi-twitter-x social-icon"></i></a>
                        </div>
                        <p class="text-white mt-5 footer-subtext d-none d-md-block">
                        <strong>InnoVenta</strong><br/>
                        Somos un equipo desarrollador, con el objetivo de ayudar a cubir la mayor cantidad de necesidades que
                        pueden afrontar las empresas y requerir automatizar procesos con mayor efectividad en un sistema.
                        </p>
                    </div>

                    <div class="col-md-4 col-12 mb-3">
                        <h5 class="text-white">Suscríbete</h5>
                        <p class="text-white">Suscríbete para recibir notificaciones</p>
                        <form class="">
                            <input type="email" class="form-control me-2" placeholder="Correo electrónico"/>
                      
                            <button type="submit" class="btn btn-warning-footer">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;