import React, { useState } from "react";
import "./css_Empleado/AgregarEmpleado.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../Auth/firebaseConfig";

function AgregarEmpleado({ onRegresar }) {
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

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Registrar usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.correo,
        "contraseñaPredeterminada123"
      );
      console.log("Usuario registrado en Firebase:", userCredential.user);

      // 2. Enviar datos al servidor
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
      if (response.status === 200 || response.status === 201) {
        alert("Empleado agregado correctamente.");
      } else {
        alert("Error al agregar empleado: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al registrar el empleado.");
    }
  };

  return (
    <section className="agregar-empleadoss">
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

export default AgregarEmpleado;
