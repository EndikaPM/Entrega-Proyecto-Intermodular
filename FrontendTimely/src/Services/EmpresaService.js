import Api from "./Api";

const EmpresaService = {

    getAllEmpresas() {
        return Api.get('/empresas');
    },

    getEmpresaByNif(nif) {
        return Api.get(`/empresas/${nif}`);
    },

    createEmpresa(empresa) {
        return Api.post('/empresas', empresa);
    },

    updateEmpresa(nif, empresa) {
        return Api.put(`/empresas/${nif}`, empresa);
    },
    
    deleteEmpresa(nif) {
        return Api.delete(`/empresas/${nif}`);
    },

    getAllDepartamentos() {
        return Api.get('/departamentos');
    },

    getDepartamentosByID(id) {
        return Api.get(`/departamentos/${id}`);
    },

    getDepartamentosByEmpresaNif(nif) {
        return Api.get(`/departamentos/empresas/${nif}`);
    },

    createDepartamento(departamento) {
        return Api.post('/departamentos', departamento);
    },

    updateDepartamento(id, departamento) {
        return Api.put(`/departamentos/${id}`, departamento);
    },

    deleteDepartamento(id) {
        return Api.delete(`/departamentos/${id}`);
    }
};

export default EmpresaService;
