import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import AuthService from '../Services/AuthService.js';
import { useHistory } from 'react-router-dom';
import JornadaService from '../Services/JornadaService.js';
import Chat from '../Components/Chat.jsx';


function Dashboard() {
    const history = useHistory();
    const [texto, setTexto] = useState('')
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const [enLinea, setEnLinea] = useState(false);

    useEffect(() => {
        const userInLine = async () => {
            try {
                const usuario = AuthService.getCurrentUser();
                if (usuario) {
                    
                    const estado = await JornadaService.isInLine(usuario.dni);
                    setEnLinea(estado.enLinea);
                }
            } catch (error) {
                console.error('Error al verificar estado del usuario:', error);
            }
        };

        userInLine();
    }, []);

    // Función para fichar (aquí irá la lógica de tu API)
    const ficharEntradaSalida = async () => {
        try {
            const usuario = AuthService.getCurrentUser();
            
            if (!usuario) {
                setError('No hay sesión activa.');
                setTimeout(() => history.push('/'), 2000);
                return;
            }

            setCargando(true);
            setError('');
            
            console.log("Fichando para: ", usuario.dni);
            const resultadoFichar = await JornadaService.fichar(usuario.dni);
            console.log('Resultado del fichaje:', resultadoFichar);

            console.log('Fichando entrada/salida...');
            setEnLinea(!enLinea);
        } catch (error) {
            console.error('Error al fichar entrada/salida:', error);
            setError('Error al fichar entrada/salida. Inténtalo de nuevo.');
            setTimeout(() => {setError('');}, 5000);
        }finally {
            setCargando(false);
        }
    };


    return (
        <div className="dashboard-container">
            {/* Columna izquierda - 1/3 del espacio */}
            <div className="columna-izquierda">
                <button className="boton-centro" onClick={ficharEntradaSalida}>
                    {enLinea ? 'Fichar Salida' : 'Fichar Entrada'}
                </button>
            </div>

            {/* Columna derecha - 2/3 del espacio */}
            <div className="columna-derecha">
                <Chat usuario={AuthService.getCurrentUser()?.dni} />
                <div className="error-container">
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default Dashboard
