import "./css_Usuario/AgregarUsuario.css";
import React, { useState, useEffect } from "react";

function AgregarUsuario({ onRegresar }){

    const [formData, setFormData] = useState({
        nombre: "",
        password: "",
        fkrestaurante: "",
        fkempleado: "",
        fkrol: "",
    });

    const [empleados, setEmpleados] = useState([]);
    const [restaurantes, setRestaurantes] = useState([]);
    const [roles, setRoles] = useState([]);
    

    useEffect(() => {
        // Cargar opciones de empleados, restaurantes y roles
        const fetchData = async () => {
            try {
                const empleadosResponse = await fetch("http://localhost:7777/getEmpleados");
                const restaurantesResponse = await fetch("http://localhost:7777/getRestaurantes");
                const rolesResponse = await fetch("http://localhost:7777/getRoles");

                setEmpleados(await empleadosResponse.json());
                setRestaurantes(await restaurantesResponse.json());
                setRoles(await rolesResponse.json());
            } catch (error) {
                console.error("Error al cargar opciones:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validar campos requeridos
        if (!formData.fkempleado || !formData.fkrestaurante || !formData.fkrol) {
            formData.fkrestaurante = 1;
        }
    
        const nuevoUsuario = {
            ...formData,
            img: "",
            fecha_creacion: new Date().toISOString().slice(0, 19).replace("T", " "),
            activo: 1,
            action: "insert",
        };
    
        try {
            const response = await fetch("http://localhost:7777/postUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoUsuario),
            });
    
            if (response.ok) {
                alert("Usuario añadido correctamente.");
                onRegresar();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al añadir usuario:", error);
            alert("Ocurrió un error al añadir el usuario.");
        }
    };
    return(
        <section class="panel-agregar-usuario">
            <form onSubmit={handleSubmit} class="formulario-agregar-usuario">
                <div class="caja-informacion separacion-cajaI-cajaB">
                    <div class="caja-titulo margen-vertical">
                        <h1 class="titulo">Añadir a un nuevo usuario</h1>
                    </div>
                    <div class="caja-instrucciones margen-vertical">
                        <h2 class="subtitulo">Ingrese los datos solicitados:</h2>
                    </div>
                    <div class="caja-grandes margen-vertical">
                        <div class="label-grande-agregar-usuario">
                            <label for="NombreProducto" class="estilo-label">Nombre de usuario:</label>
                        </div>
                        <input 
                            type="text"
                            id="nombre" 
                            class="estilo-input input-grande input-texto" 
                            placeholder="Ejemplo: Raul Garcia" 
                            value={formData.nombre}
                            onChange={handleChange}
                            required/>
                    </div>
                    <div class="caja-grandes margen-vertical">
                        <div class="label-grande-agregar-usuario">
                            <label for="contraseña" class="estilo-label">Contraseña:</label>
                        </div>
                        <input 
                            type="password" 
                            id="password" 
                            class="estilo-input input-grande input-texto" 
                            placeholder="Ejemplo: Raul2005_G" 
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                </div>
                <div class="caja-medianos margen-vertical">
                    <div class="cajita-select margen-horizontal">
                        <div class="label-mediano margen-entre-medianas">
                            <label for="nombre" class="estilo-label">Nombre(s) del empleado:</label>
                        </div>
                        <select 
                            name="nombre" 
                            id="fkempleado" 
                            class="caja-select"
                            value={formData.fkempleado}
                            onChange={handleChange}
                            required
                        >
                            <option selected disabled>Seleccione una opción</option>
                            {empleados.map((empleado) => (
                                <option key={empleado.pk_empleado} value={empleado.pk_empleado}>
                                    {empleado.empleado_nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                </div>
                <div class="caja-medianos">
                    <div class="cajita-select margen-horizontal">
                        <div class="label-mediano margen-entre-medianas">
                            <label for="restaurante" class="estilo-label">Restaurante:</label>
                        </div>
                        <select 
                            name="restaurante" 
                            id="fkrestaurante" 
                            class="caja-select"
                            value={formData.fkrestaurante}
                            onChange={handleChange}
                            required
                        >
                            <option selected disabled>Seleccione una opción</option>
                            {restaurantes.map((restaurante) => (
                                <option key={restaurante.pk_restaurante} value={restaurantes.pk_restaurante}>
                                    {restaurante.restaunrate_nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="cajita-select">
                        <div class="label-mediano margen-entre-medianas">
                            <label for="rol" class="estilo-label">Rol del empleado:</label>
                        </div>
                        <select 
                            name="rol" 
                            id="fkrol" 
                            value={formData.fkrol}
                            onChange={handleChange}
                            class="caja-select"
                        >
                            <option selected disabled>Seleccione una opción</option>
                            {roles.map((rol) => (
                                <option key={rol.pk_rol} value={rol.pk_rol}>
                                    {rol.rol_nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div class="caja-botones">
                <div class="caja-boton separacion-botones">
                    <button type="button" onClick={onRegresar} className="boton-regresar">
                        Regresar
                    </button>
                </div>
                <div class="caja-boton">
                    <button type="submit" className="boton-ingresar">
                        Ingresar <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </form>
    </section>
    )
}

export default AgregarUsuario;