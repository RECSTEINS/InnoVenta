import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import './css/Planes.css';

function Planes(){
    return(
        <div class="fondo-planes">
            <div class="container py-md-5 py-2 text-center">
                <h1 class="plan-title">Elige el plan perfecto para ti</h1>
                <p class="text-center plan-subtitle">Empieza con total tranquilidad. Si cambias de idea, tenemos garantía de reembolso por 30 días.</p>
                
                <div class="row justify-content-center mx-md-5 g-1">
                    <div class="col-md-4 mb-4 col-12 card-basic justify-content-center">
                        <div class="card shadow pricing-card basic-plan-card-completa">
                            
                            <div class="basic-plan-header text-uppercase fw-bold"><p></p></div>
                            <div class="card-body text-center price-section-basic">
                                <p class="plan-title-basic">BÁSICO</p>
                                <p class="price-basic my-3">$0 US</p>
                                
                            </div>
                            
                            <ul class="feature-list">
                                <li class="plan-list d-flex"><div class="col-10">Asignación de roles limitada</div><div class="col-2"><i class="bi bi-x icon-cancel-plan"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Acceso limitada al inventario</div><div class="col-2"><i class="bi bi-x icon-cancel-plan"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Reportes avanzados</div><div class="col-2"><i class="bi bi-x icon-cancel-plan"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Supervisión de ventas básica</div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Reportes básicos de ventas</div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Actualización manual de<br/>productos</div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>                               
                                <div>
                                    <a href="#" class="btn custom-btn">Comenzar</a>
                                </div>
                            </ul>
                        </div>
                    </div>
        
                    <div class="col-md-4 mb-4 col-12 card-premiun justify-content-center">
                        <div class="card shadow pricing-card">
                            <div class="pro-plan-header text-uppercase fw-bold">Más Populares</div>
                            <div class="card-body text-center price-section-premiun">
                                <h3 class="plan-title-basic">PREMIUN</h3>
                                <p class="price-basic my-2">$50 US</p>
                                <p class="billing-text">Ahorro aproximado del 20%</p>
                                <p class="billing-text2">Por usuario al mes, facturado anualmente*</p>
                            </div>
                            <ul class="feature-list">
                                <li class="plan-list d-flex"><div class="col-10">Gestión avanzada de roles y<br/>permisos</div><div class="col-2"><i class="bi bi-check-lg icon-check-plan"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Gestión completa del<br/> inventario<br/><p class="plan-list-subtext">añadir, modificar y eliminar productos</p></div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Informes de ventas y<br/>productos<br/><p class="plan-list-subtext">(diarios, semanales y mensulaes)</p></div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Notificaciones de stock en<br/>tiempo real</div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Acceso a informes avanzados</div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Modificación rápida de<br/>precios y promociones</div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                
                                <div>
                                    <a href="#" class="btn custom-btn">Membresía</a>
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-4 mb-4 card-elite justify-content-center">
                        <div class="card shadow pricing-card basic-plan-card-completa">
                            <div class="elite-plan-header text-uppercase fw-bold"><p></p></div>
                            <div class="card-body text-center price-section-elite">
                            
                                <p class="plan-title-basic">ÉLITE</p>
                                <p class="price-elite">(Personalizada)</p>
                                <a href="#" class="billing-text-elite">Contáctanos para Cotización</a>
                                <p class="billing-text-elite2">Hecho a la Medida de tu Marca</p>
                            </div>

                            <ul class="feature-list">
                                <li class="plan-list d-flex"><div class="col-10">Incluye todas las<br/>funcionalidades de <strong class="alert-text-caso">Premiun</strong></div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Personalización de diseño<br/><p class="plan-list-subtext">Adaptación de colores, logos y temas para reflejar la<br/>imagen de tú restaurante</p></div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Integración avanzada<br/><p class="plan-list-subtext">Opciones de Integración con otros sistemas de ventas o inventario</p></div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                <li class="plan-list d-flex"><div class="col-10">Soporte exclusivo<br/><p class="plan-list-subtext">Atención personalizada para implementar<br/>funciones adicionales</p></div><div class="col-2"><i class="bi bi-check-lg icon-check-plan mt-5"></i></div></li>
                                <div>
                                    <a href="#" class="btn custom-btn">Membresía</a>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Planes;