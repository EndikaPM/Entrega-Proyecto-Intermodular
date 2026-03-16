import React, { useState }from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Login.css'
import AuthService from '../Services/AuthService.js'

/**
 * LOGIN PAGE - Versión Integrada con Backend
 * 
 * Pantalla de inicio de sesión que se conecta con Spring Boot.
 * 
 * FLUJO COMPLETO:
 * 1. Usuario escribe email y password
 * 2. Hace clic en "Entrar"
 * 3. Se envía POST a http://localhost:8080/api/auth/login
 * 4. Spring Boot valida en MySQL
 * 5. Si OK: Guarda usuario en localStorage y redirige a /dashboard
 * 6. Si ERROR: Muestra mensaje de error
 */

function Login({ onLoginSuccess }) {
    const history = useHistory()
    const [credenciales, setCredenciales] = React.useState({
        email: '',
        password: ''
    })
    // Estado para mensajes de error
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target
        setCredenciales((prev) => ({
            ...prev,
            [name]: value
        }))
        // Limpiar error al escribir
        if (error) {
            setError('');
        }
    };

    /**
   * Maneja el envío del formulario de login
   */
    const iniciarSesion = async (event) => {
        event.preventDefault();
        //QUITAR SI FUNCIONA EL LOGIN CON BACKEND
        console.log('=== INICIO LOGIN ===');
        console.log('Email:', credenciales.email);
        console.log('Password:', credenciales.password ? '***' : '(vacío)');
    
        
        // Validar campos vacíos
        if (!credenciales.email || !credenciales.password) {
            console.error('Campos vacíos');
        setError('Por favor completa todos los campos');
        return;
        }

        try {
        setCargando(true);
        setError('');
            //Borrar cuando funcione el login con backend
        console.log('Enviando petición a backend...');
        // Llamar al backend para autenticar
        const usuario = await AuthService.login(
            credenciales.email,
            credenciales.password
        );

        // Login exitoso
        console.log('Usuario autenticado:', usuario);
        
        // Notificar al componente padre (App.jsx)
        if (onLoginSuccess) {
            onLoginSuccess(usuario);
        }

        // Redirigir al Dashboard
        history.push('/dashboard');

        } catch (err) {
        // Mostrar error
        console.error('Error de login:', err);
        setError(err || 'Error al iniciar sesión. Verifica tus credenciales.');
        
        } finally {
        setCargando(false);
        }
    };

    return (
        <div className="login-layout">
            <aside className="login-side-panel">
                <p className="login-kicker">Timely</p>
                <h1 className="login-side-title">Controla tu jornada en un solo lugar</h1>
                <p className="login-side-copy">
                    Accede para fichar entrada y salida, gestionar tareas y centralizar tu trabajo diario.
                </p>
            </aside>

            <section className="login-form-panel">
                <form className="login-card" onSubmit={iniciarSesion}>
                    <h2 className="login-card-title">Iniciar sesión</h2>
                    <p className="login-card-subtitle">Introduce tu correo y contraseña para continuar</p>

                    {/* Mensaje de error */}
                    {error && (
                        <div className="login-error">
                        {error}
                        </div>
                    )}

                    <label htmlFor="email" className="login-label">Correo electronico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="login-input"
                        value={credenciales.email}
                        onChange={handleChange}
                        placeholder="tu@empresa.com"
                        autoComplete="email"
                        required
                        disabled={cargando}
                    />

                    <label htmlFor="password" className="login-label">Contrasena</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="login-input"
                        value={credenciales.password}
                        onChange={handleChange}
                        placeholder="********"
                        autoComplete="current-password"
                        required
                        disabled={cargando}
                    />

                    <button type="submit" className="login-submit" disabled={cargando}>
                        {cargando ? 'Iniciando sesión...' : 'Entrar'}
                    </button>
                    <a className="registrar" href="#">¿No tienes cuenta? Regístrate</a>
                </form>
            </section>
        </div>
    )
}

export default Login