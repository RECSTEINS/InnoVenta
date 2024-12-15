import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Logo from './logo-login.png';
import "./Login.css";
import DashboardAdmin from "../Dashboard/AdminPanel/InicioAdmin";

function Login() {
    const [password, setPassword] = useState('');
    const [email, setNombre] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const goTo = useNavigate();

    const URL = 'http://localhost:7777/login-list';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                                <label htmlFor="usuario" className="form-label mt-3">Usuario:</label><br />
                                <input
                                    type="text"
                                    className="input-style-login inputs-letra"
                                    id="usuario"
                                    placeholder="Usuario"
                                    onChange={(event) => setNombre(event.target.value)}
                                />
                            </div>
                            <div className="caja-inputs">
                                <label htmlFor="password" className="form-label">Contraseña:</label><br />
                                <input
                                    type="password"
                                    className="input-style-login caja-boton-login boton-letra"
                                    id="password"
                                    placeholder="******"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <br />
                                <Link to={"/recoverPassword"}>
                                    <a style={{marginLeft:"270px"}}>
                                        ¿Has olvidado tu contraseña?
                                    </a>
                                </Link>
                            </div>
                            <button type="submit" className="input-boton-login caja-boton boton-letra">Ingresar</button>
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
