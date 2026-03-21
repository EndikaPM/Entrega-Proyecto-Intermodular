import axios from 'axios';

const API_URL = 'http://localhost:8081/api/jornadas';

const JornadaService = {
    //Fichar entrada o salida
    ficharEntradaSalida: async (dni) => {
        try {// Aqui definimos la clave como dni porque es lo que vamos a usar
        //para identificar al usuario en el backend{dni}<- si lo cambio es
        //como si lo cambio en el backend, es decir, no tiene que coincidir 
        //con el nombre del campo en la base de datos, sino con el nombre del 
        //campo que se le pasa al backend
            const response = await axios.post(`${API_URL}/fichar`, { dni });
            return response.data;
        } catch (error) {
            console.error('Error al fichar entrada/salida:', error);
            throw error.response?.data?.error || 'Error al fichar entrada/salida. Inténtalo de nuevo.';
        }
    },

    // Verificar si el usuario está en línea
    isInLine: async (dni) => {
        try {
            const hoy = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
            const responde = await axios.get(`${API_URL}/usuario/${dni}`);

            // Buscar si hay una jornada hoy sin salida
            const jornadaHoy = responde.data.find(j => j.fecha === hoy && j.horaSalida === null);

            return { enLinea: !!jornadaHoy }; // Si jornadaHoy existe, el usuario está en línea
            //la doble negación es un truco para convertir cualquier cosa a Boolean
            //es decir, si jornadaHoy es null o undefined, !!jornadaHoy será false, y si jornadaHoy es un objeto válido, 
            //!!jornadaHoy será true
        } catch (error) {
            console.error('Error al verificar si el usuario está en línea:', error);
            return {enLinea: false};
        }
    }
};


export default JornadaService;