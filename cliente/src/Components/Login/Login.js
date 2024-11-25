import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import './Login.css';
import DashboardAdmin from "../Dashboard/AdminPanel/Inicio";

import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const goTo = useNavigate();

    const URL = 'http://localhost:7777/getUsuarios';
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
                    nombre: nombre,
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
            {loginSuccessful ? <DashboardAdmin/> :
                <main class="form-signin w-100 m-auto">
                    <form onSubmit={handleSubmit}>
                        <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
                        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    
                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => setNombre(event.target.value)}/>
                            <label for="floatingInput">Email address</label>
                        </div>
                    
                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                            <label for="floatingPassword">Password</label>
                        </div>
    
                   
                        <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
                    </form>
                </main>
            }
        </>
    );
}

export default Login;