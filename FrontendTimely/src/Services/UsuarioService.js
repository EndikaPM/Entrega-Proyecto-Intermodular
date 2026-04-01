import Api from "./Api";

const UsuarioService = {
    
    getAll() {
        return Api.get('/usuarios');
    },
    
    getByDNI(dni) {
        return Api.get(`/usuarios/${dni}`);
    }
};

export default UsuarioService;