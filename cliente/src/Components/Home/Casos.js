import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import './css/Casos.css';
import imagen13 from '../../Assets/Img_Home/caso2-editada.JPG';
import imagen7 from '../../Assets/Img_Home/caso1-editada.JPG';
import imagen14 from '../../Assets/Img_Home/caso3-editada.JPG';
 
function Casos(){
    return(
        <div class="fondo-casos">
            <div class="seccion-casos py-5 ">
                <div class="container text-center">
                    <h2 class="caso-top-text d-none d-md-block">Innoventa Premium</h2>
                    <p class="titulo-seccion-caso d-none d-md-block">Restaurantes que Crecen con InnoVenta</p>
                    <p class="titulo-seccion-caso d-md-none d-md-block">Restaurantes que Crecen con <span class="caso-mobile-color">InnoVenta</span></p>
                    <p class="subtitulo-seccion-caso">¿Quieres que tu restaurante sea nuestro próximo caso de éxito?</p>
        
                    <div class="row justify-content-center mx-5">

                        <div class="col-md-4 mb-4">
                            <div class="card caso-card">
                                <img src={imagen7} alt="Parrilla La Tradición" class="card-img-top rounded-circle mx-auto mt-3 caso-img"/>
                                <div class="card-body">
                                    <p class="card-title-caso">Parrilla La Tradición</p>
                                    <p class="card-text"><strong class="caso-alert">20%</strong> de Reducción en</p>
                                    <p class="card-text2">Pérdidas de Inventario</p>
                                    <i class="bi bi-clipboard2-data caso-icon"></i>
                                    <p class="card-text">Calificación de <strong class="caso-alert">4.8/5</strong> en</p> 
                                    <p class="card-text2">Reseñas</p>
                                    <i href="#" class="btn btn-link caso-link">Ver Historia Completa</i>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-4">
                            <div class="card caso-card">
                                <img src={imagen13} alt="Cafetería La Playa" class="card-img-top rounded-circle mx-auto mt-3 caso-img"/>
                                <div class="card-body">
                                    <p class="card-title-caso">Cafetería La Playa, Cancún, México</p>
                                    <p class="card-text">Disminución del <strong class="caso-alert">15%</strong> en</p>
                                    <p class="card-text2">tiempos de espera</p>
                                    <i class="bi bi-alarm-fill caso-icon"></i>
                                    <p class="card-text">Incremento del <strong class="caso-alert">20%</strong> por</p>
                                    <p class="card-text2">Ventas Matutinas</p>
                                    <a href="#" class="btn btn-link caso-link">Ver Historia Completa</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-4">
                            <div class="card caso-card">
                                <img src={imagen14} alt="Bistró Gourmet" class="card-img-top rounded-circle mx-auto mt-3 caso-img"/>
                                <div class="card-body">
                                    <p class="card-title-caso">Bistró Gourmet</p>
                                    <p class="card-text"><strong class="caso-alert">40%</strong> Optimización en </p>
                                    <p class="card-text2">Pérdidas por Exceso de Stock</p>
                                    <i class="bi bi-exclamation-circle-fill caso-icon"></i>
                                    <p class="card-text"><strong class="caso-alert">20%</strong> menos en gastos</p>
                                    <p class="card-text2">operativos</p>
                                    <a href="#" class="btn btn-link caso-link">Ver Historia Completa</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-warning-caso mt-4">Membresía</button>
                </div>
            </div>
        </div>
    )
}

export default Casos;