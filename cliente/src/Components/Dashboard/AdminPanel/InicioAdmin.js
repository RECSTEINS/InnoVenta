import React, { useState } from "react";
import "./css/Inicio.css";
import { Link } from "react-router-dom";

import EmpleadosPanel from "./Empleados/Empleados";
import AgregarEmpleado from "./Empleados/AgregarEmpleado";

function InicioAdmin(){
    const [isMenuActive, setMenuActive] = useState(false);
    const [activeView, setActiveView] = useState("");


    const toggleMenu = () => {
        setMenuActive(!isMenuActive);
    };
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
            case "agregarEmpleado":
                return  <div>
                            <Link to={"/agregarEmpleado"}>

                            </Link>
                        </div>
        }


    }

    return(
        <div className="dashboard-container">
      <div className={`dashboard ${isMenuActive ? "active" : ""}`}>
      <div className={"containe"}>
        <div className="navigation">
          <ul>
            <li>
              <a href="" onClick={() => handleViewChange("inicio")}>
                <span className="icon">
                  <ion-icon name="logo-apple-ar"></ion-icon>
                </span>
                <span className="title">INNOVENTA</span>
              </a>
            </li>
            <li>
                <Link to={""} onClick={() => handleViewChange("inicio")}>
                    <span className="icon">
                        <ion-icon name="home-outline"></ion-icon>
                    </span>
                    <span className="title">Inicio</span>
                </Link>
            </li>
            <li>
                <Link to={""} onClick={() => handleViewChange("empleados")}>
                    <span className="icon">
                        <ion-icon name="people-outline"></ion-icon>
                    </span>
                    
                      <span className="title">Empleados</span>
                    
                </Link>
            </li>
            <li>
                <Link to={"/agregarEmpleado"}>
                    <span className="icon">
                        <ion-icon name="people-outline"></ion-icon>
                    </span>
                    
                      <span className="title">Ventas</span>
                </Link>
            </li>

            <li>
                <Link to={""} onClick={() => handleViewChange("empleados")}>
                    <span className="icon">
                        <ion-icon name="people-outline"></ion-icon>
                    </span>
                    
                      <span className="title">Reportes</span>
                </Link>
            </li>            
            <li>
                <Link to={""} onClick={() => handleViewChange("empleados")}>
                    <span className="icon">
                        <ion-icon name="people-outline"></ion-icon>
                    </span>
                    
                      <span className="title">Platillos</span>
                </Link>
            </li>
 
            <li>
                <Link to={""} onClick={() => handleViewChange("empleados")}>
                    <span className="icon">
                        <ion-icon name="people-outline"></ion-icon>
                    </span>
                    
                      <span className="title">Roles</span>
                </Link>
            </li>
            <li>
                <Link to={""} onClick={() => handleViewChange("empleados")}>
                    <span className="icon">
                        <ion-icon name="people-outline"></ion-icon>
                    </span>
                    
                      <span className="title">Pagos</span>
                </Link>
            </li>
            <li>
                <Link to={"/login"}>
                    <span className="icon">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                    <span className="title">Cerrar sesión</span>
                </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={`main_dashboard ${isMenuActive ? "active" : ""}`}>
        <div className="topbar_dashboard">
          <div className="toggle_dashboard" onClick={toggleMenu}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>
        </div>
        <div className="Contenido">
          {renderContent()} {/* Renderizar el contenido dinámico */}
        </div>
      </div>
    </div>
    </div>
    )
}

export default InicioAdmin;