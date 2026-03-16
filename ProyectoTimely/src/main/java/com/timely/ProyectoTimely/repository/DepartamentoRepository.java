package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repository para la tabla "departamento".
 *
 * JpaRepository<Departamento, Integer>:
 *   - Departamento → la entidad
 *   - Integer      → tipo de la PK (id es un int)
 *
 * Método personalizado:
 *   findByEmpresaNif(String nif)
 *   → Spring genera: SELECT * FROM departamento WHERE id_empresa = ?
 *
 *   ¿Cómo sabe Spring hacer esto? Por el nombre del método:
 *   findBy + Empresa (la relación @ManyToOne) + Nif (el campo de Empresa)
 *   Spring "lee" el nombre y genera la consulta SQL automáticamente.
 *   Esto se llama "Query Methods" o "Derived Queries".
 */
public interface DepartamentoRepository extends JpaRepository<Departamento, Integer> {

    // Buscar departamentos de una empresa por su NIF
    // Spring genera: SELECT * FROM departamento d JOIN empresa e ON d.id_empresa = e.nif WHERE e.nif = ?
    List<Departamento> findByEmpresaNif(String nif);
}
