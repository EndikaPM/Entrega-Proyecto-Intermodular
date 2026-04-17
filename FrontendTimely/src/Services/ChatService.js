import Api from "./Api";

const api_chat = Api(8082);

const ChatService = {

    obtenerMensajes: () => {
        return api_chat.get('/mensajes');
    },
};

export default ChatService;