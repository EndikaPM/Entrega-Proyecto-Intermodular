import React from 'react'
import { Link } from 'react-router-dom'
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
function Navigation() {
    return (
        <nav className="navigation">
            <div className="navbar-nav">
                <Link to="/" className="nav-link">Log Out</Link>
            
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