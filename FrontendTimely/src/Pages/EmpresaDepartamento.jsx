import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import EmpresaService from "../Services/EmpresaService";
import '../styles/EmpresaDepartamento.css';

function EmpresaDepartamento() {
    const history = useHistory();
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');
    const [cargando, setCargando] = useState(false);
    const [datos, setDatos] = useState({
        nif : '',
        nombreEmpresa : '',
        direccion : '',
        idDepartamento : '',
        nombreDepar : '',
        idEmpresa : '',
        usuarios : []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos((prev) => ({
            ...prev,
            [name]: value
        }));
        if (error) {
            setError('');
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!datos.nif || !datos.nombreDepar) {
            setError('Por favor completa todos los campos obligatorios');
            console.log('Datos incompletos:', datos.nif, datos.nombreDepar);
            
            return;
        }
        try{
            setCargando(true);
            setError('');
            setExito('');

            const empresaData = {
                nif: datos.nif,
                nombreEmpre: datos.nombreEmpresa,
                direccion: datos.direccion
            };
            const departamentoData = {
                nombreDepar: datos.nombreDepar,
                empresa: {nif: datos.nif},
                usuarios: datos.usuarios
            };

            let empresaExiste = true;
            try {
                await EmpresaService.getEmpresaByNif(datos.nif);
            } catch (err) {
                if (err?.response?.status === 404) {
                    empresaExiste = false;
                } else {
                    throw err;
                }
            }

            if (!empresaExiste) {
                if (!datos.nombreEmpresa.trim() || !datos.direccion.trim()) {
                    setError('La empresa no existe. Indica nombre y direccion para crearla.');
                    return;
                }
                await EmpresaService.createEmpresa(empresaData);
            }

            await EmpresaService.createDepartamento(departamentoData);
            

            setExito('Empresa y departamento creados exitosamente');
            setDatos({
                nif : '',
                nombreEmpresa : '',
                direccion : '',
                idDepartamento : '',
                nombreDepar : '',
                idEmpresa : '',
                usuarios : []
            }); 
            
        }catch (err) {
            console.error('Error al crear empresa o departamento:', err);
            setError('No se pudo crear la empresa o el departamento. Inténtalo de nuevo más tarde.');
        } finally {
            setCargando(false);
        }

    }


    return (
        <div className="empresa-departamento-container">
            <aside className="empresa-departamento-side-panel">
                <p className="empresa-departamento-kicker">Timely</p>
                <h1 className="empresa-departamento-side-title">Crea tu empresa y departamento</h1>
                <p className="empresa-departamento-side-copy">
                    Crea la empresa y el departamento para gestionar tus proyectos de manera eficiente. Con Timely, puedes organizar tu trabajo y colaborar con tu equipo de forma sencilla. ¡Empieza ahora y lleva tu productividad al siguiente nivel!
                </p>
            </aside>

            <section className="empresa-departamento-form-panel">
                <form className="empresa-departamento-card" onSubmit={handleSubmit}>
                    <h2 className="empresa-departamento-card-title">Crear una empresa y departamento</h2>
                    <p className="empresa-departamento-card-subtitle">Rellena los datos para crear tu empresa y departamento</p>

                    {error && <div className="empresa-departamento-error">{error}</div>}
                    {exito && <div className="empresa-departamento-success">{exito}</div>}

                    <div className="empresa-departamento-grid">
                        <div className="empresa-departamento-left-side">
                            <p>Datos de la empresa dejar vacío si solo quieres crear un departamento</p>
                            <label htmlFor="nombre-empresa" className="empresa-departamento-label">Nombre de la empresa</label>
                            <input
                                type="text"
                                id="nombre-empresa"
                                name="nombreEmpresa"
                                className="empresa-departamento-input"
                                value={datos.nombreEmpresa}
                                onChange={handleChange}
                                placeholder="Inditex S.A."
                                disabled={cargando}
                            />

                            <label htmlFor="direccion" className="empresa-departamento-label" >Dirección</label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                className="empresa-departamento-input"
                                value={datos.direccion}
                                onChange={handleChange}
                                placeholder="Calle Falsa 123, Madrid"
                                disabled={cargando}
                            />
                        </div>

                        <div className="empresa-departamento-right-side">
                            <p>Datos <br/>del departamento</p>
                            <label htmlFor="nombre-departamento" className="empresa-departamento-label">Nombre del departamento</label>
                            <input
                                type="text"
                                id="nombre-departamento"
                                name="nombreDepar"
                                className="empresa-departamento-input"
                                value={datos.nombreDepar}
                                onChange={handleChange}
                                placeholder="Departamento de Ventas"
                                required
                                disabled={cargando}
                            />
                            <label htmlFor="nif" className="empresa-departamento-label" >NIF</label>
                            <input
                                type="text"
                                id="nif"
                                name="nif"
                                className="empresa-departamento-input"
                                value={datos.nif}
                                onChange={handleChange}
                                placeholder="G12345678A"
                                required
                                disabled={cargando}
                            />
                        </div>
                    </div>

                    <button type="submit" className="register-submit" disabled={cargando}>
                        {cargando ? 'Registrando...' : 'Registrar'}
                    </button>
                </form>
            </section>
        </div>
    );
}

export default EmpresaDepartamento;