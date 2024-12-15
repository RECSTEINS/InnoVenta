import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo2 from '../Login/logo-login.png';
import { Link as ScrollLink } from 'react-scroll';

const NavBar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleOpenMenu = () => {
        document.querySelector('.abrir-menu').style.display = 'none';
        setMenuVisible(true);
    };

    const handleCloseMenu = () => {
        document.querySelector('.abrir-menu').style.display = 'block';
        setMenuVisible(false);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <header className='mx-[252px]'>
            <Link to={"/"}>
            <img className="logo" src={Logo2} alt="InnoVenta Logo" />
            </Link>
            <button id="abrir" className="abrir-menu" onClick={handleOpenMenu}>
                <i className="bi bi-list"></i>
            </button>
            <nav className={`nav-1 ${menuVisible ? 'visible' : ''}`} id="nav-1">
                <button id="cerrar" className="cerrar-menu" onClick={handleCloseMenu}>
                    <i className="bi bi-x-circle"></i>
                </button>
                <ul className="nav-list">
                    {/* Inicio con dropdown */}
                    <li className="navbar-list" onClick={toggleDropdown}>
                        Inicio <i class="bi bi-chevron-down"></i>
                        <ul
                            style={{
                                display: dropdownVisible ? 'block' : 'none',
                                position: 'absolute',
                                backgroundColor: '#050038',  // Un color más suave para el fondo
                                color: '#fff',  // Texto blanco para contrastar con el fondo oscuro
                                borderRadius: '8px',  // Bordes redondeados para un aspecto más suave
                                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',  // Sombra más suave
                                listStyle: 'none',
                                padding: '10px 0',
                                margin: 0,
                                zIndex: 1100,
                                paddingLeft:'10px',
                                width: '160px',  // Ancho fijo para que el menú no se distorsione
                                transition: 'all 0.3s ease-in-out',  // Efecto suave al aparecer/desaparecer
                              }}
                        >
                            <li>
                                <ScrollLink
                                    to="beneficios"
                                    smooth={true}
                                    duration={1500}
                                    onClick={() => setDropdownVisible(false)}
                                >
                                    Beneficios
                                </ScrollLink>
                            </li>
                            
                            <li>
                                <ScrollLink
                                    to="demo"
                                    smooth={true}
                                    duration={1500}
                                    onClick={() => setDropdownVisible(false)}
                                >
                                    Demo
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink
                                    to="planes"
                                    smooth={true}
                                    duration={1500}
                                    onClick={() => setDropdownVisible(false)}
                                >
                                    Planes
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink
                                    to="casos"
                                    smooth={true}
                                    duration={1500}
                                    onClick={() => setDropdownVisible(false)}
                                >
                                    Casos
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink
                                    to="resena"
                                    smooth={true}
                                    duration={1500}
                                    onClick={() => setDropdownVisible(false)}
                                >
                                    Reseñas
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink
                                    to="footer"
                                    smooth={true}
                                    duration={1500}
                                    onClick={() => setDropdownVisible(false)}
                                >
                                    Footer
                                </ScrollLink>
                            </li>
                        </ul>
                    </li>
                    {/* Otros links */}
                    <li>
                        <ScrollLink
                            to='planes'
                            smooth={true}
                            duration={1500}
                        >
                            <a style={{color:"#ffffff"}}>Membresía <i class="bi bi-chevron-down"></i></a>
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to='nosostros1'
                            smooth={true}
                            duration={1500}
                        >
                            <a style={{color:"#ffffff"}}>Productos <i class="bi bi-chevron-down"></i></a>
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to='footer'
                            smooth={true}
                            duration={1500}
                        >
                            <a style={{color:"#ffffff"}}>Contacto</a>
                        </ScrollLink>
                    </li>
                </ul>
            </nav>
            <Link to="/login">
                <button className="fondo-boton letra-boton desactivacion-boton">Comenzar</button>
            </Link>
        </header>
    );
};

export default NavBar;