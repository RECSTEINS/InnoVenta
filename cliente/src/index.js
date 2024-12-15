import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Login from "./Components/Login/Login";

import DashboardSupervisor from "./Components/Dashboard/SupervisorPanel/InicioSupervisor";
import DashboardAdmin from "./Components/Dashboard/AdminPanel/InicioAdmin";
import DashboardCajero from "./Components/Dashboard/CajeroPanel/InicioCajero";
import DashboardMesero from "./Components/Dashboard/MeseroPanel/InicioMesero";
import EmpleadosPanel from "./Components/Dashboard/AdminPanel/Empleados/Empleados";
import RecoverPassword from './Components/Login/RecoverPassword';
import UpdatePassword from './Components/Login/UpdatePassword';
import Tarjeta from './Components/Home/Tarjeta';

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
    path:"/dashboardSupervisor",
    element:<DashboardSupervisor/>
  },
  {
    path:"/dashboardCajero",
    element:<DashboardCajero/>
  },
  {
    path:"/dashboardMesero",
    element:<DashboardMesero/>
  },
  {
    path:"/updatePassword",
    element:<UpdatePassword/>
  },
  {
    path:"/pagosTarjeta",
    element:<Tarjeta/>
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
