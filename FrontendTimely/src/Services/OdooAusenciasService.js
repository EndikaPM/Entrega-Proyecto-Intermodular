import axios from 'axios';

const API_URL = 'http://localhost:17069/api/ausencias';

const AusenciaService = {
    
    listar: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar`);
            return response.data; // Retorna {success: true, data: [...], count: X}
        } catch (error) {
            console.error("Error listando ausencias:", error);
            throw error;
        }
    },
    
    
    crear: async (datos) => {
        try {
            
            const response = await axios.post(`${API_URL}/crear`, datos);
            return response.data;
        } catch (error) {
            console.error("Error creando ausencia:", error);
            throw error;
        }
    },

    // Obtener los tipos de motivos para los Selects del formulario
    getOpcionesMotivo: async () => {
        try {
            const response = await axios.get(`${API_URL}/opciones-tipo-motivo`);
            return response.data;
        } catch (error) {
            console.error("Error obteniendo motivos:", error);
            throw error;
        }
    },

    getEmployee: async () => {
        try {
            const response = await axios.get(`${API_URL}/empleados`);
            return response.data;
        } catch (error) {
            console.error("Error obteniendo empleados:", error);
            throw error;
        }
    }
};

export default AusenciaService;