import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Presentacion from './Components/Home/Presentacion';
import Funcionalidades from './Components/Home/Funcionalidades';
import Login from "./Components/Login/Login";


import DashboardAdmin from "./Components/Dashboard/AdminPanel/InicioAdmin";
import EmpleadosPanel from "./Components/Dashboard/AdminPanel/Empleados/Empleados";
import RolesPanel from "./Components/Dashboard/AdminPanel/Roles";
import AgregarEmpleado from './Components/Dashboard/AdminPanel/Empleados/AgregarEmpleado';
import RecoverPassword from './Components/Login/RecoverPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/recoverPassword",
    element:<RecoverPassword/>
  },

  //Admin Paneles
  {
    path: "/dashboardAdmin",
    element:<DashboardAdmin/>
  },
  {
    path: "/empleados",
    element:<EmpleadosPanel/>
  },
  {
    path: "/roles",
    element:<RolesPanel/>
  },




  //Eliminar despues 
  {
    path: "/agregarEmpleado",
    element: <AgregarEmpleado/>
  }


])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
