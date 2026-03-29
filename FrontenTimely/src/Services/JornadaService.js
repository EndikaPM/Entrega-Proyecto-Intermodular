import Api from './Api';

const JornadaService = {
    // Obtener todos los fichajes
    getAll() {
        return Api.get('/jornadas');
    },

    // Obtener fichajes de un usuario
    getFichajesDNI(dni) {
        return Api.get(`/jornadas/usuario/${dni}`);
    },

    // Fichar entrada/salida
    fichar(dni) {
        return Api.post('/jornadas/fichar', { dni });
    },

    // Verificar si está en línea
    async isInLine(dni) {
        try {
            const hoy = new Date().toISOString().split('T')[0];
            const response = await Api.get(`/jornadas/usuario/${dni}`);
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
        return Api.delete(`/jornadas/${id}`);
    },

    // Actualizar fichaje
    update(id, fichaje) {
        return Api.put(`/jornadas/${id}`, fichaje);
    }
};

export default JornadaService;