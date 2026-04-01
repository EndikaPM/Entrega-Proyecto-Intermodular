package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.Jornada;
import com.timely.ProyectoTimely.model.Registro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RegistroRepository extends JpaRepository<Registro, Integer> {
    //findAll(), findById(dni), save(), delete() ya vienen incluidos

    List<Registro> findByJornada(Jornada idJornadaModificada);
}
