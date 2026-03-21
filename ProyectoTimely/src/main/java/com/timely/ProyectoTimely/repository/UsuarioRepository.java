package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    // Buscar usuario por email
    // Spring genera: SELECT * FROM usuario WHERE email = ?
    Optional<Usuario> findByEmail(String email);

    //Buscar por email y contraseña no se si es redundante
    // Spring no se si genera: SELECT * FROM usuario WHERE email = ? and password = ?
    Optional<Usuario> findByEmailAndPassword(String email, String password);

    //Buscamos al usuario por su dni
    Optional<Usuario> findByDni(String dni);

    // Buscar usuarios por tipo
    // Spring genera: SELECT * FROM usuario WHERE user_type = ?
    List<Usuario> findByUserType(com.timely.ProyectoTimely.model.UserType userType);

    // Buscar usuarios de un departamento
    // Spring genera: SELECT * FROM usuario WHERE department = ?
    List<Usuario> findByDepartamentoId(int departamentoId);
}
