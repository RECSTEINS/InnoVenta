import React, { useState } from "react";
import "./css_roles/Agregar_Roles.css";


function AgregarRol({ onRegresar }) {

    const [formData, setFormData] = useState({
        nombres: "",
        descripcion: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:7777/postRoles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:"",
                    action: "insert",
                    nombre: formData.nombres,
                    descripcion: formData.descripcion,
                }),
            });
    
            const result = await response.json();
            if (response.status === 200) {
                alert("Rol agregado correctamente.");
            } else {
                alert("Error al agregar rol: " + result.message);
            }
        }catch(error){
            console.error("Error:", error);
            alert("Ocurrió un error al registrar el rol.");
        }
    };

    return (
        <section className="panel">
            <form onSubmit={handleSubmit} className="formulario">
                <div className="caja-informacion separacion-cajaI-cajaB">
                    <div className="caja-titulo margen-vertical">
                        <h1 className="Titulo">Información del nuevo rol</h1>
                    </div>
                    <div className="caja-grandes margen-vertical">
                        <div className="label-grande">
                            <label htmlFor="NombreProducto" className="estilo-label">Nombre del rol:</label>
                        </div>
                        <input type="text" id="nombres" value={formData.nombres} onChange={handleChange} className="estilo-input input-grande input-texto" />
                    </div>
                    <div className="caja-grandes margen-vertical">
                        <div className="label-grande">
                            <label htmlFor="Descripcion" className="estilo-label">Descripcion:</label>
                        </div>
                        <input type="text" id="descripcion" value={formData.descripcion} onChange={handleChange} className="estilo-input input-grande input-texto" />
                    </div>
                </div>
                <div className="caja-botones">
                    <div className="caja-boton separacion-botones">
                        <button type="button" onClick={onRegresar} className="boton-regresar">Regresar</button>
                    </div>
                    <div className="caja-boton">
                        <button type="submit" className="boton-ingresar">
                            Ingresar <i className="bi bi-arrow-right estilo-icono"></i>
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default AgregarRol;