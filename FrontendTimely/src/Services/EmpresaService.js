import Api from "./Api";

const api_empresa = Api(8081);

const EmpresaService = {

    getAllEmpresas() {
        return api_empresa.get('/empresas');
    },

    getEmpresaByNif(nif) {
        return api_empresa.get(`/empresas/${nif}`);
    },

    createEmpresa(empresa) {
        return api_empresa.post('/empresas', empresa);
    },

    updateEmpresa(nif, empresa) {
        return api_empresa.put(`/empresas/${nif}`, empresa);
    },

    deleteEmpresa(nif) {
        return api_empresa.delete(`/empresas/${nif}`);
    },

    getAllDepartamentos() {
        return api_empresa.get('/departamentos');
    },

    getDepartamentosByID(id) {
        return api_empresa.get(`/departamentos/${id}`);
    },

    getDepartamentosByEmpresaNif(nif) {
        return api_empresa.get(`/departamentos/empresas/${nif}`);
    },

    createDepartamento(departamento) {
        return api_empresa.post('/departamentos', departamento);
    },

    updateDepartamento(id, departamento) {
        return api_empresa.put(`/departamentos/${id}`, departamento);
    },

    deleteDepartamento(id) {
        return api_empresa.delete(`/departamentos/${id}`);
    }
};

export default EmpresaService;
