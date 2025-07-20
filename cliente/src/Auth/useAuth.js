import { useAuth as useAuthContext } from './AuthContext';

// Hook personalizado que re-exporta el contexto de autenticación
export const useAuth = useAuthContext;
