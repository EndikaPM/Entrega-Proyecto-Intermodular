package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;



public interface EmpresaRepository extends JpaRepository<Empresa, String> {
    // No voy a crear empresas desde la interfaz
}
