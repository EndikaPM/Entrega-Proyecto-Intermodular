package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.Jornada;
import com.timely.ProyectoTimely.repository.JornadaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jornadas")
@CrossOrigin(origins = "*")
public class JornadaController {

    @Autowired
    private JornadaRepository jornadaRepository;

    // GET /api/jornadas → Todas las jornadas
    @GetMapping
    public List<Jornada> getAll() {
        return jornadaRepository.findAll();
    }

    // GET /api/jornadas/15 → Una jornada por ID
    @GetMapping("/{id}")
    public ResponseEntity<Jornada> getById(@PathVariable int id) {
        Optional<Jornada> jornada = jornadaRepository.findById(id);
        if (jornada.isPresent()) {
            return ResponseEntity.ok(jornada.get());
        }
        return ResponseEntity.notFound().build();
    }

    // GET /api/jornadas/usuario/52413669H → Jornadas de un usuario
    @GetMapping("/usuario/{dni}")
    public List<Jornada> getByUsuario(@PathVariable String dni) {
        return jornadaRepository.findByUsuarioDni(dni);
    }

    // POST /api/jornadas → Crear jornada
    @PostMapping
    public ResponseEntity<Jornada> create(@RequestBody Jornada jornada) {
        Jornada guardada = jornadaRepository.save(jornada);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }

    // PUT /api/jornadas/15 → Actualizar jornada
    @PutMapping("/{id}")
    public ResponseEntity<Jornada> update(@PathVariable int id,
                                          @RequestBody Jornada jornada) {
        if (!jornadaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        jornada.setId(id);
        Jornada actualizada = jornadaRepository.save(jornada);
        return ResponseEntity.ok(actualizada);
    }

    // DELETE /api/jornadas/15 → Eliminar jornada
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!jornadaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        jornadaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
