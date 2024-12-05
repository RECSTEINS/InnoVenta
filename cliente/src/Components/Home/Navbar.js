import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Navbar.css';
import { Button } from 'bootstrap';
import Logo from '../../Assets/Img_Home/Logo.png';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo2 from '../Login/logo-login.png'

const NavBar = () =>{

    const [menuVisible, setMenuVisible] = useState(false);

    const handleOpenMenu = () => {
        document.querySelector('.abrir-menu').style.display = 'none';
        setMenuVisible(true);
    };
 
    const handleCloseMenu = () => {
        document.querySelector('.abrir-menu').style.display = 'block';
        setMenuVisible(false);
    };
 
    return(
        <header>
            <img className="logo" src={Logo2} alt="InnoVenta Logo" />
            <button id="abrir" className="abrir-menu" onClick={handleOpenMenu}>
                <i className="bi bi-list"></i>
            </button>
            <nav className={`nav-1 ${menuVisible ? 'visible' : ''}`} id="nav-1">
                <button id="cerrar" className="cerrar-menu" onClick={handleCloseMenu}>
                    <i className="bi bi-x-circle"></i>
                </button>
                <ul className="nav-list">
                    <Link to={"/"} >
                        <li className='navbar-list'>Inicio</li>
                    </Link>
                    <li><a href="#">Membresia</a></li>
                    <li><a href="#">Productos</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </nav>
            <Link to={"/login"}>
                <button className="fondo-boton letra-boton desactivacion-boton">Comenzar</button>
            </Link>
        </header>
    )
};

export default NavBar;