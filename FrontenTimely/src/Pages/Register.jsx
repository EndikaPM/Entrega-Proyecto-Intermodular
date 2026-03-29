import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Register.css';
import AuthService from '../Services/AuthService.js';


function Register() {
    const history = useHistory();
    const [mostrarDatos, setMostrarDatos] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        fechaNacimiento: '',
        email: '',
        contrasena: '',
        confirmarContrasena: '',
        fechaContratacion: '',
        numeroSeguroSocial: ''
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

        // Validar campos obligatorios
        if (!datos.nombre || !datos.apellido || !datos.email || !datos.contrasena || !datos.confirmarContrasena) {
            setError('Por favor completa todos los campos obligatorios');
            return;
        }

        // Validar que las contraseñas coincidan
        if (datos.contrasena !== datos.confirmarContrasena) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            setCargando(true);
            setError('');
            setExito('');

            // Llamar al backend para registrar
            const response = await AuthService.register({
                nombre: datos.nombre,
                apellido: datos.apellido,
                dni: datos.dni,
                fechaNacimiento: datos.fechaNacimiento,
                email: datos.email,
                contrasena: datos.contrasena,
                fechaContratacion: mostrarDatos ? datos.fechaContratacion : null,
                numeroSeguroSocial: mostrarDatos ? datos.numeroSeguroSocial : null
            });
            console.table(response);

            setExito('Registro exitoso. Redirigiendo a login...');
            setTimeout(() => {
                history.push('/');
            }, 2000);

        } catch (err) { 
            console.error('Error de registro:', err);
            setError(err || 'Error al registrar. Intenta de nuevo.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="register-layout">
            <aside className="register-side-panel">
                <p className="register-kicker">Timely</p>
                <h1 className="register-side-title">Únete a Timely</h1>
                <p className="register-side-copy">
                    Crea tu cuenta y comienza a gestionar tu jornada laboral. Ficha entrada/salida, registra tareas y centraliza tu trabajo.
                </p>
            </aside>

            <section className="register-form-panel">
                <form className="register-card" onSubmit={handleSubmit}>
                    <h2 className="register-card-title">Crear cuenta</h2>
                    <p className="register-card-subtitle">Rellena los datos para registrarte</p>

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
                            onChange={handleChange}
                            placeholder="12345678A"
                            disabled={cargando}
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

                        <label htmlFor="contrasena" className="register-label">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            className="register-input"
                            value={datos.contrasena}
                            onChange={handleChange}
                            placeholder="Mínimo 8 caracteres"
                            required
                            disabled={cargando}
                        />

                        <label htmlFor="confirmarContrasena" className="register-label">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmarContrasena"
                            name="confirmarContrasena"
                            className="register-input"
                            value={datos.confirmarContrasena}
                            onChange={handleChange}
                            placeholder="Repite la contraseña"
                            required
                            disabled={cargando}
                        />

                        <label className="register-checkbox-label">
                            <input
                                type="checkbox"
                                className="register-checkbox"
                                checked={mostrarDatos}
                                onChange={(e) => setMostrarDatos(e.target.checked)}
                                disabled={cargando}
                            />
                            Añadir datos de empresa
                        </label>

                        {mostrarDatos && (
                            <div className="register-extra-fields">
                                <label htmlFor="fechaContratacion" className="register-label">Fecha de contratación</label>
                                <input
                                    type="date"
                                    id="fechaContratacion"
                                    name="fechaContratacion"
                                    className="register-input"
                                    value={datos.fechaContratacion}
                                    onChange={handleChange}
                                    disabled={cargando}
                                />

                                <label htmlFor="numeroSeguroSocial" className="register-label">Nº Seguridad Social</label>
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
                            </div>
                        )}
                        </div>
                    </div>

                    <button type="submit" className="register-submit" disabled={cargando}>
                        {cargando ? 'Registrando...' : 'Registrar'}
                    </button>

                    <a href="/" className="register-login-link">¿Ya tienes cuenta? Inicia sesión</a>
                </form>
            </section>
        </div>
    );
}

export default Register;