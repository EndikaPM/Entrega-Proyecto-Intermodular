import React, { useEffect, useState } from 'react'
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



function AppLayout() {
  // Estado global del tema (compartido por toda la app)
  const [modoOscuro, setModoOscuro] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //Para que al recargar no se pierda el usuario logueado
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);// Si hay usuario en localStorage, consideramos que está autenticado
    }
    setLoading(false); // Terminamos de cargar el estado de autenticación
  }, []);
  const location = useLocation();
  const mostrarLayoutPrivado = location.pathname !== '/' && location.pathname !== '/register';
  
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    setIsAuthenticated(false);
  };

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

          {/* Puedes agregar más rutas aquí */}
          {/* 
          <Route path="/configuracion" component={Configuracion} />
          */}
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
