import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import EmpresaDepartamento from './EmpresaDepartamento';
import '../styles/EditUser.css';
import EmpresaService from '../Services/EmpresaService';

function EditUser() {
    const history = useHistory();
    const [mostrarDatos, setMostrarDatos] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [cargandoDatos, setCargandoDatos] = useState(true);
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');
    const [departamentos, setDepartamentos] = useState([]);
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
        dni: '',
        tipoUsuario: ''
    });

    useEffect(() => {
        const cargarDatosUsuario = () => {
            try {
                const usuario = AuthService.getCurrentUser();
                
                if (!usuario) {
                    setError('No hay sesión activa. Redirigiendo...');
                    setTimeout(() => history.push('/'), 2000);
                    return;
                }

                console.log('Usuario cargado:', usuario);
                
                setDatos({
                    nombre: usuario.firstName || '',
                    apellidos: usuario.lastName || '',
                    fechaNacimiento: usuario.birthdate || '',
                    email: usuario.email || '',
                    nuevaContraseña: '',
                    confirmarContraseñaNueva: '',
                    fechaContratacion: usuario.contractDate || '', 
                    numSS: usuario.ss || '', 
                    departamento: usuario.departmentId || '',
                    dni: usuario.dni || '',
                    tipoUsuario: usuario.userType || ''
                });
                
            } catch (error) {
                console.error('Error al cargar usuario:', error);
                setError('No se pudieron cargar los datos del usuario.');
            } finally {
                setCargandoDatos(false);
            }
        };

        cargarDatosUsuario();
    }, [history]);

    useEffect(() => {
        const cargarDepartamentos = async () => {
            try {
                const response = await EmpresaService.getAllDepartamentos();
                setDepartamentos(response.data);
            } catch (error) {
                console.error('Error al cargar departamentos:', error);
            }
        };

        cargarDepartamentos();
    }, []);

    const handlerDepar = (e) => {
        const departamentoId = e.target.value;
        setDatos((prevDatos) => ({
            ...prevDatos,
            departamento: departamentoId
        }));
        if (error) setError('');
        if (exito) setExito('');
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos((prevDatos) => ({
            ...prevDatos,
            [name]: value
        }));
        if (error) setError('');
        if (exito) setExito('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!datos.nombre.trim() || !datos.apellidos.trim() || !datos.email.trim()) {
            setError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        if (datos.nuevaContraseña && datos.nuevaContraseña !== datos.confirmarContraseñaNueva) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (datos.nuevaContraseña && datos.nuevaContraseña.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            setCargando(true);
            setError('');
            setExito('');

            console.log('Enviando actualización de perfil...');
            
            const datosActualizados = {
                dni: datos.dni,
                firstName: datos.nombre,
                lastName: datos.apellidos,
                email: datos.email,
                ...(datos.nuevaContraseña && { password: datos.nuevaContraseña }),
                birthday: datos.fechaNacimiento || null,
                contractDate: datos.fechaContratacion || null,
                socialSecurity: datos.numSS|| null,
                departamento: datos.departamento ? { id: Number(datos.departamento) } : null
            };

            console.log('Datos a actualizar:', datosActualizados);

            // genarado en AuthService.js, método updateProfile
            await AuthService.updateProfile(datos.dni, datosActualizados);

            // Actualizar localStorage
            const usuarioActualizado = {
                ...AuthService.getCurrentUser(),
                ...datosActualizados
            };
            localStorage.setItem('user', JSON.stringify(usuarioActualizado));

            setExito('Perfil actualizado con éxito.');

            // Limpiar contraseñas
            setDatos(prev => ({
                ...prev,
                nuevaContraseña: '',
                confirmarContraseñaNueva: ''
            }));

        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            setError('No se pudo actualizar el perfil. Intenta de nuevo.');
        } finally {
            setCargando(false);
        }
    };

    const handleVolver = () => {
        history.push('/dashboard');
    };

    if (cargandoDatos) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                Cargando datos del usuario...
            </div>
        );
    }

    return (
        <div className="edit-user-container">
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

                            <label htmlFor="apellidos" className="register-label">Apellidos</label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                className="register-input"
                                value={datos.apellidos}
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
                                disabled={true}
                                style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed', color: '#555' }}
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

                            <label htmlFor="nuevaContraseña" className="register-label">
                                Nueva contraseña (dejar en blanco para no cambiar)
                            </label>
                            <input
                                type="password"
                                id="nuevaContraseña"
                                name="nuevaContraseña"
                                className="register-input"
                                value={datos.nuevaContraseña}
                                onChange={handleChange}
                                placeholder="Mínimo 6 caracteres"
                                disabled={cargando}
                            />

                            {datos.nuevaContraseña && (
                                <>
                                    <label htmlFor="confirmarContraseñaNueva" className="register-label">
                                        Confirmar nueva contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmarContraseñaNueva"
                                        name="confirmarContraseñaNueva"
                                        className="register-input"
                                        value={datos.confirmarContraseñaNueva}
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

                                    <label htmlFor="numSS" className="register-label">
                                        Nº Seguridad Social
                                    </label>
                                    <input
                                        type="text"
                                        id="numSS"
                                        name="numSS"
                                        className="register-input"
                                        value={datos.numSS}
                                        onChange={handleChange}
                                        placeholder="12 34567890 12"
                                        disabled={cargando}
                                    />

                                    <label htmlFor="departamento" className="register-label">Departamento</label>
                                    <select id="departamento"
                                        name="departamento"
                                        className="register-input"
                                        value={datos.departamento}
                                        onChange={handlerDepar}
                                        disabled={cargando}
                                    >
                                        <option value="">Selecciona departamento</option>
                                        {departamentos.map((depar) => (
                                            <option key={depar.id} value={depar.id}>
                                                {depar.nombreDepar}
                                            </option>
                                        ))}
                                    </select>

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

                    <div className='button-container'>
                        <button type="submit" className="register-submit" disabled={cargando}>
                            {cargando ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                        
                        <button type="button" className="register-cancel" 
                        onClick={handleVolver} disabled={cargando}>
                            {cargando ? 'Cancelando...' : 'Cancelar'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default EditUser;