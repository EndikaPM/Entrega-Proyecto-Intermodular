package com.timely.ProyectoTimely.repository;

import com.timely.ProyectoTimely.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * REPOSITORY = La capa que habla con la base de datos.
 *
 * En tu proyecto viejo tenías EmpresaRepositoryImpl.java con ~100 líneas:
 *   - Connection con = Connexion.conectar();
 *   - PreparedStatement ps = con.prepareStatement("SELECT * FROM empresa");
 *   - ResultSet rs = ps.executeQuery();
 *   - while(rs.next()) { ... }
 *
 * Con Spring Boot JPA, TODO ESO se reemplaza por esta interfaz VACÍA.
 *
 * ¿Cómo funciona?
 * JpaRepository<Empresa, String> significa:
 *   - Empresa → la entidad/tabla con la que trabajas
 *   - String  → el tipo de la Primary Key (nif es un String)
 *
 * Spring AUTOMÁTICAMENTE te genera estos métodos (sin que escribas nada):
 *   - findAll()           → SELECT * FROM empresa
 *   - findById("B123")   → SELECT * FROM empresa WHERE nif = 'B123'
 *   - save(empresa)       → INSERT o UPDATE automáticamente
 *   - deleteById("B123") → DELETE FROM empresa WHERE nif = 'B123'
 *   - count()             → SELECT COUNT(*) FROM empresa
 *   - existsById("B123") → ¿Existe en la BD?
 *
 * ¡0 líneas de SQL! Spring lo hace todo por ti.
 */
public interface EmpresaRepository extends JpaRepository<Empresa, String> {
    // No necesitas escribir nada aquí.
    // Spring ya te da findAll(), save(), deleteById(), etc.
    //
    // Si necesitas consultas personalizadas, puedes añadir métodos como:
    // List<Empresa> findByNombreEmpreContaining(String texto);
    // → Generaría: SELECT * FROM empresa WHERE nombre_empre LIKE '%texto%'
}
