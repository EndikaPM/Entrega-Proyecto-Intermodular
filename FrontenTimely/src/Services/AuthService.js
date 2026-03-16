import axios from 'axios';

/**
 * AUTH SERVICE - Servicio de Autenticación para React
 * 
 * Este archivo maneja todas las peticiones HTTP relacionadas con autenticación.
 * Conecta el frontend (React) con el backend (Spring Boot).
 * 
 * IMPORTANTE: Cambiar la baseURL a tu servidor Spring Boot
 */

// URL base de tu API Spring Boot

const API_URL = 'http://localhost:8081/api/auth/';

/**
 * Inicia sesión con email y contraseña.
 * 
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise} Promesa con los datos del usuario
 * 
 * Ejemplo de uso:
 * const usuario = await AuthService.login('juan@empresa.com', '123456');
 */

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}login`, {
            email,
            password
        });
    // Si el login es exitoso, guardamos los datos del usuario en localStorage
    // (para mantener la sesión aunque el usuario refresque la página)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        }
        
        return response.data;
    } catch (error) {
        // Si hay error, Spring Boot devolverá { "error": "mensaje" }
        throw error.response?.data?.error || 'Error al iniciar sesión';
    }
};

/**
 * Cierra la sesión del usuario.
 * Elimina los datos guardados en localStorage.
 */
const logout = () => {
    localStorage.removeItem('user');
};

/**
 * Obtiene el usuario actual desde localStorage.
 * 
 * @returns {Object|null} Datos del usuario o null si no hay sesión
 */
const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};

/**
 * Verifica si hay un usuario con sesión activa.
 * 
 * @returns {boolean} true si hay sesión, false si no
 */

const isAuthenticated = () => {
    return getCurrentUser() !== null;
};

/**
 * Registra un nuevo usuario.
 * 
 * @param {Object} datos - Objeto con los datos del usuario
 * @returns {Promise} Promesa con la respuesta del servidor
 * 
 * Ejemplo de uso:
 * const resultado = await AuthService.register({
 *     nombre: 'Juan',
 *     apellido: 'García',
 *     email: 'juan@empresa.com',
 *     contrasena: '123456',
 *     dni: '12345678A'
 * });
 */
const register = async (datos) => {
    try {
        const response = await axios.post(`${API_URL}register`, datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Error al registrar. Intenta de nuevo.';
    }
};

// Exportamos las funciones para usarlas en otros componentes
const AuthService = {
    login,
    register,
    logout,
    getCurrentUser,
    isAuthenticated
};

export default AuthService;