import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import './Login.css';
import DashboardAdmin from "../Dashboard/AdminPanel/InicioAdmin";
import NavBar from '../Home/Navbar';
import Footer from '../Home/Footer';

import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [password, setPassword] = useState('');
    const [email, setNombre] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const goTo = useNavigate();

    const URL = 'http://localhost:7777/login-list';
    const [users, setUsers] = useState([]);

    useEffect(() => {
        showData();
    }, []);

    const showData = async () => {
        try{
            const response = await fetch(URL);
            const data = await response.json();
            setUsers(data);
        }catch(error){
            console.error("Error al obtener los usuarios: ", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:7777/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }) 
            });

            const result = await response.json();

            if (response.status === 200){
                setLoginSuccessful(true);

                showData();

                //const userRol = result.rol;

                goTo('/dashboardAdmin');
            }
            else{
                setLoginSuccessful(false);
                console.error(result.message);
                alert(result.message);
            }
        } catch(error){
            console.error("Error al iniciar sesión: ", error)
        }
    };


    return(
        
        <>
            <NavBar/>
            {loginSuccessful ? <DashboardAdmin/> :
                <main class="caja-principal">
                    <div class="caja-informativa">
                        <h1>Bienvenido</h1>
                        <form onSubmit={handleSubmit}>
                            <div class="">
                                <label for="usuario" class="">Usuario:</label><br/>
                                <input type='text' class="input-style inputs-letra" id="usuario" placeholder='Usuario' onChange={(event) => setNombre(event.target.value)}/>
                            </div>
                            <div class="caja-inputs">
                                <label for="password" class="">Contrseña:</label><br/>
                                <input type="password" class="input-boton caja-boton boton-letra" id="password" placeholder='******' onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                            <button type='submit' class="input-boton caja-boton boton-letra">Ingresar</button>
                        </form>
                    </div>
                </main>
            }
            <Footer/>
        </>
    );
}

export default Login;