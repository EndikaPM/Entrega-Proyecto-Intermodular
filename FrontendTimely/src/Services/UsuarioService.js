import Api from "./Api";

//const api_usuario = Api(8081);
const api_usuario = Api;

const UsuarioService = {

    getAll() {
        return api_usuario.get('/usuarios');
    },

    getByDNI(dni) {
        return api_usuario.get(`/usuarios/${dni}`);
    }
};

export default UsuarioService;