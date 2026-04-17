import Api from './Api';

const api_jornada = Api(8081);

const JornadaService = {
    // Obtener todos los fichajes
    getAll() {
        return api_jornada.get('/jornadas');
    },

    // Obtener fichajes de un usuario
    getFichajesDNI(dni) {
        return api_jornada.get(`/jornadas/usuario/${dni}`);
    },

    // Fichar entrada/salida
    fichar(dni) {
        return api_jornada.post('/jornadas/fichar', { dni });
    },

    // Verificar si está en línea
    async isInLine(dni) {
        try {
            const hoy = new Date().toISOString().split('T')[0];
            const response = await api_jornada.get(`/jornadas/usuario/${dni}`);
            const jornadaHoy = response.data.find(
                j => j.fechaActual === hoy && j.horaSalida === null
            );
            return { enLinea: !!jornadaHoy };
        } catch (error) {
            return { enLinea: false };
        }
    },

    // Eliminar fichaje
    delete(id) {
        return api_jornada.delete(`/jornadas/${id}`);
    },

    // Actualizar fichaje
    update(id, fichaje) {
        return api_jornada.put(`/jornadas/${id}`, fichaje);
    }
};

export default JornadaService;