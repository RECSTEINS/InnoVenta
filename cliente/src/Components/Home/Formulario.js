import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import './css/Formulario.css';
 
function Formulario(){
    return(
        <div class="mt-5 formulario">
    <h1>Te contactamos</h1>
    <form class="">
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre(s):</label>
            <input type="text" class="form-control" id="nombre"/>
        </div>
        <div class="mb-3">
            <label for="apellido" class="form-label">Apellido(s):</label>
            <input type="text" class="form-control" id="apellido"/>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <input type="email" class="form-control" id="email"/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="password"/>
        </div>
        <button type="submit" class="btn btn-primary btn-enviar">Enviar</button>
      </form>
</div>
    
    )
}

export default Formulario;


