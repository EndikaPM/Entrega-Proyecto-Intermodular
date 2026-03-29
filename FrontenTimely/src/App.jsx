import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import "./styles/App.css";


// Importar componentes
import Header from './Components/Header.jsx';
import Navigation from './Components/Navigation.jsx';

// Importar páginas
import Home from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Dashboard from './Pages/Dasboard.jsx';
import AuthService from './Services/AuthService.js';
import EditUser from './Pages/EditUser.jsx';
import FicharList from './Pages/FicharList.jsx';



function AppLayout() {
  // Estado global del tema (compartido por toda la app)
  const [modoOscuro, setModoOscuro] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //Para que al recargar no se pierda el usuario logueado
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    console.log("verificando autentificación...");
    const user = AuthService.getCurrentUser();
    console.log("Usuario en localStorage:", user);

    if (user) {
      console.log("Usuario encontrado!!, autenticando..."); 
      setIsAuthenticated(true);// Si hay usuario en localStorage, consideramos que está autenticado
    }else{console.log("No hay usuario en localStorage, no autenticado.");}
    setLoading(false); // Terminamos de cargar el estado de autenticación
  }, []);
  const location = useLocation();
  const mostrarLayoutPrivado = location.pathname !== '/' && location.pathname !== '/register';
  
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: 'var(--text-primary)',
        background: 'var(--background-color)'
      }}>
        Cargando...
      </div>
    );
  }

  return (
    <div className={`app ${modoOscuro ? 'modo-oscuro' : 'modo-claro'}`}>
      {mostrarLayoutPrivado && isAuthenticated && (
        <>

          {/* Header con logo y toggle de modo*/}
          <Header modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />
          {/* Barra de navegación*/}
          <Navigation onLogout={handleLogout} />

        </>
      )}

      {/* Contenedor principal donde cambian las páginas */}
      <div className={`main-container ${mostrarLayoutPrivado ? '' : 'main-container-login'}`.trim()}>
        <Switch>
          {/* 
            RUTAS DE LA APLICACIÓN
            
            exact: La ruta debe coincidir EXACTAMENTE
            path: URL que activa esta ruta
            component: Componente que se renderiza
          */}

          {/* Ruta raíz - Página de inicio */}
          <Route
            exact path="/"
            render={() => <Home onLoginSuccess={() => setIsAuthenticated(true)} />}
          />

          {/* Ruta Registro - Página de registro */}
          <Route exact path="/register" component={Register} />

          {/* Ruta Dashboard - Pantalla principal */}
          <Route
            exact path="/dashboard"
            render={() => (isAuthenticated ? <Dashboard /> : <Redirect to="/" />)}
          />
          {/* Ruta Editar Usuario - Página de edición de perfil */}
          <Route 
            exact path="/edit-user"
            render={() => (isAuthenticated ? <EditUser /> : <Redirect to="/" />)}
          />
          <Route
            exact path="/ficharList"
            render={() => (isAuthenticated ? <FicharList /> : <Redirect to="/" />)}
          />
          {/* Puedes agregar más rutas aquí */}
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App
