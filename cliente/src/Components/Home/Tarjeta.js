import './css/Tarjeta.css';
import tarjetacrd from "../../Assets/Logo/tarjetacrd.png"
import tarjetacrd2 from "../../Assets/Logo/imagen-crd-2.png";
import mex from "../../Assets/Logo/mex.png";
import NavBar from './Navbar';
import Footer from './Footer';

function Tarjeta(){

    return(
        <>
        <NavBar/>
        <div class="container vh-90 d-flex justify-content-center align-items-center default-container-tarjeta">
            <div class="text-center default-informacion">
                <div class="mb-4">
                      <p className='tarjeta-title'>Realizar pago</p>
                    <p class="mt-2 tarjeta-subtitle">Para finalizar su suscripción, complete su pago con una tarjeta de crédito válida</p>
                </div>
                <div class="row  ">
                    <div class="col-12 columna-tarjeta">
            
                        <p className='tarjeta-total-crd'>Total a pagar: $8000 MXN</p>
                        <input className='input-mediano-crd3'/>
                        <img className='tarjeta-img3' src={mex}/>
                    </div>
                    <div className='tarjeta-pao'>
                        <p className='tarjeta-subtitle mt-5'>"Transacción 100% segura"</p>
                    </div>
                    <div className='pureba-tarjetas'>
                        <p className='tarjeta-detalles-crd'>*Detalles de tarjeta</p>
                        <p className='tarjeta-datos'>Número de tarjeta:</p>
                        <img src={tarjetacrd} className='tarjeta-img'/>
                        <input className='input-grande-crd'/>
                        
                        <div className='row'>
                            <div className='col-6'>
                                <p className='tarjeta-datos'>Expiración</p>
                                <input className='input-mediano-crd'/>
                            </div>
                            <div className='col-6'>
                                <p className='tarjeta-datos'>CVC</p>
                                <img className='tarjeta-img2' src={tarjetacrd2}/>
                                <input className='input-pequeno-crd'/>
                            </div>
                            <div className='col-12'>
                                <p className='tarjeta-detalles-crd'>*Código de descuento</p>
                                <p className='tarjeta-datos'>Código de descuento</p>
                                <input className='input-pequeno-crd-2'/>
                                <button className='btn-aplica-tarjeta'>Aplicar</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <button class="btn btn-comenzar-default-tarjeta">Completar pago</button>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Tarjeta;