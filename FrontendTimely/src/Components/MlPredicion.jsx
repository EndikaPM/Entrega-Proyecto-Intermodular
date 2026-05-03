import { useState } from 'react';
import Api from '../Services/Api';

//const api_ml = Api(8001);
const api_ml = Api;

const MlPrediccion = () => {
    const [fecha,     setFecha]     = useState('');
    const [resultado, setResultado] = useState(null);
    const [error,     setError]     = useState(null);
    const [loading,   setLoading]   = useState(false);

    const predecir = async () => {
        if (!fecha) return;
        setLoading(true);
        setError(null);
        setResultado(null);
        try {
            const res = await api_ml.post('/predecir', { fecha });
            setResultado(res.data);
        } catch (e) {
            const msg = e.response?.data?.detail || e.message || 'Error del servidor';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 p-6">
            <div className="flex items-center gap-3">
                <input
                    type="date"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={predecir}
                    disabled={loading || !fecha}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
                >
                    {loading ? 'Calculando…' : 'Predecir'}
                </button>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {resultado && (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500 dark:text-gray-400 text-xl">
                        {resultado.dia_semana}, {resultado.fecha}
                    </p>
                    <span className={`text-8xl font-bold ${resultado.alerta ? 'text-red-500' : 'text-gray-800 dark:text-white'}`}>
                        {resultado.ausencias}
                    </span>
                    <p className="text-gray-500 dark:text-gray-400 text-xl">
                        personas se esperan ausentes ({resultado.porcentaje}% del equipo)
                    </p>
                    {resultado.alerta && (
                        <span className="mt-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs font-medium px-3 py-1 rounded-full">
                            Alerta — más del 80% de ausencias
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default MlPrediccion;