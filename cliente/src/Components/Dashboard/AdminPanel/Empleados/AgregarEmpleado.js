import React, { useState } from "react";
import "../css/AgregarEmpleado.css";
import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../Auth/firebaseConfig";


function AgregarEmpleado({ onRegresar }){


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
    };


    return(
        <section className="container mt-4 agregar-empleado-form">
            <form onSubmit={handleSubmit}>
                <div className="mb-4 Titulo margin-abajo">
                    <h1 className="text-center">Información Personal</h1>
                </div>

                <div className="row mb-3 Caja-Nombre-Apellido margin-abajo">
                    <div className="col-md-6 Caja-Nombre margin-derecha">
                        <label htmlFor="nombres" className="form-label Nombres">Nombres:</label>
                        <input 
                            type="text" 
                            id="nombres" 
                            className="form-control" 
                            placeholder="Nombres" 
                            value={formData.nombres} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="col-md-6 Caja-Apellido">
                        <label htmlFor="apellidos" className="form-label Apellidos">Apellidos:</label>
                        <input 
                            type="text" 
                            id="apellidos" 
                            className="form-control" 
                            placeholder="Apellidos" 
                            value={formData.apellidos} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <div className="row mb-3 Caja-Edad-Genero-Telefono margin-abajo">
                    <div className="col-md-4 Caja-Edad margin-derecha">
                        <label htmlFor="edad" className="form-label Edad">Edad:</label>
                        <input 
                            type="number" 
                            id="edad" 
                            className="form-control" 
                            placeholder="Edad" 
                            max="100" 
                            value={formData.edad} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="col-md-4 Caja-Genero margin-derecha">
                        <label htmlFor="genero" className="form-label Genero">Género:</label>
                        <select 
                            id="genero" 
                            className="form-select" 
                            value={formData.genero} 
                            onChange={handleChange}
                        >
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                    <div className="col-md-4 Caja-Telefono">
                        <label htmlFor="telefono" className="form-label Telefono">Teléfono:</label>
                        <input 
                            type="text" 
                            id="telefono" 
                            className="form-control" 
                            placeholder="Teléfono" 
                            value={formData.telefono} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <div className="mb-3 Caja-Correo margin-abajo">
                    <div class="SubCaja-Correo margin-derecha">
                        <label htmlFor="correo" className="form-label">Correo Electrónico: </label>
                    </div>
                    <input 
                        type="email" 
                        id="correo" 
                        className="form-control" 
                        placeholder="Correo" 
                        value={formData.correo} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="mb-3 Caja-Direccion margin-abajo">
                    <div class="SubCaja-Direccion margin-derecha">
                        <label htmlFor="direccion" className="form-label Direccion">Dirección:</label>
                    </div>
                        <input 
                            type="text" 
                            id="direccion" 
                            className="form-control" 
                            placeholder="Dirección" 
                            value={formData.direccion} 
                            onChange={handleChange} 
                        />
                </div>

                <div className="row mb-3 Caja-RFC-IMSS">
                    <div className="col-md-6 Caja-RFC margin-derecha">
                        <label htmlFor="rfc" className="form-label RFC">RFC:</label>
                        <input 
                            type="text" 
                            id="rfc" 
                            className="form-control" 
                            placeholder="RFC" 
                            value={formData.rfc} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="col-md-6 Caja-IMSS">
                        <label htmlFor="imss" className="form-label IMSS">IMSS:</label>
                        <input 
                            type="text" 
                            id="imss" 
                            className="form-control" 
                            placeholder="IMSS" 
                            value={formData.imss} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between Botones">
                    <button 
                        type="button" 
                        className="btn btn-secondary Boton-Regresar Texto-Boton margin-boton-izquierda margin-boton-Regresar" 
                        onClick={onRegresar}
                    >
                        Regresar
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary Boton-Ingresar Texto-Boton"
                    >
                        Ingresar
                    </button>
                </div>
            </form>
        </section>
    )
}

export default  AgregarEmpleado;