import { Link, useHistory } from 'react-router-dom'
import AuthService from '../Services/AuthService';
import '../styles/Navigation.css';


function Navigation({onLogout}) {

    const history = useHistory();

    const handleLogout = () => {
        AuthService.logout(); // Limpia datos del usuario
        if (onLogout) {
            onLogout(); // Notifica al componente padre (App) que el usuario ha cerrado sesión
        }
        history.push('/'); // Redirige al login
    };

    return (
        <nav>
            <div className="navbar-nav">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="nav-link logout-button"
                >
                    Log Out
                </button>
                <Link 
                    to="/edit-user" 
                    className="nav-link"
                >
                    Perfil
                </Link>
                <Link 
                    to="/dashboard" 
                    className="nav-link"
                >
                    Dashboard
                </Link>

                <Link to = "/ficharList" className="nav-link">
                    Ver Fichajes
                </Link>

                {AuthService.getCurrentUser()?.userType === 'Administrador' && (
                    <Link to = "/EmpresaDepartamento" className="nav-link-admin">
                        Crear Empresa/Departamento
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navigation;