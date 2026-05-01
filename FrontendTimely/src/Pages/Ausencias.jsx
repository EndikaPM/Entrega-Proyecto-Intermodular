import { useState, useEffect, use } from "react";
import AusenciaService from "../Services/OdooAusenciasService";
import '../styles/Ausencias.css';

function Ausencias() {
    const [ausencias, setAusencias] = useState([]);

    const [ausenciaFiltro, setAusenciaFiltro] = useState([]);
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    const fechaMinima = hoy.toISOString().split('T')[0];

    const [opcionesMotivo, setOpcionesMotivo] = useState([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const [fecha, setFecha] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [datosAusencias, setDatosAusencias] = useState({
        fecha_inicio: '',
        fecha_fin: '',
        tipo_motivo: 'VACACIONES',
        descripcion_motivo: '',
        hora_inicio: 9.0,
        hora_fin: 17.0,
        employee_id: ''
    });


    useEffect(() => {
        cargarAusencias();
    }, []);

    const cargarAusencias = async () => {
        setCargando(true);
        try {

            const [response, opciones, resEmpleados] = await Promise.all([
                AusenciaService.listar(),
                AusenciaService.getOpcionesMotivo(),
                AusenciaService.getEmployee()
            ]);

            if (response.success) {
                setAusencias(response.data);
                setAusenciaFiltro(response.data);
            }
            if (opciones.success) setOpcionesMotivo(opciones.data);
            if (resEmpleados.success) setEmpleados(resEmpleados.data);
        } catch (error) {
            setError('Error de conexión con el servidor Odoo');
            console.log(error);
        } finally {
            setCargando(false);
        }
    };

    const manejarFiltro = (e) => {
        e.preventDefault();
        if (!fecha) {
            setAusenciaFiltro(ausencias);
            return;
        }
        // Filtramos las ausencias que coincidan con la fecha seleccionada
        const filtradas = ausencias.filter(aus =>
            aus.fecha_inicio === fecha || aus.fecha_fin === fecha
        );
        setAusenciaFiltro(filtradas);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosAusencias(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError('');
        try {
            const response = await AusenciaService.crear({
                ...datosAusencias,
                employee_id: parseInt(datosAusencias.employee_id)
            });

            //Odoo devuelve un puto resultado envvuelto datos dentro de .result
            const resultado = response.result || response;

            if (resultado.success) {
                alert('Ausencia creada con éxito');
                const nuevaAusencia = {
                    ...datosAusencias,
                    id: resultado.id || Date.now(), // Usamos el ID que devuelve Odoo
                    employee_name: empleados.find(e => 
                        e.id === parseInt(datosAusencias.employee_id))?.name
                };

                setAusencias(prev => [...prev, nuevaAusencia]);
                setAusenciaFiltro(prev => [...prev, nuevaAusencia]);

                setDatosAusencias({ 
                    ...datosAusencias, 
                    fecha_inicio: '', 
                    fecha_fin: '', 
                    descripcion_motivo: '' 
                });

            } else {
                setError('Error al crear la ausencia');
            }
        } catch (error) {
            setError('Error de conexión con el servidor Odoo');
            console.log(error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="ausencias-container">
            <h1>Ausencias</h1>
            <section className="form-section">
                <form className="ausencias-form" onSubmit={manejarFiltro}>
                    <label htmlFor="fecha">Filtrar por fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                    <button type="button" onClick={() => { setFecha(''); setAusenciaFiltro(ausencias); }}>Limpiar</button>
                </form>
                <form onSubmit={handleSubmit} className="ausencias-form-horizontal">
                    <div className="form-group">
                        <label>Solicitante:</label>
                        <select
                            name="employee_id"
                            value={datosAusencias.employee_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un empleado...</option>
                            {empleados.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Inicio:</label>
                        <input type="date"
                            name="fecha_inicio"
                            min={fechaMinima}
                            value={datosAusencias.fecha_inicio}
                            onChange={handleChange}
                            required />
                    </div>

                    <div className="form-group">
                        <label>Fin:</label>
                        <input type="date"
                            name="fecha_fin"
                            min={datosAusencias.fecha_inicio || fechaMinima}
                            value={datosAusencias.fecha_fin}
                            onChange={handleChange}
                            required />
                    </div>

                    <div className="form-group">
                        <label>Motivo:</label>
                        <select name="tipo_motivo" value={datosAusencias.tipo_motivo}
                            onChange={handleChange}>
                            {opcionesMotivo.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Descripción:</label>
                        <input type="text" name="descripcion_motivo"
                            value={datosAusencias.descripcion_motivo}
                            onChange={handleChange} placeholder="Ej: Cita médica"
                            required
                        />
                    </div>

                    <button type="submit" disabled={cargando} className="btn-crear">
                        {cargando ? 'Enviando...' : 'Solicitar Ausencia'}
                    </button>
                </form>
            </section>

            {error && <p className="error">{error}</p>}
            <section className="list-section">
                <h2>Historial de Ausencias</h2>
                {cargando && ausencias.length === 0 ? (
                    <p>Cargando...</p>
                ) : (
                    <table className="ausencias-table">
                        <thead>
                            <tr>
                                <th>Empleado dni</th>
                                <th>Empleado nombre</th>
                                <th>Fechas Inicio Ausencia</th>
                                <th>Fechas Fin Ausencia</th>
                                <th>Motivo</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ausenciaFiltro.map((aus) => (
                                <tr key={aus.id}>
                                    <td>{aus.id}</td>
                                    <td><strong>{aus.employee_name}</strong></td>
                                    <td>{aus.fecha_inicio}</td>
                                    <td>{aus.fecha_fin}</td>
                                    <td><span className={`label-${aus.tipo_motivo}`}>{aus.tipo_motivo}</span></td>
                                    <td>{aus.descripcion_motivo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default Ausencias;