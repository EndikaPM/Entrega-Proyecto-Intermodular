import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatService from '../Services/ChatService.js';
import AuthService from '../Services/AuthService.js';
import '../styles/Dashboard.css';
import Api from '../Services/Api.js';
import UsuarioService from '../Services/UsuarioService.js';
import {  FaPaperPlane} from "react-icons/fa";

function Chat() {
    const CHAT_DEBUG = true;
    const [messages, setMessages] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const stompClientRef = useRef(null);
    const socketRef = useRef(null);
    const fallbackLogRef = useRef(new Set());
    const [nombreUsuario, setNombreUsuario] = useState({});
    const [chatDisponible, setChatDisponible] = useState(true);
    //const apiChat = Api(8082);
    const apiChat = Api;

    const debugLog = (...args) => {
        if (!CHAT_DEBUG) return;
        console.log('[ChatDebug]', ...args);
    };


    useEffect(() => {
        //Descargar los Mensajes
        ChatService.obtenerMensajes()
            .then(response => {
                debugLog('Mensajes cargados', {
                    total: Array.isArray(response.data) ? response.data.length : 0,
                    ejemplo: Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null,
                });
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error al obtener mensajes:', error);
                debugLog('Error en obtenerMensajes', error?.message || error);
            });

        //Conectar a WebSocket
        let isMounted = true; // Para evitar actualizaciones si el componente se desmonta antes de la respuesta
        const socket = new SockJS(`${apiChat.defaults.baseURL}/chat-socket`);
        socketRef.current = socket;
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        stompClient.connect({}, () => {
            debugLog('STOMP conectado');
            if (!isMounted) return; // Si el componente ya se desmontó, no hacer nada
            stompClient.subscribe('/topic/mensajes', (message) => {
                const nuevoMen = JSON.parse(message.body);
                debugLog('Mensaje recibido por WS', nuevoMen);
                setMessages(prevMessages => [...prevMessages, nuevoMen]);
            });
        });

        return () => {
            isMounted = false; // Marcar como desmontado para evitar actualizaciones
            if (stompClientRef.current) {
                try {
                    stompClientRef.current.disconnect();
                } catch (error) {
                    console.warn('No se pudo desconectar el cliente STOMP:', error);
                }
            }
            if (socketRef.current) {
                try {
                    socketRef.current.close();
                } catch (error) {
                    console.warn('No se pudo cerrar el socket del chat:', error);
                }
            }
        };
    }, []);

    useEffect(() => {
//Primero, saca todos los DNI que aparecen en tus mensajes. Usa new Set() para eliminar duplicados
//(si un usuario envió 50 mensajes, solo queremos su DNI una vez).
        const dnisUnicos = [...new Set(messages.map(msg => msg.usuarioDni).filter(Boolean))];
//Luego, mira cuáles de esos DNI NO tienes todavía en tu estado nombresPorDni.
    const pendientes = dnisUnicos.filter(dni => !nombreUsuario[dni]);
        debugLog('Resolucion de nombres', {
            dnisUnicos,
            pendientes,
            cacheNombres: nombreUsuario,
        });
//En lugar de preguntar por un DNI, esperar, preguntar por el siguiente, etc.,
//el código lanza todas las peticiones al mismo tiempo.
        if (pendientes.length === 0) return;
        Promise.all(pendientes.map(async (dni) => {
            try {
                debugLog('Pidiendo usuario por DNI', dni);
                const respuesta = await UsuarioService.getByDNI(dni);
                debugLog('Usuario resuelto', {
                    dni,
                    data: respuesta?.data,
                    firstName: respuesta?.data?.firstName,
                });
                return [dni, respuesta.data?.firstName || dni];
            } catch (error) {
                debugLog('Fallo getByDNI', {
                    dni,
                    error: error?.message || error,
                    status: error?.response?.status,
                });
                return [dni, null]; // No fijamos el DNI para poder reintentar cuando la API vuelva
            }
        })).then((resultados) => {
//Object.fromEntries convierte esa lista de parejas [dni, nombre] en un objeto fácil de usar
//como un diccionario: { "12345678A": "Juan", "87654321B": "Maria" }.
            const nuevosNombres = Object.fromEntries(
                resultados.filter(([, nombre]) => Boolean(nombre))
            );
            debugLog('Mapa de nombres actualizado', nuevosNombres);
            setNombreUsuario((prev) => ({ ...prev, ...nuevosNombres }));
        });
    }, [messages, setNombreUsuario]);

    const obtenerNombreMostrado = (msg) => {
        const esMio = AuthService.getCurrentUser()?.dni === msg.usuarioDni;
        if (esMio) return 'Yo';

        const nombreResuelto = (
            nombreUsuario[msg.usuarioDni] ||
            msg.usuario?.firstName ||
            msg.firstName ||
            msg.nombreUsuario ||
            msg.usuarioNombre ||
            msg.usuarioDni
        );

        if (nombreResuelto === msg.usuarioDni && !fallbackLogRef.current.has(msg.usuarioDni)) {
            fallbackLogRef.current.add(msg.usuarioDni);
            debugLog('Mostrando DNI por falta de nombre', {
                dni: msg.usuarioDni,
                msg,
                cacheNombre: nombreUsuario[msg.usuarioDni],
            });
        }

        return nombreResuelto;
    };

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
                            <strong>{obtenerNombreMostrado(msg)}</strong>
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
                    <span className="boton-accion-texto"><FaPaperPlane /></span>
                    <svg className="boton-accion-icono" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2 21L23 12L2 3L2 10L17 12L2 14L2 21Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Chat;