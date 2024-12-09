import React, { useState } from "react";
import "./css/InicioMesero.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

import OrdenesVentasPanel from "./Ordenes/Ordenes_Ventas.js";


function InicioAdmin(){
    const [isMenuActive, setMenuActive] = useState(false);
    const [activeView, setActiveView] = useState("");


    /*const toggleMenu = () => {
        setMenuActive(!isMenuActive);
    };*/
    const handleViewChange = (view) => {
        setActiveView(view);
    };


    const renderContent = () => {
        switch (activeView){
            case "inicio":
                return  <div className="">
                            <img />
                        </div>;
            case "ordenes":
                return  <div>
                            <OrdenesVentasPanel/>
                        </div>
        }
    }

    return(
        <div className="container-fluid">
            <div className="row">
            {/* Panel Izquierdo */}
                <div className={`col-2 text-white vh-100 d-flex flex-column dashboard-izquierdo ${
                    isMenuActive ? "active" : "" }`}>
                    <h2 className="text-center py-5"><p></p></h2>
                    <ul className="nav flex-column">
                        <li className={`nav-item ${activeView === "inicio" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link dashboard-inicio"
                                onClick={() => handleViewChange("inicio")}>
                                Inicio
                            </Link>
                        </li>

                        <li className={`nav-item ${activeView === "ordenes" ? "active" : ""}`}>
                            <Link
                                to=""
                                className="nav-link  "
                                onClick={() => handleViewChange("ordenes")}
                            >
                                <i className="bi bi-list-check icono-dash-ordenes me-1 mt-5"></i>Ordenes
                            </Link>
                        </li>

                       
                        <li className="nav-item ">
                            <Link to="/login" className="nav-link cerrar-sesion-dashboard-mesero">
                            <i className="bi bi-box-arrow-right   icono-dash"></i> Cerrar sesión
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contenido Principal */}
                <div className="col-9 ">
                    {/* Barra Superior */}
                    <div className="d-flex  align-items-end  text-white py-2 px-4 barra-superior-dashboard">
                        <p className="rol-dashboard-mesero">Mesero</p>
                    </div>

                    {/* Contenido Dinámico */}
                    <div className="p-4 contenido-dashboard">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}

export default InicioAdmin;