import { Link, useHistory } from 'react-router-dom'
import AuthService from '../Services/AuthService';
import '../styles/Navigation.css';
import { FaSignInAlt, FaSignOutAlt, FaEdit, FaUserCircle, FaEye, FaQuestion, FaPlus, FaClock } from "react-icons/fa";


function Navigation({onLogout}) {

    const history = useHistory();

    const handleLogout = () => {
        AuthService.logout();
        if (onLogout) {
            onLogout();
        }
        history.push('/');
    };

    return (
        <nav>
            <div className="navbar-nav">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="nav-link logout-button"
                ><FaSignOutAlt />
                    Log Out
                </button>
                <Link 
                    to="/edit-user" 
                    className="nav-link"
                >
                    <FaUserCircle />
                    Perfil
                </Link>
                <Link 
                    to="/dashboard" 
                    className="nav-link"
                >
                    <FaClock />
                    Dashboard
                </Link>

                <Link 
                    to="/ausencias" 
                    className="nav-link"
                >
                    <FaQuestion />
                    Solicitar Ausencia
                </Link>

                <Link 
                    to="/ficharList" 
                    className="nav-link"
                >
                    <FaEye />
                    Ver Fichajes
                </Link>

                {AuthService.getCurrentUser()?.userType === 'Administrador' && (
                    <>
                    <Link 
                    to="/empresaDepartamento" 
                    className="nav-link-admin">
                        <FaPlus />
                        Crear Empresa/Departamento
                    </Link>
                    <Link 
                    to="/prediccion" 
                    className="nav-link-admin">
                        Predicción Ausencias
                    </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navigation;