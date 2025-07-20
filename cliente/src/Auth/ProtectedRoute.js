import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  allowedRoles = null,
  redirectTo = '/login',
  unauthorizedRedirectTo = '/unauthorized'
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si se requiere un rol específico
  if (requiredRole) {
    // Mapear roles del backend a roles del frontend
    const roleMapping = {
      'admin': ['admin', 'Administrador'],
      'supervisor': ['supervisor', 'Supervisor'],
      'cajero': ['cajero', 'Cajero'],
      'mesero': ['mesero', 'Mesero']
    };
    
    const allowedRoles = roleMapping[requiredRole] || [requiredRole];
    
    if (!allowedRoles.includes(user.rol)) {
      return <Navigate to={unauthorizedRedirectTo} replace />;
    }
  }

  // Si se especifican roles permitidos
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.rol)) {
      return <Navigate to={unauthorizedRedirectTo} replace />;
    }
  }

  // Si pasa todas las validaciones, mostrar el contenido
  return children;
};

export default ProtectedRoute;
