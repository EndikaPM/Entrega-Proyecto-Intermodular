import React, { useState } from 'react';
import '../styles/Dashboard.css';

/**
 * DASHBOARD PAGE
 * 
 * Pantalla principal de la aplicación donde el usuario puede:
 * 1. Fichar entrada/salida (botón izquierdo)
 * 2. Gestionar tareas (columna derecha)
 * 
 * Estado local:
 * - texto: Texto actual de la tarea
 */

function Dashboard() {
    const [texto, setTexto] = useState('')

    // Función para fichar (aquí irá la lógica de tu API)
    const ficharEntradaSalida = () => {
        console.log('Fichando entrada/salida...');
        // TODO: Llamar a la API para registrar el fichaje
    };

    // Función para enviar tarea (aquí irá la lógica de tu API)
    const enviarTarea = () => {
        if (texto.trim()) {
            console.log('Enviando tarea:', texto);
            // TODO: Llamar a la API para crear la tarea
            setTexto(''); // Limpiar el campo después de enviar
        }
    };

    return (
        <div className="dashboard-container">
            {/* Columna izquierda - 1/3 del espacio */}
            <div className="columna-izquierda">
                <button className="boton-centro" onClick={ficharEntradaSalida}>
                    Fichar Entrada / Salida
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
                    <button className="boton-accion" onClick={enviarTarea}>
                        Enviar
                    </button>
                    <input
                        type="text"
                        className="campo-texto"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && enviarTarea()}
                        placeholder="Investigar cómo hacer un chat con WebSocket y Socket.io"
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard
