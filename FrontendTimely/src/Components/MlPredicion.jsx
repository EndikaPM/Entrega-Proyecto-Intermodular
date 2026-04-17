import { useState } from 'react';
import Api from '../Services/Api';

const api_ml = Api(8001);

const MlPrediccion = () => {
    const [fecha, setFecha] = useState('');
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const predecir = async () => {
        if (!fecha) return;
        setLoading(true);
        setError(null);
        setResultado(null);
        try {
            const res = await api_ml.post('/predecir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fecha }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || 'Error del servidor');
            }
            setResultado(await res.json());
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 p-6">

            {/* Input + botón */}
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

            {/* Error */}
            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}

            {/* Resultado */}
            {resultado && (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500 text-sm">
                        {resultado.dia_semana}, {resultado.fecha}
                    </p>

                    {/* Número grande */}
                    <span className={`text-8xl font-bold ${resultado.alerta ? 'text-red-500' : 'text-gray-800'}`}>
                        {resultado.ausencias}
                    </span>

                    <p className="text-gray-400 text-sm">
                        personas se esperan ausentes ({resultado.porcentaje}% del equipo)
                    </p>

                    {resultado.alerta && (
                        <span className="mt-2 bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full">
                            Alerta — más del 80% de ausencias
                        </span>
                    )}
                </div>
            )}

        </div>
    );
};

export default MlPrediccion;