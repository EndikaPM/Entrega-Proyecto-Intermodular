import Api from './Api';

const api_auth = Api(8081);

// Función para iniciar sesión
const login = async (email, password) => {
    try {
        const response = await api_auth.post('/auth/login', {
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

// Función para registrar un nuevo usuario
const register = async (userData) => {
    try {
        const datosRegistro = {
            dni: userData.dni,
            firstName: userData.nombre,
            lastName: userData.apellido,
            email: userData.email,
            password: userData.contrasena,
            birthday: userData.fechaNacimiento,
            contractDate: userData.fechaContratacion || null,
            socialSecurity: userData.numeroSeguroSocial || null,
            departamento: userData.department ? { id: userData.department } : { id: 1 }, // Insertamos un objeto Departamento o un id por defecto
            userType: 'Empleado'  // Tipo de usuario por defecto
        };
        const response = await Api.post('/usuarios', datosRegistro);//axios.post esto lo usauos para hablar con el microservicio
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Error al registrar. Intenta de nuevo.';
    }
};

// MÉTODO PARA ACTUALIZAR PERFIL
const updateProfile = async (dni, datosActualizados) => {
    try {
        const response = await Api.put(`/usuarios/${dni}`, datosActualizados); // axios.put para actualizar datos en el backend

        // Actualizar localStorage con los nuevos datos
        if (response.data) {// Si la actualización fue exitosa, actualizamos el usuario en localStorage
            const currentUser = getCurrentUser();
            const updatedUser = {
                ...currentUser,
                ...datosActualizados// Sobrescribimos los campos actualizados
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Error al actualizar perfil';
    }
};

// Exportamos las funciones para usarlas en otros componentes
const AuthService = {
    login,//esto permite que otras componenetes vean estas funciones 
    register, // y las usen para interactuar con el backend
    logout,
    getCurrentUser,
    isAuthenticated,
    updateProfile
};

export default AuthService;