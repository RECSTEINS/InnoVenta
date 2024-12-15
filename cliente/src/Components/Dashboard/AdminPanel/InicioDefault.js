import './css/InicioDefault.css';
import Logo from "../../../Assets/Logo/logo-login.png"
import advertencia from "../../../Assets/Img_Home_new/advertencia.png";

function InicioDefault(){

    return(
        <div class="container vh-90 d-flex justify-content-center align-items-center default-container">
            <div class="text-center default-informacion">
                <div class="mb-4">
                    <img src={Logo} className='logo-default'/>
                    <p className='default-title'>Bienvenido a Innoventa</p>
                    <p class="mt-2 default-subtitle">Donde podrás:</p>
                </div>
                <div class="row row-cols-2 g-4 mb-4">
                    <div class="col columna-default">
                    <h5 class="card-title-default">Modificación rápida de precios y promociones</h5>
                        <div class="card-default text-center">
                            <div class="card-body">
                                <div className='pao'><i class="bi bi-patch-exclamation-fill logo-default"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col columna-default-2">
                    <h5 class="card-title-default ">Acceso a informes avanzados</h5>
                        <div class="card-default2  text-center">
                            <div class="card-body">
                                <div className='pao'><i class="bi bi-bar-chart-line-fill logo-default"></i></div>
                            </div>
                        </div>
                    </div>
                
                    <div class="col columna-default">
                    <h5 class="card-title-default">Gestionar roles y permisos de tus empleados</h5>
                        <div class="card-default-3  text-center">
                            <div class="card-body">
                                <div class="pao"><i class="bi bi-file-person-fill logo-default"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col columna-default-2">
                    <h5 class="card-title-default">Administrar tu inventario y exportarla</h5>
                        <div class="card-default4 text-center">
                            <div class="card-body">
                                <div class="pao"><i class="bi bi-folder-fill logo-default"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-comenzar-default">Comenzar</button>
            </div>
        </div>
    )
}

export default InicioDefault;