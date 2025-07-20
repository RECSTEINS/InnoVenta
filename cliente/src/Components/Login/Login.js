import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Logo from './logo-login.png';
import "./Login.css";
import { useAuth } from '../../Auth/useAuth';

function Login() {
    const [password, setPassword] = useState('');
    const [email, setNombre] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login, isAuthenticated, user } = useAuth();

    // Regular expressions for validation
    const emailRegex = /^(\d{9}@upqroo\.edu\.mx|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (isAuthenticated && user) {
            // Redirigir según el rol del usuario
            switch (user.rol) {
                case 'admin':
                case 'Administrador':
                    navigate('/admin-panel');
                    break;
                case 'supervisor':
                case 'Supervisor':
                    navigate('/supervisor-panel');
                    break;
                case 'cajero':
                case 'Cajero':
                    navigate('/cajero-panel');
                    break;
                case 'mesero':
                case 'Mesero':
                    navigate('/mesero-panel');
                    break;
                default:
                    navigate('/');
            }
        }
    }, [isAuthenticated, user, navigate]);

    const validateEmail = (value) => {
        setNombre(value);
        setEmailError(!emailRegex.test(value));
    };

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError(!passwordRegex.test(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (emailError || passwordError) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, verifica el formato del correo y la contraseña.',
            });
            return;
        }

        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }

        setIsLoading(true);

        try {
            const result = await login(email, password);
            
            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Inicio de sesión exitoso.',
                });

                // La redirección se maneja en el useEffect
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.error,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al iniciar sesión. Por favor, intenta nuevamente.',
            });
            console.error("Error al iniciar sesión: ", error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            <NavBar />
            <main className="row g-0">
                <div className="col-7 caja-informativa">
                    <p className="login-title">Bienvenido</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="usuario" className="form-label mt-3">Email:</label><br />
                            <input
                                type="text"
                                className={`input-style-login inputs-letra ${emailError ? 'border-danger' : email ? 'border-success' : ''}`}
                                id="usuario"
                                placeholder="Usuario"
                                onChange={(event) => validateEmail(event.target.value)}
                                disabled={isLoading}
                            />
                            {email && (
                                <small className={`d-block mt-1 ${emailError ? 'text-danger' : 'text-success'}`}>
                                    {emailError ? 'Formato de correo incorrecto' : 'Formato de correo correcto'}
                                </small>
                            )}
                        </div>
                        <div className="caja-inputs">
                            <label htmlFor="password" className="form-label">Contraseña:</label><br />
                            <input
                                type="password"
                                className={`input-style-login caja-boton-login boton-letra ${passwordError ? 'border-danger' : password ? 'border-success' : ''}`}
                                id="password"
                                placeholder="******"
                                onChange={(event) => validatePassword(event.target.value)}
                                disabled={isLoading}
                            />
                            {password && (
                                <small className={`d-block mt-1 ${passwordError ? 'text-danger' : 'text-success'}`}>
                                    {passwordError ? 'Formato de contraseña incorrecto' : 'Formato de contraseña correcto'}
                                </small>
                            )}
                            <br />
                            <Link to={"/recoverPassword"}>
                                <a style={{marginLeft:"270px"}}>
                                    ¿Has olvidado tu contraseña?
                                </a>
                            </Link>
                        </div>
                        <div className="login-btn-container">
                            <button 
                                type="submit" 
                                className="input-boton-login caja-boton boton-letra"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    'Ingresar'
                                )}
                            </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-2px' }}>
                            <Link to={"/RegisterPage"}>
                                <span className="register-link">¿No tienes cuenta? Regístrate</span>
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="col-5 caja-decorativa">
                    <img src={Logo} className="logo-login" alt="Logo" />
                </div>
                <div className="rectangulo-login2"></div>
                <div className="rectangulo-login"></div>
            </main>
            <Footer />
        </>
    );
}

export default Login;