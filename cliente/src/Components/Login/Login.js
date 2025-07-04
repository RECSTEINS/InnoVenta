import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Logo from './logo-login.png';
import "./Login.css";
import DashboardAdmin from "../Dashboard/AdminPanel/InicioAdmin";
import { auth, provider } from "../../Auth/firebaseConfig";
import { signInWithPopup, getAuth, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [password, setPassword] = useState('');
    const [email, setNombre] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const goTo = useNavigate();

    const URL = 'http://localhost:7777/login-list';

    // Regular expressions for validation
    const emailRegex = /^\d{9}@upqroo\.edu\.mx$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        showData();
    }, []);

    const showData = async () => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error al obtener los usuarios: ", error);
        }
    };

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

        try {
            const response = await fetch('http://localhost:7777/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const result = await response.json();

            if (response.status === 200) {
                const userRol = result.rol;

                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Inicio de sesión exitoso.',
                });

                if (userRol === 'Administrador') {
                    goTo('/dashboardAdmin');
                } else if (userRol === 'Supervisor') {
                    goTo('/dashboardSupervisor');
                } else if (userRol === 'Cajero') {
                    goTo('/dashboardCajero');
                } else if (userRol === 'Mesero') {
                    goTo('/dashboardMesero');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al iniciar sesión. Por favor, intenta nuevamente.',
            });
            console.error("Error al iniciar sesión: ", error);
        }
    };

    const handleGoogleLogin = async () => {
        // Validación de formato
        if (emailError || passwordError) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, verifica que el formato del correo y la contraseña sean correctos antes de continuar.',
            });
            return;
        }

        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos antes de continuar.',
            });
            return;
        }

        try {
            // Intentar login con email/contraseña
            await signInWithEmailAndPassword(auth, email, password);
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Has iniciado sesión correctamente.",
            });
            // Aquí puedes redirigir si lo deseas
            // goTo("/");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No existe una cuenta con este correo electrónico.",
                });
            } else if (error.code === "auth/wrong-password") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "La contraseña es incorrecta.",
                });
            } else if (error.code === "auth/invalid-email") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "El correo electrónico no es válido.",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo iniciar sesión. Por favor, intenta nuevamente.",
                });
            }
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <>
            <NavBar />
            {loginSuccessful ? (
                <DashboardAdmin />
            ) : (
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
                                <button type="submit" className="input-boton-login caja-boton boton-letra">Ingresar</button>
                                <button
                                    type="button"
                                    className="input-boton-login caja-boton boton-letra"
                                    style={{ marginTop: "10px", backgroundColor: "#DB4437" }}
                                    onClick={handleGoogleLogin}
                                >
                                    Iniciar sesión con Google
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
            )}
            <Footer />
        </>
    );
}

export default Login;