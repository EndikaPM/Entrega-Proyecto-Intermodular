package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.Ausencia;
import com.timely.ProyectoTimely.model.AusenciaType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repository para la tabla "Ausencias".
 *
 * JpaRepository<Ausencia, Integer>:
 *   - Ausencia → la entidad
 *   - Integer  → tipo de la PK (id es un int)
 */
public interface AusenciaRepository extends JpaRepository<Ausencia, Integer> {

    // Buscar ausencias de un usuario por DNI
    // Spring genera: SELECT * FROM Ausencias WHERE id_trabajador = ?
    List<Ausencia> findByUsuarioDni(String dni);

    // Buscar ausencias por motivo
    // Spring genera: SELECT * FROM Ausencias WHERE motivo = ?
    List<Ausencia> findByMotivo(AusenciaType motivo);
}
