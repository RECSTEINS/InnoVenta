import axios from 'axios';

const ClientAxios = axios.create({
    baseURL: 'http://localhost:7777',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para agregar el token automáticamente a todas las peticiones
ClientAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de autenticación
ClientAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Si el token expiró o no es válido (401), redirigir al login
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default ClientAxios;