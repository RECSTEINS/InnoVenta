import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import './css/Descuento.css'

function Descuentos(){
    return(
        <div class="descuento-fondo d-none d-md-block">
            <div class="row py-5 elite-custom">
                <div class="col-md-12">
                    <p class="section-title-discount d-none d-md-block">Qué le brinda el equipo InnoVenta</p>
                </div>   
                <div class="col-md-2"></div>
                <div class="col-md-7 col-12 discount-box">
                    <div class="discount-code">
                        <p class="discount-subtext2">Ingresa el siguiente código de descuento</p>
                        <span class="discount-offert">IV583PV2024</span>
                    </div>

                    <div class="circle">
                        <div>
                            <p >Y obtén hasta el</p>
                            <p class="discount-number" >20%</p>
                            <p >al obtener tu membresía premium</p>
                        </div>
                    </div>
                </div>
                <div class="col-2"></div>
            </div>
        </div>
    )
}


export default Descuentos;