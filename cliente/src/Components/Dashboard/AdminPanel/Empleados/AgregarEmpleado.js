import React, { useState } from "react";
import "../css/AgregarEmpleado.css";
import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../Auth/firebaseConfig";


function AgregarEmpleado(){


    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        edad: "",
        genero: "",
        telefono: "",
        correo: "",
        direccion: "",
        rfc: "",
        imss: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Registrar correo en Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, formData.correo, "contraseñaPredeterminada123");
            console.log("Usuario registrado en Firebase:", userCredential.user);
    
            // Enviar datos al servidor
            const response = await fetch("http://localhost:7777/agregar-empleado", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: formData.nombres,
                    apellido: formData.apellidos,
                    edad: formData.edad,
                    genero: formData.genero,
                    telefono: formData.telefono,
                    email: formData.correo,
                    direccion: formData.direccion,
                    rfc: formData.rfc,
                    nss: formData.imss,
                    fecha_alta: new Date().toISOString().slice(0, 19).replace("T", " "),
                    activo: "Activo",
                }),
            });
    
            const result = await response.json();
            if (response.status === 201) {
                alert("Empleado agregado correctamente.");
            } else {
                alert("Error al agregar empleado: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al registrar el empleado.");
        }


        /*
        try {
            const response = await fetch("http://localhost:7777/agregar-empleado", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: formData.nombres,
                    apellido: formData.apellidos,
                    edad: formData.edad,
                    genero: formData.genero,
                    telefono: formData.telefono,
                    email: formData.correo,
                    direccion: formData.direccion,
                    rfc: formData.rfc,
                    nss: formData.imss,
                    fecha_alta: new Date().toISOString(), 
                    activo: "Activo" 
                })
            });

            const result = await response.json();

            if (response.status === 201) {
                alert("Empleado agregado exitosamente.");
                setFormData({
                    nombres: "",
                    apellidos: "",
                    edad: "",
                    genero: "",
                    telefono: "",
                    correo: "",
                    direccion: "",
                    rfc: "",
                    imss: ""
                });
            } else {
                alert(result.message || "Error al agregar el empleado.");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("Error al conectar con el servidor.");
        }*/
    };


    return(
        <section className="section-ingresar-empleados">
            <form onSubmit={handleSubmit}>
                <div className="caja-ingresar-empleados Margin-divs-abajo">
                    <div className="Titulo margin-abajo">
                        <h1>Información Personal</h1>
                    </div>
                    <div className="Caja-Nombre-Apellido margin-abajo">
                        <div className="Caja-Nombre margin-derecha">
                            <label htmlFor="nombres" className="Nombres">Nombres:</label><br/>
                            <input type="text" id="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} />
                        </div>
                        <div className="Caja-Apellido">
                            <label htmlFor="apellidos" className="Apellidos">Apellidos:</label><br/>
                            <input type="text" id="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="Caja-Edad-Genero-Telefono margin-abajo">
                        <div className="Caja-Edad margin-derecha">
                            <label htmlFor="edad" className="Edad">Edad:</label><br/>
                            <input type="number" max="100" id="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} />
                        </div>
                        <div className="Caja-Genero margin-derecha">
                            <label htmlFor="genero" className="Genero">Género:</label><br/>
                            <select id="genero" value={formData.genero} onChange={handleChange}>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>
                        <div className="Caja-Telefono">
                            <label htmlFor="telefono" className="Telefono">Teléfono:</label><br/>
                            <input type="text" id="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="Caja-Correo margin-abajo">
                        <label htmlFor="correo" className="">Correo Electrónico:</label><br/>
                        <input type="email" id="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} />
                    </div>
                    <div className="Caja-Direccion margin-abajo">
                        <label htmlFor="direccion" className="Direccion">Dirección:</label><br/>
                        <input type="text" id="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} />
                    </div>
                    <div className="Caja-RFC-IMSS">
                        <div className="Caja-RFC margin-derecha">
                            <label htmlFor="rfc" className="RFC">RFC:</label><br/>
                            <input type="text" id="rfc" placeholder="RFC" value={formData.rfc} onChange={handleChange} />
                        </div>
                        <div className="Caja-IMSS">
                            <label htmlFor="imss" className="IMSS">IMSS:</label><br/>
                            <input type="text" id="imss" placeholder="IMSS" value={formData.imss} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="Botones">
                    <button type="button" className="Boton-Regresar Texto-Boton margin-boton-izquierda margin-boton-Regresar">Regresar</button>
                    <button type="submit" className="Boton-Ingresar Texto-Boton">Ingresar</button>
                </div> 
            </form>
        </section>
    )
}

export default  AgregarEmpleado;