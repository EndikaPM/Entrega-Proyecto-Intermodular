import Api  from "./Api";

const AusenciaService = {

    getAll() {
        return Api.get('/ausencias');
    },
    
    getById(id) {
        return Api.get(`/ausencias/${id}`);
    },

    getByUsuario(dni) {
        return Api.get(`/ausencias/usuario/${dni}`);
    },

    create(ausencia) {
        return Api.post('/ausencias', ausencia);
    },

    update(id, ausencia) {
        return Api.put(`/ausencias/${id}`, ausencia);
    },
    
    delete(id) {
        return Api.delete(`/ausencias/${id}`);
    }
};

export default AusenciaService;