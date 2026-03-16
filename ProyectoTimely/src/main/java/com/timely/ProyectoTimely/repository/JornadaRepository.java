package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.Jornada;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

/**
 * Repository para la tabla "jornada".
 *
 * JpaRepository<Jornada, Integer>:
 *   - Jornada → la entidad
 *   - Integer → tipo de la PK (id es un int)
 */
public interface JornadaRepository extends JpaRepository<Jornada, Integer> {

    // Buscar jornadas de un usuario por su DNI
    // Spring genera: SELECT * FROM jornada WHERE id_trabajador = ?
    List<Jornada> findByUsuarioDni(String dni);

    // Buscar jornadas de un usuario en una fecha concreta
    // Spring genera: SELECT * FROM jornada WHERE id_trabajador = ? AND fecha_actual = ?
    List<Jornada> findByUsuarioDniAndFechaActual(String dni, LocalDate fecha);
}
