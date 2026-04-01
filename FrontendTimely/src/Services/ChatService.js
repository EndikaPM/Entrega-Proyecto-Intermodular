import ApiMensaje from "./ApiMensaje";

const ChatService = {
    
    obtenerMensajes: () => {
        return ApiMensaje.get('/api/mensajes');
    },
};

export default ChatService;