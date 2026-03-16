package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.Departamento;
import com.timely.ProyectoTimely.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/departamentos")
@CrossOrigin(origins = "*")
public class DepartamentoController {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    // GET /api/departamentos → Todos los departamentos
    @GetMapping
    public List<Departamento> getAll() {
        return departamentoRepository.findAll();
    }

    // GET /api/departamentos/10 → Un departamento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Departamento> getById(@PathVariable int id) {
        Optional<Departamento> depar = departamentoRepository.findById(id);
        if (depar.isPresent()) {
            return ResponseEntity.ok(depar.get());
        }
        return ResponseEntity.notFound().build();
    }

    // GET /api/departamentos/empresa/B12345678 → Departamentos de una empresa
    @GetMapping("/empresa/{nif}")
    public List<Departamento> getByEmpresa(@PathVariable String nif) {
        return departamentoRepository.findByEmpresaNif(nif);
    }

    // POST /api/departamentos → Crear departamento
    @PostMapping
    public ResponseEntity<Departamento> create(@RequestBody Departamento departamento) {
        Departamento guardado = departamentoRepository.save(departamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    // PUT /api/departamentos/10 → Actualizar departamento
    @PutMapping("/{id}")
    public ResponseEntity<Departamento> update(@PathVariable int id,
                                               @RequestBody Departamento departamento) {
        if (!departamentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        departamento.setId(id);
        Departamento actualizado = departamentoRepository.save(departamento);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE /api/departamentos/10 → Eliminar departamento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!departamentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        departamentoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
