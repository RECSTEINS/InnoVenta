import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Login from "./Components/Login/Login";
import Unauthorized from "./Components/Unauthorized";

import DashboardSupervisor from "./Components/Dashboard/SupervisorPanel/InicioSupervisor";
import DashboardAdmin from "./Components/Dashboard/AdminPanel/InicioAdmin";
import DashboardCajero from "./Components/Dashboard/CajeroPanel/InicioCajero";
import DashboardMesero from "./Components/Dashboard/MeseroPanel/InicioMesero";
import EmpleadosPanel from "./Components/Dashboard/AdminPanel/Empleados/Empleados";
import RecoverPassword from './Components/Login/RecoverPassword';
import UpdatePassword from './Components/Login/UpdatePassword';
import RegisterPage from './Components/Login/RegisterPage';
import Tarjeta from './Components/Home/Tarjeta';
import Success from './Components/Payments/Success.jsx';
import Cancel from './Components/Payments/Cancel.jsx';

// Importar componentes de autenticación
import { AuthProvider } from './Auth/AuthContext';
import ProtectedRoute from './Auth/ProtectedRoute';

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
    path: "/unauthorized",
    element:<Unauthorized/>
  },
  {
    path: "/recoverPassword",
    element:<RecoverPassword/>
  },
  {
    path: "/RegisterPage",
    element:<RegisterPage/>
  },

  // Rutas protegidas por rol
  {
    path: "/admin-panel",
    element:<ProtectedRoute requiredRole="admin"><DashboardAdmin/></ProtectedRoute>
  },
  {
    path: "/supervisor-panel",
    element:<ProtectedRoute requiredRole="supervisor"><DashboardSupervisor/></ProtectedRoute>
  },
  {
    path: "/cajero-panel",
    element:<ProtectedRoute requiredRole="cajero"><DashboardCajero/></ProtectedRoute>
  },
  {
    path: "/mesero-panel",
    element:<ProtectedRoute requiredRole="mesero"><DashboardMesero/></ProtectedRoute>
  },

  // Rutas legacy (mantener compatibilidad)
  {
    path: "/dashboardAdmin",
    element:<ProtectedRoute requiredRole="admin"><DashboardAdmin/></ProtectedRoute>
  },
  {
    path: "/empleados",
    element:<ProtectedRoute requiredRole="admin"><EmpleadosPanel/></ProtectedRoute>
  },
  {
    path:"/dashboardSupervisor",
    element:<ProtectedRoute requiredRole="supervisor"><DashboardSupervisor/></ProtectedRoute>
  },
  {
    path:"/dashboardCajero",
    element:<ProtectedRoute requiredRole="cajero"><DashboardCajero/></ProtectedRoute>
  },
  {
    path:"/dashboardMesero",
    element:<ProtectedRoute requiredRole="mesero"><DashboardMesero/></ProtectedRoute>
  },
  {
    path:"/updatePassword",
    element:<UpdatePassword/>
  },
  {
    path:"/pagosTarjeta",
    element:<Tarjeta/>
  },
  {
    path:"/success",
    element:<Success/>
  },
  {
    path:"/cancel",
    element:<Cancel/>
  },
  
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
