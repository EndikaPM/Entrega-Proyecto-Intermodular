package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.HorasTrabajo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface HorasTrabajoRepository extends JpaRepository<HorasTrabajo, String> {
    // findAll(), findById(dni), save(), delete() ya vienen incluidos
}
