import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthService from '../Services/AuthService';
import '../styles/Navigation.css'

/**
 * NAVIGATION COMPONENT
 * 
 * Barra de navegación con enlaces a las diferentes páginas.
 * Usa <Link> de react-router-dom en lugar de <a> para evitar
 * recargar la página completa (navegación SPA).
 * 
 * Los enlaces disponibles:
 * - Home: Página de inicio
 * - Dashboard: Panel principal (fichar + tareas)
 * - Más enlaces según necesites...
 */
function Navigation({onLogout}) {

    const history = useHistory();

    const handleLogout = () => {
        AuthService.logout(); // Limpia el token y datos del usuario
        if (onLogout) {
            onLogout(); // Notifica al componente padre (App) que el usuario ha cerrado sesión
        }
        history.push('/'); // Redirige al login
    };

    return (
        <nav className="navigation">
            <div className="navbar-nav">
                <button onClick={handleLogout} className="nav-link logout-button">Log Out</button>
                <Link to="/edit-user" className="nav-link">Perfil</Link>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                {/* Puedes agregar más enlaces aquí */}
                {/* 
                <Link to="/perfil" className="nav-link">
                Perfil
                </Link>
                <Link to="/configuracion" className="nav-link">
                Configuración
                </Link>
                */}
            </div>
        </nav>
    );
}

export default Navigation;