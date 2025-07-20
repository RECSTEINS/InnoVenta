import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/useAuth';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGoHome = () => {
    // Redirigir al usuario a su panel correspondiente según su rol
    switch (user?.rol) {
      case 'admin':
      case 'Administrador':
        navigate('/admin-panel');
        break;
      case 'supervisor':
      case 'Supervisor':
        navigate('/supervisor-panel');
        break;
      case 'cajero':
      case 'Cajero':
        navigate('/cajero-panel');
        break;
      case 'mesero':
      case 'Mesero':
        navigate('/mesero-panel');
        break;
      default:
        navigate('/');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-danger mb-4">
                <i className="fas fa-exclamation-triangle"></i>
              </h1>
              <h2 className="text-danger mb-3">Acceso No Autorizado</h2>
              <p className="text-muted mb-4">
                No tienes permisos para acceder a esta página.
              </p>
              <div className="d-grid gap-2 d-md-block">
                <button 
                  className="btn btn-primary me-md-2" 
                  onClick={handleGoHome}
                >
                  Ir a mi Panel
                </button>
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 