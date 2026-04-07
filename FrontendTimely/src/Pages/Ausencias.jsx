import { useState, useEffect, use } from "react";
import AusenciaService from "../Services/AusenciaService";
import '../styles/Ausencias.css';

function Ausencias() {
    const [ausencias, setAusencias] = useState([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const [fecha, setFecha] = useState('');
    const [datosAusencias, setDatosAusencias] = useState({
        id_trabajador: '',
        diaInicioAusencia: '',
        diaFinAusencia: '',
        motivo: '' ,
        descrocion: ''
    });
    

    useEffect(() => {
        const cargarAusencias = async () => {
            try {
                setCargando(true);
                const response = await AusenciaService.getAll();
                console.log(response.data);
                
                setAusencias(response.data); 
                
            } catch (error) {
                setError('Error al cargar las ausencias');
            } finally {
                setCargando(false);
            }
        };

        cargarAusencias();
    }, []);

    return (
        <div className="ausencias-container">
            <h1>Ausencias</h1>
            <form className="ausencias-form">
                <label htmlFor="fecha">Fecha:</label>
                <input 
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
            {error && <p className="error">{error}</p>}
            {cargando ? (
                <p>Cargando...</p>
            ) : (
                <table className="ausencias-table">
                    <thead>
                        <tr>
                            <th>Empleado dni</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Motivo</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ausencias.map((ausencia) => (
                            <tr key={ausencia.usuario?.dni}>
                                <td>{ausencia.usuario?.firstName}</td>
                                <td>{ausencia.diaInicioAusencia}</td>
                                <td>{ausencia.diaFinAusencia}</td>
                                <td>{ausencia.motivo}</td>
                                <td>{ausencia.descrocion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Ausencias;