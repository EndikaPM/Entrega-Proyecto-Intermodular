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
            if (usuarioLogeado.userType === 'Administrador') {
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
        console.log("Fichaje seleccionado: ", fichaje);
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

    const modificarFichaje = async (id, fichaje) => {
        try {
            await JornadaService.update(id, fichaje);
            setFichajes(fichajes.map(f => f.id === id ? { ...f, ...fichaje } : f));
            setFichajeSeleccionado(null);//Quitamos la selección después de modificar
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
                {AuthService.getCurrentUser()?.userType === 'Administrador'?(
                    <>
                        <button
                            className='bg-red-500 mx-5 px-4 py-2 rounded hover:bg-red-600 shadow-md start self-start'
                            onClick={() => eliminarFichaje(fichajeSeleccionado?.id)}
                            disabled={!fichajeSeleccionado}
                        >Eliminar
                        </button>

                        <div className='gap-2 flex items-center'>
                            <label className=" mx-5 px5" htmlFor="filtroNombre">Buscar por nombre</label>
                            <input className="border border-white p-1 rounded" type="text" id="filtroNombre" value={filtroNombre} 
                                onChange={(e) => setFiltroNombre(e.target.value)} />
                                <button className='border rounded border-black bg-yellow-700 py-8 px-8' onClick={() => setFiltroNombre('')}>Limpiar</button>
                        </div>
                        <div className='gap-2 flex items-center'>
                            <label className=" mx-5 px5"htmlFor='filtroFecha'>Buscar un registro por fecha</label>
                            <input className="border border-white p-1 rounded" type="date" id="filtroFecha" value={filtroFecha} 
                                onChange={(e) => setFiltroFecha(e.target.value)} />
                                <button className='border rounded bg-yellow-700 py-8 px-8' onClick={() => setFiltroFecha('')}>Limpiar</button>
                        </div>
                    </>
                ):
                <>
                    <div className='flex flex-col'>
                        <label htmlFor='filtroFecha'className="text-sm">Buscar un registro por fecha</label>
                        <input type="date" id="filtroFecha" className="text-black p-1 rounded" value={filtroFecha} 
                            onChange={(e) => setFiltroFecha(e.target.value)} />
                            <button className='border rounded bg-yellow-700 py-8 px-8' onClick={() => setFiltroFecha('')}>Limpiar</button>
                    </div>
                </>}
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
                                    <tr className='bg-green-300'>
                                        <td colSpan="5" className="border border-white p-3">No hay fichajes disponibles.</td>
                                    </tr>
                                ) : (
                                    filtrarFichajes.map((fichaje) => {
                                        //Comprobamos si la fila ha sido seleccionada para aplicar un estilo diferente
                                        const esSeleccionado = fichajeSeleccionado?.id === fichaje.id;

                                        return (
                                        <tr 
                                        key={fichaje.id}
                                        onClick={() => seleccionarFichaje(fichaje)} 
                                        //esto es una clase dinamica que cambia el fondo si la fila es seleccionada o no
                                        className={`
                                            cursor-pointer transition-colors border border-white
                                            ${esSeleccionado 
                                                ? 'bg-gray-500 text-black' 
                                                : 'bg-black text-white hover:bg-gray-600'}`
                                            } >
                                            <td className="border border-white p-3">{fichaje.usuario?.firstName}</td>
                                            <td className="border border-white p-3">{fichaje.fechaActual}</td>
                                            <td className="border border-white p-3">{fichaje.horaEntrada}</td>
                                            <td className="border border-white p-3">{fichaje.horaSalida || 'En línea'}</td>
                                            <td className="border border-white p-3">{fichaje.modificado === 1 ? 'Sí' : 'No'}</td>
                                        </tr>)
                                        
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className='w-full lg:w-80 p-6 border border-gray-700 rounded-lg bg-gray-800 shadow-xl flex flex-col gap-4 sticky top-8'>
                        <h3 className='text-center text-lg font-semibold border-b border-gray-700 pb-2 text-green-400'>Editar Registro</h3>
                        
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-400' htmlFor="firstName">Nombre</label>
                            <input disabled className='bg-gray-900 border border-gray-700 p-2 rounded text-gray-500 cursor-not-allowed' type="text" id="firstName" value={fichajeSeleccionado?.usuario?.firstName || ''} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-400' htmlFor="date">Fecha</label>
                            <input className='bg-gray-700 border border-gray-600 p-2 rounded text-white' type="date" id="date" value={fichajeSeleccionado?.fechaActual || ''} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-400' htmlFor="horaEntrada">Hora Entrada</label>
                            <input className='bg-gray-700 border border-gray-600 p-2 rounded text-white' type="time" step="1" id="horaEntrada" value={fichajeSeleccionado?.horaEntrada || ''} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-400' htmlFor="horaSalida">Hora Salida</label>
                            <input className='bg-gray-700 border border-gray-600 p-2 rounded text-white' type="time" step="1" id="horaSalida" value={fichajeSeleccionado?.horaSalida || ''} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-400' htmlFor="reason">Motivo</label>
                            <input disabled className='bg-gray-900 border border-gray-700 p-2 rounded text-gray-500' type="text" id="reason" value={fichajeSeleccionado?.usuario?.firstName || ''} />
                        </div>

                        <button
                            className='mt-2 bg-gradient-to-r from-green-500 to-blue-600 px-4 py-3 rounded font-bold hover:from-green-600 hover:to-blue-700 transition-all shadow-lg disabled:opacity-30'
                            onClick={() => modificarFichaje(fichajeSeleccionado?.id, { /* datos */ })}
                            disabled={!fichajeSeleccionado}
                        >
                            Guardar Cambios
                        </button>
                    </div>

                </div>
            </div>
    )
}

export default FicharList