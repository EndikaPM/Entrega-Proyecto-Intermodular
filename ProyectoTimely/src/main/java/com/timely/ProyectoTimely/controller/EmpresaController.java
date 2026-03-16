package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.Empresa;
import com.timely.ProyectoTimely.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @RestController → Le dice a Spring: "esta clase maneja peticiones HTTP y devuelve JSON"
 *                    Es la combinación de @Controller + @ResponseBody
 *
 * @RequestMapping("/api/empresas") → TODAS las URLs de este controller empiezan por /api/empresas
 *                                     Ejemplo: http://localhost:8080/api/empresas
 *
 * @CrossOrigin → Permite que React (que corre en otro puerto) pueda llamar a esta API
 *                 Sin esto, el navegador bloquea las peticiones (política CORS)
 *
 * @Autowired → Spring INYECTA automáticamente el repository.
 *              Tú no haces "new EmpresaRepository()", Spring lo crea y te lo da.
 *              Esto se llama "Inyección de Dependencias".
 */
@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "*")  // Permite peticiones desde cualquier origen (para desarrollo)
public class EmpresaController {

    @Autowired
    private EmpresaRepository empresaRepository;

    // =====================================================
    // GET /api/empresas → Devuelve TODAS las empresas
    // Equivale a: SELECT * FROM empresa
    // =====================================================
    @GetMapping
    public List<Empresa> getAll() {
        return empresaRepository.findAll();
    }

    // =====================================================
    // GET /api/empresas/B12345678 → Devuelve UNA empresa por su NIF
    // Equivale a: SELECT * FROM empresa WHERE nif = 'B12345678'
    //
    // @PathVariable = coge el valor de la URL.
    //   Si llamas a /api/empresas/B12345678, entonces nif = "B12345678"
    // =====================================================
    @GetMapping("/{nif}")
    public ResponseEntity<Empresa> getByNif(@PathVariable String nif) {
        Optional<Empresa> empresa = empresaRepository.findById(nif);
        if (empresa.isPresent()) {
            return ResponseEntity.ok(empresa.get());          // 200 OK + empresa en JSON
        } else {
            return ResponseEntity.notFound().build();         // 404 Not Found
        }
    }

    // =====================================================
    // POST /api/empresas → CREA una nueva empresa
    // Equivale a: INSERT INTO empresa (nif, nombre_empre, direccion) VALUES (...)
    //
    // @RequestBody = Lee el JSON que envías y lo convierte a objeto Empresa
    //   Si envías: {"nif": "A111", "nombreEmpre": "Test", "direccion": "Calle 1"}
    //   Spring crea: new Empresa("A111", "Test", "Calle 1") automáticamente
    // =====================================================
    @PostMapping
    public ResponseEntity<Empresa> create(@RequestBody Empresa empresa) {
        Empresa guardada = empresaRepository.save(empresa);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);  // 201 Created
    }

    // =====================================================
    // PUT /api/empresas/B12345678 → ACTUALIZA una empresa existente
    // Equivale a: UPDATE empresa SET ... WHERE nif = 'B12345678'
    // =====================================================
    @PutMapping("/{nif}")
    public ResponseEntity<Empresa> update(@PathVariable String nif,
                                          @RequestBody Empresa empresa) {
        if (!empresaRepository.existsById(nif)) {
            return ResponseEntity.notFound().build();         // 404 si no existe
        }
        empresa.setNif(nif);
        Empresa actualizada = empresaRepository.save(empresa);
        return ResponseEntity.ok(actualizada);                // 200 OK + empresa actualizada
    }

    // =====================================================
    // DELETE /api/empresas/B12345678 → ELIMINA una empresa
    // Equivale a: DELETE FROM empresa WHERE nif = 'B12345678'
    // =====================================================
    @DeleteMapping("/{nif}")
    public ResponseEntity<Void> delete(@PathVariable String nif) {
        if (!empresaRepository.existsById(nif)) {
            return ResponseEntity.notFound().build();
        }
        empresaRepository.deleteById(nif);
        return ResponseEntity.noContent().build();            // 204 No Content = borrado OK
    }
}
