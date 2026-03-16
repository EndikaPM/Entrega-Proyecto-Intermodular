package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;
/**
 * Repository para la tabla "usuario".
 *
 * JpaRepository<Usuario, String>:
 *   - Usuario → la entidad
 *   - String  → tipo de la PK (dni es un String)
 *
 * CORRECCIÓN:
 * - Eliminado el método findByEmail(email, password) duplicado
 * - Spring Data NO soporta múltiples parámetros así en el nombre del método
 * - Para buscar por email+password, usa findByEmailAndPassword (ver abajo)
 *
 * NOTA DE SEGURIDAD:
 * - NO uses findByEmailAndPassword en producción
 * - Las contraseñas deben estar encriptadas (BCrypt)
 * - Solo busca por email, luego verifica la contraseña en el Service
 */
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    // Buscar usuario por email
    // Spring genera: SELECT * FROM usuario WHERE email = ?
    Optional<Usuario> findByEmail(String email);
    //Buscar por email y contraseña no se si es redundante
    // Spring no se si genera: SELECT * FROM usuario WHERE email = ? and password = ?
    Optional<Usuario> findByEmailAndPassword(String email, String password);
    // Buscar usuarios por tipo
    // Spring genera: SELECT * FROM usuario WHERE user_type = ?
    List<Usuario> findByUserType(com.timely.ProyectoTimely.model.UserType userType);

    // Buscar usuarios de un departamento
    // Spring genera: SELECT * FROM usuario WHERE department = ?
    List<Usuario> findByDepartamentoId(int departamentoId);
}
