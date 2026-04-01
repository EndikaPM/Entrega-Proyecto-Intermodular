import { useEffect, useState, useMemo } from 'react'
import JornadaService from '../Services/JornadaService';
import AuthService from '../Services/AuthService';

function FicharList() {
    //Necesita gardar la lista
    const [fichajes, setFichajes] = useState([]);
    const [filtroFecha, setFiltroFecha] = useState('');
    const [filtroNombre, setFiltroNombre] = useState('');
    const [fichajeSeleccionado, setFichajeSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');

    const [datosJornada, setDatosJornada] = useState({
        usuarioModificador: '',
        date: '',
        horaEntrada: '',
        horaSalida: '',
        reason: ''
    });

    useEffect(() => {
        cargarDatosFchages();
    }, []);

    const cargarDatosFchages = async () => {
        try {
            setCargando(true);
            setError('');

            const usuarioLogeado = AuthService.getCurrentUser();
            if (!usuarioLogeado) {
                setError('No hay sesión activa.');
                return;
            }
            if (usuarioLogeado.userType === 'Administrador' ||  AuthService.getCurrentUser()?.userType === 'Jefe') {
                const respuesta = await JornadaService.getAll();
                console.log("Respesta de SpringBoot: ", respuesta);
                console.table(respuesta.data);
                
                setFichajes(respuesta.data);
                return;
            }else {
                const respuesta = await JornadaService.getFichajesDNI(usuarioLogeado.dni);
                console.log("Respesta de SpringBoot: ", respuesta);
                console.table(respuesta.data);
                
                setFichajes(respuesta.data);
            }
        } catch (error) {
            console.error('Error al cargar los fichajes:', error);
            setError('Error al cargar los fichajes. Inténtalo de nuevo.');
        } finally {
            setCargando(false);
        }
    };

    const seleccionarFichaje = (fichaje) => {
        setFichajeSeleccionado(fichaje);
        setDatosJornada({
            usuarioModificador: AuthService.getCurrentUser(),
            date: fichaje.fechaActual,
            horaEntrada: fichaje.horaEntrada,
            horaSalida: fichaje.horaSalida,
            reason: ''
        });
        console.log("Fichaje seleccionado: ", fichaje);
    }

    const handlerChange = (e) => {
        const valor = e.target.value;
        setDatosJornada((preDatos) => ({
            ...preDatos,
            [e.target.id]: valor
        }));

        if(error) setError('');
        if(exito) setExito('');
    }

    const eliminarFichaje = async (id) => {
        // Confirmación antes de eliminar
        if(!window.confirm("¿Estás seguro de que deseas eliminar este fichaje?")) return;
        try {
            await JornadaService.delete(id);
            setFichajes(fichajes.filter(f => f.id !== id));
            setFichajeSeleccionado(null);//Quitamos la selección después de eliminar
        } catch (error) {
            console.error('Error al eliminar el fichaje:', error);
            setError('Error al eliminar el fichaje. Inténtalo de nuevo.');
        }
    };

    const modificarFichaje = async (e) => {
        e.preventDefault();
        if (!fichajeSeleccionado) {
            setError('No hay fichaje seleccionado para modificar.');
            return;
        }
        try {
            const objetoParaEnviar = {
                jornada: {
                    id: fichajeSeleccionado.id,
                    fechaActual: datosJornada.date,
                    horaEntrada: datosJornada.horaEntrada,
                    horaSalida: datosJornada.horaSalida,
                    usuario: AuthService.getCurrentUser()
            },
            motivo: datosJornada.reason
        }
            await JornadaService.update(fichajeSeleccionado.id, objetoParaEnviar);
            setFichajes(fichajes.map(f => f.id === fichajeSeleccionado.id ? { ...f,
                fechaActual: datosJornada.date,
                horaEntrada: datosJornada.horaEntrada,
                horaSalida: datosJornada.horaSalida,
                modificado: 1
            } : f));

            setExito('Fichaje modificado con éxito.');
            setFichajeSeleccionado(null);//Quitamos la selección después de modificar
            console.log("Fichaje modificado: ", objetoParaEnviar);

            setDatosJornada({
                usuarioModificador: '',
                date: '',
                horaEntrada: '',
                horaSalida: '',
                reason: ''
            });
        } catch (error) {
            console.error('Error al modificar el fichaje:', error);
            setError('Error al modificar el fichaje. Inténtalo de nuevo.');
        }
    };

    /*
    useMemo es un Hook que sirve para memorizar el resultado de una función. Imagínatelo como una "caché" inteligente.
    *En lugar de recalcular el valor en cada renderizado, React guarda el resultado en
    *memoria y solo lo vuelve a calcular si las dependencias que tú le indiques cambian
    */
    const filtrarFichajes = useMemo(() => {
        let filtra = []
        filtra =filtroFecha ? fichajes.filter(f => f.fechaActual === filtroFecha) : fichajes;
        filtra = filtroNombre ? filtra.filter(f => f.usuario?.firstName.toLowerCase().includes(filtroNombre.toLowerCase())) : filtra;
        return filtra;
    }, [fichajes, filtroFecha, filtroNombre]);// Solo se recalcula si algo de esto cambia

    if (cargando) {
        return (
            <div className="flex justify-center items-center h-screen text-white bg-gray-900">
                Cargando fichajes...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-white bg-gray-900">
                ERROR: {error}
            </div>
        );
    } 
    return (
        <div className='min-h-screen mx-auto p-8 flex flex-col items-center gap-6'>
            <h2 className='text-3xl font-bold mb-10'>Lista de Fichajes</h2>
            
                <div className='w-full max-w-6xl p-6 rounded-lg mb-10 flex flex-wrap gap-6 items-end justify-center'>
                    {AuthService.getCurrentUser()?.userType === 'Administrador' && (
                        <>
                            <button
                                className='bg-red-500 mx-5 px-4 py-2 rounded hover:bg-red-600 shadow-md start self-start'
                                onClick={() => eliminarFichaje(fichajeSeleccionado?.id)}
                                disabled={!fichajeSeleccionado}
                            >Eliminar
                            </button>
                        </>

                    )}{(AuthService.getCurrentUser()?.userType === 'Administrador' ||AuthService.getCurrentUser()?.userType === 'Jefe') && (
                        <div className='gap-2 flex'>
                                <label className=" mx-5 px5" htmlFor="filtroNombre">Buscar por nombre</label>
                                <input className="border border-[var(--border-color)] p-1 rounded" type="text" id="filtroNombre" value={filtroNombre} 
                                    onChange={(e) => setFiltroNombre(e.target.value)} />
                        </div>
                    )}
                    <>
                        <div className='flex  gap-2'>
                            <label htmlFor='filtroFecha'className="text-sm">Buscar un registro por fecha</label>
                            <input type="date" id="filtroFecha" className="border border-[var(--border-color)] p-1 rounded" value={filtroFecha} 
                                onChange={(e) => setFiltroFecha(e.target.value)} />
                                <button className='border rounded bg-yellow-700 py-8 px-8' onClick={() => setFiltroFecha('')}>Limpiar</button>
                        </div>
                    </>
                    
                </div>
                <div className= 'w-full max-w-7xl flex flex-col lg:flex-row gap-8 items-start justify-center'>
                    <div className='flex-grow overflow-x-auto shadow-2xl rounded-lg'>
                        <table className='w-full border-collapse border border-white text-center'>
                            <thead>
                                <tr className='bg-gradient-to-r from-green-900 to-green-300 text-lg font-semibold'>
                                    <th className='border border-white p-3'>Nombre</th>
                                    <th className='border border-white p-3'>Fecha</th>
                                    <th className='border border-white p-3'>Hora entrada</th>
                                    <th className='border border-white p-3'>Hora salida</th>
                                    <th className='border border-white p-3'>Modificado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fichajes.length === 0 ? (
                                    <tr className='bg-[var(--bg-primary)] text-[var(--text-primary)]'>
                                        <td colSpan="5" className="border border-white p-3">No hay fichajes disponibles.</td>
                                    </tr>
                                ) : (
                                    filtrarFichajes.map((fichaje, index) => {
                                        //Comprobamos si la fila ha sido seleccionada para aplicar un estilo diferente
                                        const esSeleccionado = fichajeSeleccionado?.id === fichaje.id;

                                        return (
                                        <tr 
                                        key={fichaje.id}
                                        onClick={() => seleccionarFichaje(fichaje)} 
                                        //esto es una clase dinamica que cambia el fondo si la fila es seleccionada o no
                                        className={`
                                            cursor-pointer transition-colors border border-[var(--border-primary)]
                                            ${esSeleccionado 
                                                ? 'bg-gray-500 text-black' 
                                                : index % 2 === 0 
                                                    ? 'bg-[var(--bg-primary-table)] text-[var(--text-primary)] hover:bg-gray-700' 
                                                    : 'bg-[var(--bg-secondary-table)] text-[var(--text-primary)] hover:bg-gray-700'}`
                                            } >
                                            <td className="border border-[var(--border-primary)] p-3">{fichaje.usuario?.firstName}</td>
                                            <td className="border border-[var(--border-primary)] p-3">{fichaje.fechaActual}</td>
                                            <td className="border border-[var(--border-primary)] p-3">{fichaje.horaEntrada}</td>
                                            <td className="border border-[var(--border-primary)] p-3">{fichaje.horaSalida || 'En línea'}</td>
                                            <td className="border border-[var(--border-primary)] p-3">{fichaje.modificado ? 'Sí' : 'No'}</td>
                                        </tr>)
                                        
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className='w-full lg:w-80 p-6 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)] shadow-xl flex flex-col gap-4 sticky top-8'>
                        <h3 className='text-center text-lg font-semibold border-b border-[var(--border-primary)] pb-2 text-[var(--text-primary)]'>Editar Registro</h3>
                        
                        <form onSubmit={modificarFichaje}>
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs text-[var(--text-primary)]' htmlFor="firstName">Nombre</label>
                                <input disabled className='bg-[var(--bg-primary)]  border border-gray-700 p-2 rounded text-[var(--text-primary)] cursor-not-allowed' 
                                type="text" id="firstName" value={fichajeSeleccionado?.usuario?.firstName || ''} onChange={handlerChange}/>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-xs text-[var(--text-primary)]' htmlFor="date">Fecha</label>
                                <input className='bg-[var(--bg-primary)]  border border-gray-600 p-2 rounded text-[var(--text-primary)]' 
                                type="date" id="date" value={datosJornada.date || ''}  onChange={handlerChange}/>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-xs text-[var(--text-primary)]' htmlFor="horaEntrada">Hora Entrada</label>
                                <input className='bg-[var(--bg-primary)]  border border-gray-600 p-2 rounded text-[var(--text-primary)]' 
                                type="time" step="1" id="horaEntrada" value={datosJornada.horaEntrada || ''} onChange={handlerChange}/>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-xs text-[var(--text-primary)]' htmlFor="horaSalida">Hora Salida</label>
                                <input className='bg-[var(--bg-primary)]  border border-gray-600 p-2 rounded text-[var(--text-primary)]' 
                                type="time" step="1" id="horaSalida" value={datosJornada.horaSalida || ''} onChange={handlerChange}/>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs text-[var(--text-primary)]' htmlFor="reason">Motivo</label>
                                <textarea className='bg-[var(--bg-primary)]  border border-gray-700 p-2 rounded text-[var(--text-primary)]' 
                                id="reason" value={datosJornada.reason || ''} onChange={handlerChange}/>
                            </div>

                            <button
                                className='mt-2 bg-gradient-to-r from-green-500 to-blue-600 px-4 py-3 rounded font-bold
                                hover:from-green-600 hover:to-blue-700 transition-all shadow-lg disabled:opacity-30 justify-center w-full flex items-center gap-2'
                                type="submit"
                                disabled={!fichajeSeleccionado}
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>

                </div>
            </div>
    )
}

export default FicharList