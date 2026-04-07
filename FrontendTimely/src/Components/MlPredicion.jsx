import { useState } from 'react';
import MLService from '../Services/MlService';

const MlPredicion = () => {
    const [fecha, setFecha] = useState('');
    const [predicciones, setPredicciones] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [umbral, setUmbral] = useState(0.5);
    
    const handlePredecir = async (e) => {
        e.preventDefault();
        
        if (!fecha) {
        setError('Por favor selecciona una fecha');
        return;
        }
    
        setLoading(true);
        setError(null);
    
        try {
        const resultado = await MLService.predecirAusencias(fecha, umbral);
        setPredicciones(resultado);
        } catch (err) {
        setError(err.message);
        console.error('Error al predecir:', err);
        } finally {
        setLoading(false);
        }
    };
    
    const obtenerColorPrediccion = (prediccion) => {
        return prediccion === 'FALTARÁ' 
        ? 'bg-red-100 text-red-800 border-red-300' 
        : 'bg-green-100 text-green-800 border-green-300';
    };
    
    const obtenerColorConfianza = (confianza) => {
        switch (confianza) {
        case 'ALTA':
            return 'bg-blue-100 text-blue-800';
        case 'MEDIA':
            return 'bg-yellow-100 text-yellow-800';
        case 'BAJA':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
        }
    };
    
    return (
        <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Predicción de Ausencias
            </h2>
            <p className="text-gray-600">
                Predice qué empleados faltarán en una fecha específica usando Machine Learning
            </p>
            </div>
    
            {/* Formulario */}
            <form onSubmit={handlePredecir} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Fecha */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha a predecir
                </label>
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                />
                </div>
    
                {/* Umbral */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Umbral de confianza ({(umbral * 100).toFixed(0)}%)
                </label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={umbral}
                    onChange={(e) => setUmbral(parseFloat(e.target.value))}
                    className="w-full"
                />
                </div>
    
                {/* Botón */}
                <div className="flex items-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Prediciendo...' : 'Predecir Ausencias'}
                </button>
                </div>
            </div>
            </form>
    
            {/* Error */}
            {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
            </div>
            )}
    
            {/* Resultados */}
            {predicciones && (
            <div className="space-y-6">
                {/* Resumen */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                    <p className="text-sm text-gray-600 mb-1">Fecha</p>
                    <p className="text-xl font-bold text-gray-800">
                        {new Date(predicciones.fecha).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                        })}
                    </p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-600 mb-1">Total Empleados</p>
                    <p className="text-3xl font-bold text-gray-800">
                        {predicciones.total_empleados_evaluados}
                    </p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-600 mb-1">Ausencias Esperadas</p>
                    <p className="text-3xl font-bold text-red-600">
                        {predicciones.ausencias_esperadas}
                    </p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-600 mb-1">Precisión del Modelo</p>
                    <p className="text-3xl font-bold text-green-600">
                        {(predicciones.metadata.accuracy * 100).toFixed(1)}%
                    </p>
                    </div>
                </div>
                </div>
    
                {/* Tabla de empleados */}
                <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Predicciones por Empleado
                </h3>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            DNI
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prob. Faltar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prob. Asistir
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Predicción
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Confianza
                        </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {predicciones.empleados.map((emp, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-medium text-gray-900">
                                {emp.dni}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                    className="bg-red-500 h-2 rounded-full"
                                    style={{ width: `${emp.probabilidad_faltar}%` }}
                                ></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-700">
                                {emp.probabilidad_faltar.toFixed(1)}%
                                </span>
                            </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: `${emp.probabilidad_asistir}%` }}
                                ></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-700">
                                {emp.probabilidad_asistir.toFixed(1)}%
                                </span>
                            </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${obtenerColorPrediccion(emp.prediccion)}`}>
                                {emp.prediccion}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${obtenerColorConfianza(emp.confianza)}`}>
                                {emp.confianza}
                            </span>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
};
export default MlPredicion;