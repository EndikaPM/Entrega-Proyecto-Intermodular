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
@RequestMapping("/api/v1/departamentos")
@CrossOrigin("*")
public class DepartamentoController {

    @Autowired
    private DepartamentoRepository departamentoRepository;


    @GetMapping
    public List<Departamento> getAll() {
        return departamentoRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Departamento> getById(@PathVariable int id) {
        Optional<Departamento> depar = departamentoRepository.findById(id);
        if (depar.isPresent()) {
            return ResponseEntity.ok(depar.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/empresa/{nif}")
    public List<Departamento> getByEmpresa(@PathVariable String nif) {
        return departamentoRepository.findByEmpresaNif(nif);
    }


    @PostMapping
    public ResponseEntity<Departamento> create(@RequestBody Departamento departamento) {
        Departamento guardado = departamentoRepository.save(departamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }


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


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!departamentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        departamentoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
