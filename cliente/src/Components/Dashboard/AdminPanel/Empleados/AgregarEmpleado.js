import React, { useState } from "react";
import "../css/AgregarEmpleado.css";
import { Link } from "react-router-dom";



function AgregarEmpleado(){


    return(
        <section class="section-ingresar-empleados">
            <form action="#" method="POST" >
                <div class="caja-ingresar-empleados Margin-divs-abajo">
                    <div class="Titulo margin-abajo">
                        <h1>Información Personal</h1>
                    </div>
                    <div class="Caja-Nombre-Apellido margin-abajo">
                        <div class="Caja-Nombre margin-derecha">
                            <label for="Nombres" class="Nombres">Nombres:</label><br/>
                            <input type="text" class="" id="Nombres" placeholder="Nombres"/>
                        </div>
                        <div class="Caja-Apellido">
                            <label for="Apellidos" class="Apellidos">Apellidos:</label><br/>
                            <input type="text" class="" id="Apellidos" placeholder="Apellidos"/>
                        </div>
                    </div>

                    <div class="Caja-Edad-Genero-Telefono margin-abajo">
                        <div class="Caja-Edad margin-derecha">
                            <label for="Edad" class="Edad">Edad:</label><br/>
                            <input type="number" max="100" class="" id="Edad" placeholder="Edad"/>
                        </div>
                        <div class="Caja-Genero margin-derecha">
                            <label for="Genero" class="Genero">Genero:</label><br/>
                            <select name="Genero" id="Genero">
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>
                        <div class="Caja-Telefono">
                            <label for="Telefono" class="Telefono">Telefono:</label><br/>
                            <input type="text" class="" id="Telefono" placeholder="Telefono"/>
                        </div>
                    </div>

                    <div class="Caja-Correo margin-abajo">
                        <div class="SubCaja-Correo margin-derecha">
                            <label for="Correo" class="">Correo Electronico:</label>
                        </div>
                        <input type="email" class="" id="Correo" placeholder="Correo"/>
                    </div>
                    <div class="Caja-Direccion margin-abajo">
                        <div class="SubCaja-Direccion margin-derecha">
                            <label for="Direccion" class="Direccion">Direccion:</label><br/>
                        </div>
                        <input type="text" class="" id="Direccion" placeholder="Direccion"/>
                    </div>
                    <div class="Caja-RFC-IMSS">
                        <div class="Caja-RFC margin-derecha">
                            <label for="RFC" class="RFC">RFC:</label><br/>
                            <input type="text" class="" id="RFC" placeholder="RFC"/>
                        </div>
                        <div class="Caja-IMSS">
                            <label for="IMSS" class="IMSS">IMSS:</label><br/>
                            <input type="text" class="" id="IMSS" placeholder="IMSS"/>
                        </div>
                    </div>
                
                </div>
                <div class="Botones">
                    <button type="submit" class="Boton-Regresar Texto-Boton margin-boton-izquierda margin-boton-Regresar">Regresar</button>
                    <button type="submit" class="Boton-Ingresar Texto-Boton">Ingresar</button>
                </div> 
            </form>
        </section>
    )
}

export default  AgregarEmpleado;