import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatService from '../Services/ChatService.js';
import AuthService from '../Services/AuthService.js';
import '../styles/Dashboard.css';
import ApiMensaje from '../Services/Api.js';
import UsuarioService from '../Services/UsuarioService.js';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const stompClientRef = useRef(null);
    const [nombreUsuario, setNombreUsuario] = useState({});
    

    useEffect(() => {
        //Descargar los Mensajes
        ChatService.obtenerMensajes()
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error al obtener mensajes:', error);
            });

        //Conectar a WebSocket
        let isMounted = true; // Para evitar actualizaciones si el componente se desmonta antes de la respuesta
        const socket = new SockJS(`${ApiMensaje.defaults.baseURL}chat-socket`);
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        stompClient.connect({}, () => {
            if (!isMounted) return; // Si el componente ya se desmontó, no hacer nada
            stompClient.subscribe('/topic/mensajes', (message) => {
                const nuevoMen = JSON.parse(message.body);
                setMessages(prevMessages => [...prevMessages, nuevoMen]);
            });
        });

        return () => {
            isMounted = false; // Marcar como desmontado para evitar actualizaciones
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
//Primero, saca todos los DNI que aparecen en tus mensajes. Usa new Set() para eliminar duplicados
//(si un usuario envió 50 mensajes, solo queremos su DNI una vez).
        const dnisUnicos = [...new Set(messages.map(msg => msg.usuarioDni).filter(Boolean))];
//Luego, mira cuáles de esos DNI NO tienes todavía en tu estado nombresPorDni.
        const pendientes = dnisUnicos.filter(dni => !nombreUsuario[dni]);
//En lugar de preguntar por un DNI, esperar, preguntar por el siguiente, etc.,
//el código lanza todas las peticiones al mismo tiempo.
        if (pendientes.length === 0) return;
        Promise.all(pendientes.map(async (dni) => {
            try {
                const respuesta = await UsuarioService.getByDNI(dni);
                return [dni, respuesta.data?.firstName || dni];
            } catch {
                return [dni, dni]; // Si hay error, devuelve el DNI como nombre
            }
        })).then((resultados) => {
//Object.fromEntries convierte esa lista de parejas [dni, nombre] en un objeto fácil de usar
//como un diccionario: { "12345678A": "Juan", "87654321B": "Maria" }.
            const nuevosNombres = Object.fromEntries(resultados);
            setNombreUsuario((prev) => ({ ...prev, ...nuevosNombres }));
        });
    }, [messages, setNombreUsuario]);

    const enviarMensaje = () => {
        if (nuevoMensaje.trim() !== '' && stompClientRef.current && stompClientRef.current.connected) {
            const conteMensaje = {
                usuarioDni: AuthService.getCurrentUser().dni,
                contenido: nuevoMensaje,
            };
            stompClientRef.current.send('/app/enviar-mensaje', {}, JSON.stringify(conteMensaje));
            setNuevoMensaje('');
        }
    };

    const formatearHora = (fecha) => {
        if (!fecha) return '';
        return new Date(fecha).toLocaleTimeString('es-ES',{
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${AuthService.getCurrentUser()?.dni === msg.usuarioDni ? 'mio' : 'otro'}`}>
                        <div className="chat-message-head">
                            <strong>{AuthService.getCurrentUser()?.dni === msg.usuarioDni ? 'Yo' : nombreUsuario[msg.usuarioDni]}</strong>
                            <span className="chat-time">{formatearHora(msg.fechaEnvio)}</span>
                        </div>
                        <span className="chat-content">{msg.contenido}</span>
                    </div>
                ))}
            </div>
            <div className="chat-input-row">
                <input
                    type="text"
                    className="chat-input"
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            enviarMensaje();
                        }
                    }}

                />
                <button className='boton-accion' onClick={enviarMensaje} aria-label="Enviar mensaje">
                    <span className="boton-accion-texto">Enviar</span>
                    <svg className="boton-accion-icono" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2 21L23 12L2 3L2 10L17 12L2 14L2 21Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Chat;