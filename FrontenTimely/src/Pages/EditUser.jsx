import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function EditUser() {
    const history = useHistory();
    const [mostrarDatos, setMostrarDatos] = useState(true);

    const [cargando, setCargando] = useState(false);

    const [cargandoDatos, setCargandoDatos] = useState(true);

    const [error, setError] = useState('');
    const [exito, setExito] = useState('');

    const [datos, setDatos] = useState({
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        email: '',
        nuevaContraseña: '',
        confirmarContraseñaNueva: '',
        fechaContratacion: '',
        numSS: '',
        departamento: '',
        //dni y tipoUsuario se mantienen pero no se pueden editar
        dni: '',
        tipoUsuario: ''
    });

    useEffect(() => {
        const cargarDatosUsuario = () => {
            try {
                const usuario = JSON.parse(localStorage.getItem('usuario'));
                if (usuario) {
                    setDatos({
                        nombre: usuario.nombre || '',
                        apellidos: usuario.apellidos || '',
                        fechaNacimiento: usuario.fechaNacimiento || '',
                        email: usuario.email || '',
                        nuevaContraseña: '',
                        confirmarContraseñaNueva: '',
                        fechaContratacion: usuario.fechaContratacion || '',
                        numSS: usuario.numSS || '',
                        departamento: usuario.departamento || ''
                    });
                    console.log("Usuario cargado", usuario);
                    
                }else{
                    setError('No se encontraron datos del usuario. Por favor, inicia sesión nuevamente.');
                    history.push('/'); // Redirige al login si no hay datos de usuario
                }
            }catch (error) {
                console.error("Error al cargar el usuario", error);
                setError('No se pudieron cargar los datos del usuario. Por favor, inténtalo de nuevo.');
            } finally {
                setCargandoDatos(false);
            }
        };
        cargarDatosUsuario();
    }, [history]);


        const handleChange = (e) => {
            const { name, value } = e.target;
            setDatos((prevDatos) => ({
                ...prevDatos,
                [name]: value
            }));
            if (error) setError('');
            if (exito) setExito('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!datos.nombre.trim() || !datos.apellidos.trim() || !datos.email.trim()) {
            setError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        if (datos.nuevaContraseña !== datos.confirmarContraseñaNueva){
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (datos.nuevaContraseña.length < 6){
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

    try{
        setCargando(true);
        setError('');
        setExito('');

        console.log("Enviando actualizacion de perfil");
        
        const datosActualizados = {
            dni: datos.dni,
            firstName: datos.nombre,
            lastName: datos.apellidos,
            email: datos.email,
            newPassword: datos.nuevaContraseña,
            birthday: datos.fechaNacimiento,
            ssDate: datos.fechaContratacion,
            ssNumber: datos.numSS,
            department: datos.departamento
        }

        //LLamada a la api?????

        setExito('Perfil actualizado con éxito.');
        setCargando(false);

        setDatos(pre => ({// limpiamos los datos de la contraseña para seguridad
            ...pre,
            nuevaContraseña: '',
            confirmarContraseñaNueva: ''
        }));
    }catch (error) {
        console.error("Error al actualizar el perfil", error);
        setError('No se pudo actualizar el perfil. Por favor, inténtalo de nuevo.');
        setCargando(false);
    }

    const handleVolver = () => {
        history.push('/dashboard');
    };

    if (cargandoDatos) {
        return <div>Cargando datos del usuario...</div>;
    }

    return (
                <div className="register-layout">
            <aside className="register-side-panel">
                <p className="register-kicker">Timely</p>
                <h1 className="register-side-title">Editar Perfil</h1>
                <p className="register-side-copy">
                    Actualiza tus datos personales y de empresa. Los cambios se guardarán en tu cuenta.
                </p>
            </aside>

            <section className="register-form-panel">
                <form className="register-card" onSubmit={handleSubmit}>
                    <h2 className="register-card-title">Mis Datos</h2>
                    <p className="register-card-subtitle">Edita la información que desees actualizar</p>

                    {error && <div className="register-error">{error}</div>}
                    {exito && <div className="register-success">{exito}</div>}

                    <div className="register-grid">
                        <div className="left-side">
                            <label htmlFor="nombre" className="register-label">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className="register-input"
                                value={datos.nombre}
                                onChange={handleChange}
                                placeholder="Juan"
                                required
                                disabled={cargando}
                            />

                            <label htmlFor="apellido" className="register-label">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                className="register-input"
                                value={datos.apellido}
                                onChange={handleChange}
                                placeholder="García López"
                                required
                                disabled={cargando}
                            />

                            <label htmlFor="dni" className="register-label">DNI</label>
                            <input
                                type="text"
                                id="dni"
                                name="dni"
                                className="register-input"
                                value={datos.dni}
                                disabled={true} // DNI no se puede cambiar
                                style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                            />

                            <label htmlFor="fechaNacimiento" className="register-label">Fecha de nacimiento</label>
                            <input
                                type="date"
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                className="register-input"
                                value={datos.fechaNacimiento}
                                onChange={handleChange}
                                disabled={cargando}
                            />
                        </div>

                        <div className="right-side">
                            <label htmlFor="email" className="register-label">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="register-input"
                                value={datos.email}
                                onChange={handleChange}
                                placeholder="tu@empresa.com"
                                required
                                disabled={cargando}
                            />

                            <label htmlFor="nuevaContrasena" className="register-label">
                                Nueva contraseña (dejar en blanco para no cambiar)
                            </label>
                            <input
                                type="password"
                                id="nuevaContrasena"
                                name="nuevaContrasena"
                                className="register-input"
                                value={datos.nuevaContrasena}
                                onChange={handleChange}
                                placeholder="Mínimo 6 caracteres"
                                disabled={cargando}
                            />

                            {datos.nuevaContrasena && (
                                <>
                                    <label htmlFor="confirmarContrasena" className="register-label">
                                        Confirmar nueva contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmarContrasena"
                                        name="confirmarContrasena"
                                        className="register-input"
                                        value={datos.confirmarContrasena}
                                        onChange={handleChange}
                                        placeholder="Repite la contraseña"
                                        disabled={cargando}
                                    />
                                </>
                            )}

                            <label className="register-checkbox-label">
                                <input
                                    type="checkbox"
                                    className="register-checkbox"
                                    checked={mostrarDatos}
                                    onChange={(e) => setMostrarDatos(e.target.checked)}
                                    disabled={cargando}
                                />
                                Mostrar datos de empresa
                            </label>

                            {mostrarDatos && (
                                <div className="register-extra-fields">
                                    <label htmlFor="fechaContratacion" className="register-label">
                                        Fecha de contratación
                                    </label>
                                    <input
                                        type="date"
                                        id="fechaContratacion"
                                        name="fechaContratacion"
                                        className="register-input"
                                        value={datos.fechaContratacion}
                                        onChange={handleChange}
                                        disabled={cargando}
                                    />

                                    <label htmlFor="numeroSeguroSocial" className="register-label">
                                        Nº Seguridad Social
                                    </label>
                                    <input
                                        type="text"
                                        id="numeroSeguroSocial"
                                        name="numeroSeguroSocial"
                                        className="register-input"
                                        value={datos.numeroSeguroSocial}
                                        onChange={handleChange}
                                        placeholder="12 34567890 12"
                                        disabled={cargando}
                                    />

                                    <label htmlFor="tipoUsuario" className="register-label">Tipo de Usuario</label>
                                    <input
                                        type="text"
                                        id="tipoUsuario"
                                        name="tipoUsuario"
                                        className="register-input"
                                        value={datos.tipoUsuario}
                                        disabled={true}
                                        style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="register-submit" disabled={cargando}>
                            {cargando ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                        
                        <button 
                            type="button" 
                            className="register-cancel" 
                            onClick={handleVolver}
                            disabled={cargando}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}


export default EditUser;