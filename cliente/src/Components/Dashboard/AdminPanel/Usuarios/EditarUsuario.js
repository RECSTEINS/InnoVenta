import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ClientAxios from "../../../../Config/axios";
import "./css_Usuario/AgregarUsuario.css";

function EditarUsuario({ usuarioSeleccionado, onRegresar }) {
    const [formData, setFormData] = useState({
        nombre: "",
        password: "",
        fkrol: "",
        fkempleado: "",
        fkrestaurante: "",
        activo: 1,
    });

    const [empleados, setEmpleados] = useState([]);
    const [restaurantes, setRestaurantes] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (usuarioSeleccionado) {
            setFormData({
                nombre: usuarioSeleccionado.usuario_nombre || "",
                password: usuarioSeleccionado.usuario_password || "",
                fkrol: usuarioSeleccionado.fk_rol || "",
                fkempleado: usuarioSeleccionado.fk_empleado || "",
                fkrestaurante: usuarioSeleccionado.fk_restaurante || "",
    
            });
        }
    }, [usuarioSeleccionado]);

    useEffect(() => {
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
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ClientAxios.post(`/updateUsuario/${usuarioSeleccionado.pk_usuario}`, formData);
            Swal.fire("Éxito", "Usuario actualizado correctamente.", "success");
            onRegresar();
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            Swal.fire("Error", "Hubo un problema al actualizar el usuario.", "error");
        }
    };

    return (
        <section className="panel-agregar-usuario">
            <form onSubmit={handleSubmit} className="formulario-agregar-usuario">
                <div className="caja-informacion separacion-cajaI-cajaB">
                    <h1 className="titulo">Editar Usuario</h1>
                    <h2 className="subtitulo">Ingrese los datos solicitados:</h2>

                    <label className="estilo-label">
                        Nombre de usuario:
                        <input
                            type="text"
                            name="nombre"
                            className="estilo-input input-grande input-texto"
                            placeholder="Ejemplo: Raul Garcia"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="estilo-label">
                        Contraseña:
                        <input
                            type="password"
                            name="password"
                            className="estilo-input input-grande input-texto"
                            placeholder="Ejemplo: Raul2005_G"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="estilo-label">
                        Nombre(s) del empleado:
                        <select
                            name="fkempleado"
                            className="caja-select"
                            value={formData.fkempleado}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Seleccione una opción</option>
                            {empleados.map((empleado) => (
                                <option key={empleado.pk_empleado} value={empleado.pk_empleado}>
                                    {empleado.empleado_nombre}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="estilo-label">
                        Restaurante:
                        <select
                            name="fkrestaurante"
                            className="caja-select"
                            value={formData.fkrestaurante}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Seleccione una opción</option>
                            {restaurantes.map((restaurante) => (
                                <option key={restaurante.pk_restaurante} value={restaurante.pk_restaurante}>
                                    {restaurante.restaunrate_nombre}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="estilo-label">
                        Rol del empleado:
                        <select
                            name="fkrol"
                            className="caja-select"
                            value={formData.fkrol}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Seleccione una opción</option>
                            {roles.map((rol) => (
                                <option key={rol.pk_rol} value={rol.pk_rol}>
                                    {rol.rol_nombre}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="caja-botones">
                    <button type="button" onClick={onRegresar} className="boton-regresar">
                        Regresar
                    </button>
                    <button type="submit" className="boton-ingresar">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </section>
    );
}

export default EditarUsuario;