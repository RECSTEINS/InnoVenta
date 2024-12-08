import React, { useState, useEffect } from "react";
import "./css_roles/Agregar_Roles.css";

function EditarRol({ onRegresar, rolId }) {
    const [formData, setFormData] = useState({
        nombres: "",
        descripcion: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRolData = async () => {
            try {
                const response = await fetch(`http://localhost:7777/getRolId/${rolId}`);
                if (response.ok) {
                    const rolData = await response.json();
                    console.log("Datos del rol (antes de actualizar formData):", rolData);
                    if (rolData.length > 0) {
                        setFormData({
                            nombres: rolData[0].rol_nombre,
                            descripcion: rolData[0].rol_descripcion,
                        });
                        console.log("formData actualizado:", {
                            nombres: rolData[0].rol_nombre,
                            descripcion: rolData[0].rol_descripcion,
                        });
                    }
                    setIsLoading(false);
                } else {
                    alert("Error al cargar el rol.");
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error al cargar el rol:", error);
                alert("Ocurrió un error al cargar el rol.");
                setIsLoading(false);
            }
        };
    
        fetchRolData();
    }, [rolId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:7777/updateRoles/${rolId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: formData.nombres || "",
                    descripcion: formData.descripcion || "",
                }),
            });

            const result = await response.json();
            if (response.status === 200) {
                alert("Rol actualizado correctamente.");
            } else {
                alert("Error al actualizar rol: " + result.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al actualizar el rol.");
        }
    };

    if (isLoading) {
        return <p>Cargando datos del rol...</p>;
    }

    return (
        <section className="panel">
            <form onSubmit={handleSubmit} className="formulario">
                <div className="caja-informacion separacion-cajaI-cajaB">
                    <div className="caja-titulo margen-vertical">
                        <h1 className="Titulo">Editar rol</h1>
                    </div>
                    <div className="caja-grandes margen-vertical">
                        <div className="label-grande">
                            <label htmlFor="nombres" className="estilo-label">Nombre del rol:</label>
                        </div>
                        <input
                            type="text"
                            id="nombres"
                            value={formData.nombres || ""}
                            onChange={handleChange}
                            className="estilo-input input-grande input-texto"
                        />
                    </div>
                    <div className="caja-grandes margen-vertical">
                        <div className="label-grande">
                            <label htmlFor="descripcion" className="estilo-label">Descripción:</label>
                        </div>
                        <input
                            type="text"
                            id="descripcion"
                            value={formData.descripcion || ""}
                            onChange={handleChange}
                            className="estilo-input input-grande input-texto"
                        />
                    </div>
                </div>
                <div className="caja-botones">
                    <div className="caja-boton separacion-botones">
                        <button type="button" onClick={onRegresar} className="boton-regresar">
                            Regresar
                        </button>
                    </div>
                    <div className="caja-boton">
                        <button type="submit" className="boton-ingresar">
                            Actualizar <i className="bi bi-arrow-right estilo-icono"></i>
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default EditarRol;