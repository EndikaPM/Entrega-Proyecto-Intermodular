package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.Ausencia;
import com.timely.ProyectoTimely.model.AusenciaType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface AusenciaRepository extends JpaRepository<Ausencia, Integer> {


    List<Ausencia> findByUsuarioDni(String dni);


    List<Ausencia> findByMotivo(AusenciaType motivo);
}
