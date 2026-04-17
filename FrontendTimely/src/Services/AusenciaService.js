import Api from "./Api";

const api_ausencia = Api(8081);

const AusenciaService = {

    getAll() {
        return api_ausencia.get('/ausencias');
    },

    getById(id) {
        return api_ausencia.get(`/ausencias/${id}`);
    },

    getByUsuario(dni) {
        return api_ausencia.get(`/ausencias/usuario/${dni}`);
    },

    create(ausencia) {
        return api_ausencia.post('/ausencias', ausencia);
    },

    update(id, ausencia) {
        return api_ausencia.put(`/ausencias/${id}`, ausencia);
    },

    delete(id) {
        return api_ausencia.delete(`/ausencias/${id}`);
    }
};

export default AusenciaService;