import "./UpdatePassword.css";
import Logo from "./logo-login.png";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // 

function UpdatePassword(){

    const [usuario, setUsuario] = useState("");
    const [nuevaPassword, setNuevaPassword] = useState("");

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        if (!usuario || !nuevaPassword) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor, completa todos los campos.",
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:7777/login-update", {
                usuario_nombre: usuario,
                nueva_password: nuevaPassword,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Contraseña actualizada con éxito.",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Error al actualizar la contraseña.",
            });
        }
    };

    return(
        <div class="container-custom-pass">
            <img src={Logo} alt="Logo" class="logo-pass"/>
                <p class="update-pass-title">Te hemos enviado un código a tu email</p>
                <p class="update-pass-subtitle">Ingresa la confirmación y define tu nueva contraseña</p>
                <form onSubmit={handleUpdatePassword}>
                    <p class="col-12 label-pass-update">Usuario</p>
                    <input
                        type="text"
                        className="col-12 form-control-pass"
                        placeholder="Ingresa tu usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required 
                    />
                    <p class="col-12 label-pass-update">Nueva contraseña</p>
                    <input
                    type="password"
                    className="col-12 form-control-pass"
                    placeholder="Ingresa tu nueva contraseña"
                    value={nuevaPassword}
                    onChange={(e) => setNuevaPassword(e.target.value)}
                    required     
                    />
                    <button type="submit" class="btn btn-custom-pass">Confirma contraseña</button>
                </form>
                <Link to={"/login"}>
                    <a class="back-link-pass">Volver</a>
                </Link>
        </div>
    )
}

export default UpdatePassword;