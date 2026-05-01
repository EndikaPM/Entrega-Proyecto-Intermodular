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
@RequestMapping("/api/v1/ausencias")
public class AusenciaController {

    @Autowired
    private AusenciaRepository ausenciaRepository;


    @GetMapping
    public List<Ausencia> getAll() {
        return ausenciaRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Ausencia> getById(@PathVariable int id) {
        Optional<Ausencia> ausencia = ausenciaRepository.findById(id);
        if (ausencia.isPresent()) {
            return ResponseEntity.ok(ausencia.get());
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/usuario/{dni}")
    public List<Ausencia> getByUsuario(@PathVariable String dni) {
        return ausenciaRepository.findByUsuarioDni(dni);
    }


    @PostMapping
    public ResponseEntity<Ausencia> create(@RequestBody Ausencia ausencia) {
        Ausencia guardada = ausenciaRepository.save(ausencia);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }

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


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!ausenciaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        ausenciaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
