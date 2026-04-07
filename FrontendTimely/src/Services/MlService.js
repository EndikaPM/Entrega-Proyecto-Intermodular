const ML_API_URL = 'http://localhost:8001';

class MLService {
    
    static async predecirAusencias(fecha, umbral = 0.5) {
        const response = await fetch(`${ML_API_URL}/predecir-ausencias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fecha,
            umbral,
        }),
        });
    
        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al obtener predicciones');
        }
    
        return response.json();
    }
    
    /**
     * Obtiene estadísticas de un empleado específico
     * @param {string} dni - DNI del empleado
     * @returns {Promise} Estadísticas
     */
    static async obtenerEstadisticasEmpleado(dni) {
        const response = await fetch(`${ML_API_URL}/estadisticas-empleado/${dni}`);
    
        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al obtener estadísticas');
        }
    
        return response.json();
    }
    
    /**
     * Lista todos los empleados disponibles en el modelo
     * @returns {Promise} Lista de empleados
     */
    static async listarEmpleados() {
        const response = await fetch(`${ML_API_URL}/empleados`);
    
        if (!response.ok) {
        throw new Error('Error al obtener lista de empleados');
        }
    
        return response.json();
    }
    
    /**
     * Obtiene información del modelo
     * @returns {Promise} Metadata del modelo
     */
    static async obtenerInfoModelo() {
        const response = await fetch(`${ML_API_URL}/modelo-info`);
    
        if (!response.ok) {
        throw new Error('Error al obtener información del modelo');
        }
    
        return response.json();
    }
    
    /**
     * Verifica que la API esté funcionando
     * @returns {Promise} Estado de la API
     */
    static async verificarSalud() {
        const response = await fetch(`${ML_API_URL}/health`);
    
        if (!response.ok) {
        throw new Error('API de ML no disponible');
        }
    
        return response.json();
    }
}

export default MLService;