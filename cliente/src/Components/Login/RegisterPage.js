import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Logo from './logo-login.png';
import "./RegisterPage.css";

function RegisterPage() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rol, setRol] = useState('Usuario');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [rfc, setRfc] = useState('');
    const [nss, setNss] = useState('');
    const [fkRestaurante, setFkRestaurante] = useState('');
    const [restaurantes, setRestaurantes] = useState([]);
    const [genero, setGenero] = useState(''); // Nuevo estado para género
    const [usuarioNombre, setUsuarioNombre] = useState(''); // Nuevo estado
    const [passwordError, setPasswordError] = useState('');

    const goTo = useNavigate();

    useEffect(() => {
        // Obtener la lista de restaurantes al cargar el componente
        fetch('http://localhost:7777/getRestaurantes')
            .then(res => res.json())
            .then(data => setRestaurantes(data))
            .catch(err => console.error('Error al obtener restaurantes:', err));
    }, []);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setPasswordError('');

        if (!passwordRegex.test(password)) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden.',
            });
            return;
        }

        // Validar que todos los campos estén presentes
        if (!nombre || !apellido || !email || !password || !rol || !edad || !telefono || !direccion || !rfc || !nss || !fkRestaurante || !genero) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios.',
            });
        }

        try {
            const response = await fetch('http://localhost:7777/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario_nombre: usuarioNombre, // Nuevo campo
                    nombre,
                    apellido,
                    email,
                    password,
                    rol,
                    edad,
                    telefono,
                    direccion,
                    rfc,
                    nss,
                    fk_restaurante: fkRestaurante,
                    genero,
                }),
            });

            const result = await response.json();

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Usuario registrado exitosamente.',
                });
                goTo('/login');
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
                text: 'Error al registrar el usuario. Por favor, intenta nuevamente.',
            });
            console.error("Error al registrar el usuario: ", error);
        }
    };

    return (
        <>
            <NavBar />
            <main className="row g-0">
                <div className="col-7 caja-informativa">
                    <p className="login-title">Registro</p>
                    <form onSubmit={handleSubmit}>
                        {/* 1. Datos de acceso */}
                        <div>
                            <label htmlFor="usuarioNombre" className="form-label mt-3">Nombre de usuario:</label><br />
                            <input
                                type="text"
                                className="input-style-login inputs-letra"
                                id="usuarioNombre"
                                placeholder="Nombre de usuario"
                                value={usuarioNombre}
                                onChange={(event) => setUsuarioNombre(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="form-label mt-3">Email:</label><br />
                            <input
                                type="email"
                                className="input-style-login inputs-letra"
                                id="email"
                                placeholder="Email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="form-label mt-3">Contraseña:</label><br />
                            <input
                                type="password"
                                className="input-style-login inputs-letra"
                                id="password"
                                placeholder="******"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                            <small style={{ color: "#888", marginLeft: "150px", display: "block" }}>
                                La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.
                            </small>
                            {passwordError && (
                                <small style={{ color: "red", marginLeft: "150px", display: "block" }}>
                                    {passwordError}
                                </small>
                            )}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="form-label mt-3">Confirmar Contraseña:</label><br />
                            <input
                                type="password"
                                className="input-style-login inputs-letra"
                                id="confirmPassword"
                                placeholder="******"
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        {/* 2. Datos personales */}
                        <div>
                            <label htmlFor="nombre" className="form-label mt-3">Nombre:</label><br />
                            <input
                                type="text"
                                className="input-style-login inputs-letra"
                                id="nombre"
                                placeholder="Nombre"
                                onChange={(event) => setNombre(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="apellido" className="form-label mt-3">Apellido:</label><br />
                            <input
                                type="text"
                                className="input-style-login inputs-letra"
                                id="apellido"
                                placeholder="Apellido"
                                onChange={(event) => setApellido(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="genero" className="form-label mt-3">Género:</label><br />
                            <select
                                className="input-style-login inputs-letra"
                                id="genero"
                                value={genero}
                                onChange={(event) => setGenero(event.target.value)}
                                required
                            >
                                <option value="">Selecciona un género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="edad" className="form-label mt-3">Edad:</label><br />
                            <input
                                type="number"
                                className="input-style-login inputs-letra"
                                id="edad"
                                placeholder="Edad"
                                onChange={(event) => setEdad(event.target.value)}
                            />
                        </div>
                        {/* 3. Datos de contacto */}
                        <div>
                            <label htmlFor="telefono" className="form-label mt-3">Teléfono:</label><br />
                            <input
                                type="text"
                                className="input-style-login inputs-letra"
                                id="telefono"
                                placeholder="Teléfono"
                                onChange={(event) => setTelefono(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="direccion" className="form-label mt-3">Dirección:</label><br />
                            <input
                                type="text"
                                className="input-style-login inputs-letra"
                                id="direccion"
                                placeholder="Dirección"
                                onChange={(event) => setDireccion(event.target.value)}
                            />
                        </div>
                        {/* 4. Datos laborales */}
                        <div>
                            <label htmlFor="rfc" className="form-label mt-3">RFC:</label><br />
                            <input
                                type="text"
                                className="input-style-login inputs-letra"
                                id="rfc"
                                placeholder="RFC"
                                onChange={(event) => setRfc(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="nss" className="form-label mt-3">NSS:</label><br />
                            <input
                                type="text"
                                className="input-style-login inputs-letra"
                                id="nss"
                                placeholder="NSS"
                                onChange={(event) => setNss(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="rol" className="form-label mt-3">Rol:</label><br />
                            <select
                                className="input-style-login inputs-letra"
                                id="rol"
                                value={rol}
                                onChange={(event) => setRol(event.target.value)}
                            >
                                <option value="Usuario">Usuario</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Cajero">Cajero</option>
                                <option value="Mesero">Mesero</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fkRestaurante" className="form-label mt-3">Restaurante:</label><br />
                            <select
                                className="input-style-login inputs-letra"
                                id="fkRestaurante"
                                value={fkRestaurante}
                                onChange={(event) => setFkRestaurante(event.target.value)}
                                required
                            >
                                <option value="">Selecciona un restaurante</option>
                                {restaurantes.map(rest => (
                                    <option key={rest.pk_restaurante} value={rest.pk_restaurante}>
                                        {rest.restaunrate_nombre || rest.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="input-boton-login caja-boton boton-letra">Registrarse</button>
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

export default RegisterPage;
