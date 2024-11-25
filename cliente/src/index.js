import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Presentacion from './Components/Home/Presentacion';
import Funcionalidades from './Components/Home/Funcionalidades';
import Login from "./Components/Login/Login";
import DashboardAdmin from "./Components/Dashboard/AdminPanel/Inicio";

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
    path: "/dashboardAdmin",
    element:<DashboardAdmin/>
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
