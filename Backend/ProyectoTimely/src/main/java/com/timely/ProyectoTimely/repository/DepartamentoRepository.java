package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface DepartamentoRepository extends JpaRepository<Departamento, Integer> {

    // Buscar departamentos de una empresa por su NIF
    // Spring genera: SELECT * FROM departamento d JOIN empresa e ON d.id_empresa = e.nif WHERE e.nif = ?
    List<Departamento> findByEmpresaNif(String nif);
}
