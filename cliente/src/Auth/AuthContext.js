import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from '../Config/axios';

// Estados iniciales
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true
};

// Tipos de acciones
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  RESTORE_SESSION: 'RESTORE_SESSION'
};

// Reducer para manejar el estado
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    
    case AUTH_ACTIONS.LOGIN_FAIL:
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case AUTH_ACTIONS.RESTORE_SESSION:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false
      };
    
    default:
      return state;
  }
};

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      
      const response = await axios.post('/login', { email, password });
      const { token, user } = response.data;
      
      // Guardar token en localStorage
      localStorage.setItem('token', token);
      
      // Configurar el token en axios para futuras peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, token }
      });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAIL });
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al iniciar sesión' 
      };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Remover token de localStorage
    localStorage.removeItem('token');
    
    // Remover token de axios
    delete axios.defaults.headers.common['Authorization'];
    
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (requiredRole) => {
    return state.user && state.user.rol === requiredRole;
  };

  // Función para verificar si el usuario tiene uno de varios roles
  const hasAnyRole = (roles) => {
    return state.user && roles.includes(state.user.rol);
  };

  // Restaurar sesión al cargar la aplicación
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Configurar el token en axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verificar si el token es válido haciendo una petición al backend
          const response = await axios.get('/verify-token');
          const { user } = response.data;
          
          dispatch({
            type: AUTH_ACTIONS.RESTORE_SESSION,
            payload: { user }
          });
        } catch (error) {
          // Si el token no es válido, limpiar todo
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    restoreSession();
  }, []);

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    login,
    logout,
    hasRole,
    hasAnyRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
