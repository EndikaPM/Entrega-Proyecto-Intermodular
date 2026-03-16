package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.Ausencia;
import com.timely.ProyectoTimely.repository.AusenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ausencias")
@CrossOrigin(origins = "*")
public class AusenciaController {

    @Autowired
    private AusenciaRepository ausenciaRepository;

    // GET /api/ausencias → Todas las ausencias
    @GetMapping
    public List<Ausencia> getAll() {
        return ausenciaRepository.findAll();
    }

    // GET /api/ausencias/1 → Una ausencia por ID
    @GetMapping("/{id}")
    public ResponseEntity<Ausencia> getById(@PathVariable int id) {
        Optional<Ausencia> ausencia = ausenciaRepository.findById(id);
        if (ausencia.isPresent()) {
            return ResponseEntity.ok(ausencia.get());
        }
        return ResponseEntity.notFound().build();
    }

    // GET /api/ausencias/usuario/52413669H → Ausencias de un usuario
    @GetMapping("/usuario/{dni}")
    public List<Ausencia> getByUsuario(@PathVariable String dni) {
        return ausenciaRepository.findByUsuarioDni(dni);
    }

    // POST /api/ausencias → Crear ausencia
    @PostMapping
    public ResponseEntity<Ausencia> create(@RequestBody Ausencia ausencia) {
        Ausencia guardada = ausenciaRepository.save(ausencia);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }

    // PUT /api/ausencias/1 → Actualizar ausencia
    @PutMapping("/{id}")
    public ResponseEntity<Ausencia> update(@PathVariable int id,
                                           @RequestBody Ausencia ausencia) {
        if (!ausenciaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        ausencia.setId(id);
        Ausencia actualizada = ausenciaRepository.save(ausencia);
        return ResponseEntity.ok(actualizada);
    }

    // DELETE /api/ausencias/1 → Eliminar ausencia
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!ausenciaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        ausenciaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
