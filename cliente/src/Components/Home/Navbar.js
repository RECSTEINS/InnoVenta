import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Navbar.css';
import { Button } from 'bootstrap';
import Logo from '../../Assets/Img_Home/Logo.png';
import React, { useState } from 'react';

const NavBar = () =>{

    const [menuVisible, setMenuVisible] = useState(false);

    const handleOpenMenu = () => {
         console.log("Botón de abrir menú clickeado");
        setMenuVisible(true);
    };
 
    const handleCloseMenu = () => {
        setMenuVisible(false);
    };
 
    return(
            <header>
                <img className="logo" src={Logo} alt="InnoVenta Logo" />
                <button id="abrir" className="abrir-menu" onClick={handleOpenMenu}>
                    <i className="bi bi-list"></i>
                </button>
                <nav className={`nav-1 ${menuVisible ? 'visible' : ''}`} id="nav-1">
                    <button id="cerrar" className="cerrar-menu" onClick={handleCloseMenu}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                    <ul className="nav-list">
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Membresia</a></li>
                        <li><a href="#">Productos</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </nav>
                <button className="fondo-boton letra-boton desactivacion-boton">Comenzar</button>
            </header>
    )
};

export default NavBar;