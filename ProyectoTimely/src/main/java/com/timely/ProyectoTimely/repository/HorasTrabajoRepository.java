package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.HorasTrabajo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository para la tabla "horas_trabajo".
 *
 * JpaRepository<HorasTrabajo, String>:
 *   - HorasTrabajo → la entidad
 *   - String       → tipo de la PK (id_usuario es un String/char)
 */
public interface HorasTrabajoRepository extends JpaRepository<HorasTrabajo, String> {
    // findAll(), findById(dni), save(), delete() ya vienen incluidos
}
