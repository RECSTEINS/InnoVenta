import 'bootstrap/dist/css/bootstrap.min.css';
import './RecoverPassword.css';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "./logo-login.png";
import { auth } from "../../Auth/firebaseConfig"; 
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
import NavBar from '../Home/Navbar';
import Footer from '../Home/Footer';

function RecoverPassword(){
    
    const [email, setEmail] = useState("");

    const handleRecoverPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            Swal.fire({
                icon: "warning",
                title: "Campo vacío",
                text: "Por favor, ingresa tu email.",
            });
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Swal.fire({
                icon: "success",
                title: "Correo enviado",
                text: "Hemos enviado un enlace de recuperación a tu email.",
            });
        } catch (error) {
            console.error(error);
            let errorMessage = "Ocurrió un error al enviar el correo.";
            if (error.code === "auth/user-not-found") {
                errorMessage = "No existe una cuenta asociada a este email.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "El email ingresado no es válido.";
            }

            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
            });
        }
    };
    

    return(
        <>
            <NavBar/>
            <div class="container-custom-repass">
                <img src={Logo} alt="Logo" class="logo-repass"/>
                <p class="reupdate-pass-title">¿Has olvidado tu contraseña?</p>
                <p class="reupdate-pass-subtitle">¡No te preocupes! Escribe tu email y recibirás instrucciones para recuperarla</p>
                <form onSubmit={handleRecoverPassword}>
                    <p class="col-12 relabel-pass-update">Email</p>
                    <input
                        type="email"
                        className="col-12 reform-control-pass"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                
                    <button type="submit" class="btn rebtn-custom-pass">Recuperar contraseña</button>
                </form>
                <Link to={"/login"}>
                    <a class="reback-link-pass">Volver</a>
                </Link>
            </div>
            <Footer/>
        </>
    );
}

export default RecoverPassword;