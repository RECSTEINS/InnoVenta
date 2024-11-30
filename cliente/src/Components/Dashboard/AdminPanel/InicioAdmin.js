import React, { useState } from "react";
import "./css/Inicio.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 

import EmpleadosPanel from "./Empleados/Empleados";
import UsuariosPanel from "./Usuarios/Usuarios";
import InventarioPanel from "./Inventario/Inventario.js";

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
            case "empleados":
                return  <div>
                            <EmpleadosPanel/>
                        </div>
            case "usuarios":
                return  <div>
                            <UsuariosPanel/>
                        </div>
            case "inventario":
                return <div>
                            <InventarioPanel/>
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
                                className="nav-link"
                                onClick={() => handleViewChange("inicio")}>
                                Inicio
                            </Link>
                        </li>
                        <li className={`nav-item ${activeView === "empleados" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link"
                                onClick={() => handleViewChange("empleados")}>
                                Empleados  <i className="bi bi-people-fill me-4 icono-dashboard"></i>
                            </Link>
                        </li>
                        <li className={`nav-item ${activeView === "usuarios" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link"
                                onClick={() => handleViewChange("usuarios")}>
                                Usuarios  <i className="bi bi-people-fill me-4 icono-dashboard"></i>
                            </Link>
                        </li>

                        <li className={`nav-item ${activeView === "inventario" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link"
                                onClick={() => handleViewChange("inventario")}>
                                Inventario<i className="bi bi-box-seam me-1 icono-dashboard2"></i>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to=""
                                className="nav-link"
                                onClick={() => handleViewChange("ventas")}
                            >
                                Ventas/Ordenes<i className="bi bi-cash-coin me-1 mx-4 "></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Cerrar sesión<i className="bi bi-box-arrow-right me-4 mx-5 "></i>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contenido Principal */}
                <div className="col-9 ">
                    {/* Barra Superior */}
                    <div className="d-flex  align-items-end  text-white py-2 px-4 barra-superior-dashboard">
                        <h5 className="rol-dashboard">Administrador</h5>
                    </div>

                    {/* Contenido Dinámico */}
                    <div className="p-4 contenido-dashboard">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}

export default InicioAdmin;