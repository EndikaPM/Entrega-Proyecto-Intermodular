import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import "./styles/App.css";


// Importar componentes
import Header from './Components/Header.jsx';
import Navigation from './Components/Navigation.jsx';

// Importar páginas
import Home from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Dashboard from './Pages/Dasboard.jsx';

/**
 * APP COMPONENT - Componente Principal
 * 
 * Este es el componente raíz de la aplicación.
 * Funciones principales:
 * 
 * 1. MANEJO DE TEMA (modo oscuro/claro):
 *    - Estado 'modoOscuro' se mantiene aquí porque afecta a TODA la app
 *    - Se pasa como prop al Header y se aplica como clase CSS al contenedor principal
 * 
 * 2. ROUTING (navegación):
 *    - <Router>: Habilita el sistema de rutas en toda la app
 *    - <Switch>: Renderiza SOLO la primera ruta que coincida
 *    - <Route>: Define qué componente mostrar para cada URL
 * 
 * Estructura:
 * - Header: Se muestra SIEMPRE (logo + toggle tema)
 * - Navigation: Se muestra SIEMPRE (enlaces de navegación)
 * - Switch: Cambia entre páginas según la URL
 */

function AppLayout() {
  // Estado global del tema (compartido por toda la app)
  const [modoOscuro, setModoOscuro] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const mostrarLayoutPrivado = location.pathname !== '/' && location.pathname !== '/register';

  return (
    <div className={`app ${modoOscuro ? 'modo-oscuro' : 'modo-claro'}`}>
      {mostrarLayoutPrivado && (
        <>
          {/* Header con logo y toggle de modo*/}
          <Header modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />

          {/* Barra de navegación*/}
          <Navigation />
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
            exact
            path="/"
            render={() => <Home onLoginSuccess={() => setIsAuthenticated(true)} />}
          />

          {/* Ruta Registro - Página de registro */}
          <Route exact path="/register" component={Register} />

          {/* Ruta Dashboard - Pantalla principal */}
          <Route
            exact
            path="/dashboard"
            render={() => (isAuthenticated ? <Dashboard /> : <Redirect to="/" />)}
          />

          {/* Puedes agregar más rutas aquí */}
          {/* 
          <Route path="/perfil" component={Perfil} />
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
