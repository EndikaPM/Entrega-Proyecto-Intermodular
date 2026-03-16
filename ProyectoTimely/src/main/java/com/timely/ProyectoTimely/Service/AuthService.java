package com.timely.ProyectoTimely.Service;

import com.timely.ProyectoTimely.model.Dto.LoginRequisitoDto;
import com.timely.ProyectoTimely.model.Dto.LoginRespuestaDto;
import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Servicio de Autenticación.
 *
 * CAPA SERVICE (Lógica de Negocio):
 * - Aquí va TODA la lógica de autenticación
 * - El Controller solo recibe/envía datos
 * - El Repository solo accede a la BD
 *
 * Responsabilidades:
 * 1. Validar credenciales (email + password)
 * 2. Buscar usuario en la BD
 * 3. Verificar contraseña
 * 4. Devolver datos del usuario (sin la contraseña)
 *
 * IMPORTANTE - SEGURIDAD:
 * - En producción, las contraseñas deben estar ENCRIPTADAS (BCrypt)
 * - Por ahora validamos en texto plano para simplicidad
 * - NUNCA devolver la contraseña al frontend
 */

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Autentica un usuario con email y contraseña.
     *
     * @param loginRequest Credenciales (email + password)
     * @return LoginResponse con datos del usuario (sin password)
     * @throws IllegalArgumentException si las credenciales son inválidas
     */

    public LoginRespuestaDto autenticar(LoginRequisitoDto loginRequest){
        // 1. Validar que no vengan campos vacíos
        if (loginRequest.getEmail() == null || loginRequest.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("El email es obligatorio");
        }

        if (loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("La contraseña es obligatoria");
        }

        // 2. Buscar usuario por email
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginRequest.getEmail());

        // Si no existe el usuario
        if (!usuarioOpt.isPresent()) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        Usuario usuario = usuarioOpt.get();

        // 3. Verificar contraseña
        if (!usuario.getPassword().equals(loginRequest.getPassword())) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        // 4. Crear respuesta (sin la contraseña)
        LoginRespuestaDto response = new LoginRespuestaDto();
        response.setDni(usuario.getDni());
        response.setFirstName(usuario.getFirstName());
        response.setLastName(usuario.getLastName());
        response.setEmail(usuario.getEmail());
        response.setUserType(usuario.getUserType());
        response.setDepartmentId(usuario.getDepartamento().getId());

        return response;
    }

    /**
     * Método auxiliar para verificar si un usuario existe por email.
     * Útil para registros o validaciones.
     */
    public boolean existeUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }

}
