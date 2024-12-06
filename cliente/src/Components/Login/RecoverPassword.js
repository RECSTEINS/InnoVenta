import 'bootstrap/dist/css/bootstrap.min.css';
import './RecoverPassword.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//Importar funciones para resetear la contraseña
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Auth/firebaseConfig';

const RecoverPassword = ({ estado, cambiarEstado}) => {
    
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        console.log("te encuentras aqui");

        try{
            console.log("entraste al try");
            await sendPasswordResetEmail(auth, email);
            setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
            setError('');
        }catch(error){
            console.log("no entro al try");
            console.error(error);
            setMessage('');
            setError('No se pudo enviar el enlace. Verifica tu correo electrónico.');
        }
    }
    

    

    return(
        <>
            { estado &&
                <div className='overlay'>
                    <div className='contenedorModal'>
                        <div className="forgot-password-container">
                            <h2>Recuperar Contraseña</h2>
                            <form onSubmit={handlePasswordReset}>
                                <div>
                                    <label htmlFor="email">Correo Electrónico:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit">Enviar Enlace de Recuperación</button>
                            </form>
                            {message && <p className="success-message">{message}</p>}
                            {error && <p className="error-message">{error}</p>}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default RecoverPassword;