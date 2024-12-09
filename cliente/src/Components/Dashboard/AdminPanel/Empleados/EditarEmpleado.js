import React, { useEffect, useState } from "react";
import ClientAxios from "../../../../Config/axios";
import Swal from "sweetalert2";
import { updateEmail } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../Auth/firebaseConfig";


function EditarEmpleado({ empleadoSeleccionado, onRegresar }) {

    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        edad: "",
        genero: "",
        telefono: "",
        correo: "",
        direccion: "",
        rfc: "",
        imss: "",
      });


      useEffect(() => {
        console.log("Empleado seleccionado:", empleadoSeleccionado);
        if (empleadoSeleccionado) {
            setFormData({
                nombres: empleadoSeleccionado.empleado_nombre || "",
                apellidos: empleadoSeleccionado.empleado_apellido || "",
                edad: empleadoSeleccionado.empleado_edad || "",
                genero: empleadoSeleccionado.empleado_genero || "",
                telefono: empleadoSeleccionado.empleado_telefono || "",
                correo: empleadoSeleccionado.empleado_email || "",
                direccion: empleadoSeleccionado.empleado_direccion || "",
                rfc: empleadoSeleccionado.empleado_rfc || "",
                imss: empleadoSeleccionado.empleado_nss || "",
            });
        }
    }, [empleadoSeleccionado]);
    
      // Manejar cambios en los campos
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        const empleadoId = empleadoSeleccionado[0]?.pk_empleado; // Asegúrate de que esto esté definido

        if (!empleadoId) {
            console.error("Empleado no tiene ID.");
            return;
        }

        

        console.log("Datos enviados:", {
            nombre: formData.nombres,
            apellido: formData.apellidos,
            edad: formData.edad,
            genero: formData.genero,
            telefono: formData.telefono,
            email: formData.correo,
            direccion: formData.direccion,
            rfc: formData.rfc,
            nss: formData.imss,
        });
      
        try {
            // Enviar datos actualizados al servidor
            const response = await fetch(
                `http://localhost:7777/updateEmpleado/${empleadoId}`, // Usar empleadoId correctamente
                {
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
                    }),
                }
            );
    
            const result = await response.json();
    
            if (response.ok) {
                // Mensaje de éxito
                Swal.fire("Éxito", "Empleado actualizado correctamente.", "success");
                onRegresar(); // Regresar a la vista anterior
            } else {
                throw new Error(result.message || "Error al actualizar el empleado.");
            }
        } catch (error) {
            console.error("Error en la actualización:", error);
            Swal.fire("Error", error.message, "error");
        }
      };
    
      return (
        <section className="agregar-empleados">
          <form className="ingreso-de-datos" onSubmit={handleSubmit}>
            <div className="titulo">
              <div className="text-wrapper">Información del empleado</div>
            </div>
    
            <div className="div">
              <input
                className="input"
                type="text"
                name="nombres"
                placeholder="Nombre"
                required
                value={formData.nombres}
                onChange={handleChange}
              />
              <label className="label">
                <div className="text-wrapper-2">Nombre:</div>
              </label>
            </div>
            <div className="div">
              <input
                className="input"
                type="text"
                name="apellidos"
                placeholder="Apellido"
                required
                value={formData.apellidos}
                onChange={handleChange}
              />
              <label className="label">
                <div className="text-wrapper-2">Apellido:</div>
              </label>
            </div>
    
            <div className="div-2">
              <input
                className="input-2"
                type="number"
                name="edad"
                placeholder="Edad"
                required
                value={formData.edad}
                onChange={handleChange}
              />
              <label className="div-wrapper">
                <div className="text-wrapper-3">Edad:</div>
              </label>
            </div>
            <div className="div-2">
              <input
                className="input-2"
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                required
                value={formData.telefono}
                onChange={handleChange}
              />
              <label className="div-wrapper">
                <div className="text-wrapper-3">Teléfono:</div>
              </label>
            </div>
    
            <div className="genero">
              <div className="overlap-group">
                <select
                  className="rectangle"
                  name="genero"
                  required
                  value={formData.genero}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Seleccione género
                  </option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
                <img
                  className="caret-down-fill"
                  src="https://c.animaapp.com/rWO7gEcG/img/caretdownfill.svg"
                  alt="dropdown"
                />
              </div>
              <label className="text-wrapper-4">Género:</label>
            </div>
    
            <div className="overlap-wrapper">
              <div className="overlap">
                <label className="label-2">
                  <div className="text-wrapper-5">Correo electrónico:</div>
                </label>
                <input
                  className="input-3"
                  type="email"
                  name="correo"
                  placeholder="Correo electrónico"
                  required
                  value={formData.correo}
                  onChange={handleChange}
                />
              </div>
            </div>
    
            <div className="overlap-wrapper">
              <div className="overlap">
                <label className="label-2">
                  <div className="text-wrapper-5">Dirección:</div>
                </label>
                <input
                  className="input-3"
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  required
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </div>
            </div>
    
            <div className="div">
              <input
                className="input"
                type="text"
                name="rfc"
                placeholder="RFC"
                required
                value={formData.rfc}
                onChange={handleChange}
              />
              <label className="label">
                <div className="text-wrapper-2">RFC:</div>
              </label>
            </div>
            <div className="div">
              <input
                className="input"
                type="text"
                name="imss"
                placeholder="No. Seguro Social"
                required
                value={formData.imss}
                onChange={handleChange}
              />
              <label className="label">
                <div className="text-wrapper-2">No. Seguro Social:</div>
              </label>
            </div>
    
            <div className="botones-formularios">
              <button
                type="button"
                className="group overlap-group-2"
                onClick={onRegresar}
              >
                <div className="img"></div>
                <span className="text-wrapper-6">Regresar</span>
              </button>
              <button type="submit" className="overlap-group-wrapper overlap-2">
                <span className="text-wrapper-7">Ingresar datos</span>
                <img
                  className="vector"
                  src="https://c.animaapp.com/rWO7gEcG/img/vector.svg"
                  alt="icon"
                />
              </button>
            </div>
          </form>
        </section>
      );
}

export default EditarEmpleado;