import React, { useState } from "react";
import "./css/Inicio.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import EmpleadosPanel from "./Empleados/Empleados";
import UsuariosPanel from "./Usuarios/Usuarios";
import InventarioPanel from "./Inventario/Inventario.js";
import PagosPanel from "./Pagos/Pagos.js";
import PlatillosPanel from "./Platillos/Platillo.js";
import OrdenesVentasPanel from "./Ordenes/Ordenes_Ventas.js";
import ReportePanel from "./Reports/Reporte.js";

import Graficas from "./graficas.js";

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
            case "cobro":
                return  <div>
                            <PagosPanel/>
                        </div>
            case "inventario":
                return  <div>
                            <InventarioPanel/>
                        </div>
            case "platillos":
                return  <div>
                            <PlatillosPanel/>
                        </div>
            case "empleados":
                return  <div>
                            <EmpleadosPanel/>
                        </div>
            case "usuarios":
                return  <div>
                            <UsuariosPanel/>
                        </div>
            case "reportes":
                return  <div>
                            <ReportePanel/>
                        </div>
            case "roles":
                return  <div>
                            <Graficas/>
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

                        <li className={`nav-item ${activeView === "cobro" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link icono-otros"
                                onClick={() => handleViewChange("cobro")}>
                                <i className="bi bi-cash-coin me-1 icono-dashboard2 icono-dash"></i>Pago/Cobro
                            </Link>
                        </li>

                        <li className={`nav-item ${activeView === "inventario" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link icono-otros"
                                onClick={() => handleViewChange("inventario")}>
                                <i className="bi bi-box-seam me-1 icono-dashboard2 icono-dash"></i>Inventario
                            </Link>
                        </li>

                        <li className={`nav-item ${activeView === "platillos" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link icono-otros"
                                onClick={() => handleViewChange("platillos")}>
                                    
                                    <FontAwesomeIcon icon={faUtensils} className="icono-ventas"/>Platillos
                            </Link>
                        </li>

                        <li className={`nav-item ${activeView === "usuarios" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link icono-otros"
                                onClick={() => handleViewChange("usuarios")}>
                               <i className="bi bi-person-video me-4 icono-dashboard icono-dash-20"></i> Usuarios
                            </Link>
                        </li>

                        <li className={`nav-item ${activeView === "reportes" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link icono-otros"
                                onClick={() => handleViewChange("reportes")}>
                               <i className="bi bi-clipboard-fill me-1 icono-dashboard2 icono-dash"></i> Reportes
                            </Link>
                        </li>
                        <li className={`nav-item ${activeView === "roles" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link icono-otros"
                                onClick={() => handleViewChange("roles")}>
                               <i className="bi bi-person-badge-fill  icono-dashboard2 icono-dash"></i> Roles
                            </Link>
                        </li>

                        <li className={`nav-item ${activeView === "empleados" ? "active" : ""}`}>
                            <Link
                                to="#"
                                className="nav-link icono-otros"
                                onClick={() => handleViewChange("empleados")}>
                               <i className="bi bi-people-fill me-4 icono-dashboard icono-dash-20"></i> Empleados
                            </Link>
                        </li>
                        
                        <li className="nav-item ">
                            <Link to="/login" className="nav-link cerrar-sesion-dashboard">
                            <i className="bi bi-box-arrow-right   icono-dash"></i> Cerrar sesión
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contenido Principal */}
                <div className="col-9 ">
                    {/* Barra Superior */}
                    <div className="d-flex  align-items-end  text-white py-2 px-4 barra-superior-dashboard">
                        <p className="rol-dashboard">Administrador</p>
                    </div>

                    {/* Contenido Dinámico */}
                    <div className="p-4 contenido-dashboard">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}

export default InicioAdmin;