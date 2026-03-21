import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import AuthService from '../Services/AuthService.js';
import { useHistory } from 'react-router-dom';
import JornadaService from '../Services/JornadaService.js';




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
            const resultadoFichar = await JornadaService.ficharEntradaSalida(usuario.dni);
            console.log('Resultado del fichaje:', resultadoFichar);

            console.log('Fichando entrada/salida...');
            setEnLinea(!enLinea);
        } catch (error) {
            console.error('Error al fichar entrada/salida:', error);
            setError('Error al fichar entrada/salida. Inténtalo de nuevo.', error);
            setTimeout(() => {setError('');}, 5000);
        }finally {
            setCargando(false);
        }
    };

    // Función para enviar mensaje (aquí irá la lógica de tu API)
    const enviarMensaje = () => {
        if (texto.trim()) {
            console.log('Enviando mensaje:', texto);
            // TODO: Llamar a la API enviar mensajes
            setTexto(''); // Limpiar el campo después de enviar
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
                {/* Ventana que muestra el texto */}
                <div className="ventana-texto">
                    {texto || 'Investigar cómo hacer un chat con WebSocket y Socket.io'}
                </div>

                {/* Contenedor inferior con botón y campo de texto */}
                <div className="contenedor-inferior">
                    <button className="boton-accion" onClick={enviarMensaje}>
                        Enviar
                    </button>
                    <input
                        type="text"
                        className="campo-texto"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                        placeholder="Investigar cómo hacer un chat con WebSocket y Socket.io"
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard
