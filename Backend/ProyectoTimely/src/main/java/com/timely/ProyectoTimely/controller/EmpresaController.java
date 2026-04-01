package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.Empresa;
import com.timely.ProyectoTimely.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "*")
public class EmpresaController {

    @Autowired
    private EmpresaRepository empresaRepository;


    @GetMapping
    public List<Empresa> getAll() {
        return empresaRepository.findAll();
    }


    @GetMapping("/{nif}")
    public ResponseEntity<Empresa> getByNif(@PathVariable String nif) {
        Optional<Empresa> empresa = empresaRepository.findById(nif);
        if (empresa.isPresent()) {
            return ResponseEntity.ok(empresa.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<Empresa> create(@RequestBody Empresa empresa) {
        Empresa guardada = empresaRepository.save(empresa);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }


    @PutMapping("/{nif}")
    public ResponseEntity<Empresa> update(@PathVariable String nif,
                                          @RequestBody Empresa empresa) {
        if (!empresaRepository.existsById(nif)) {
            return ResponseEntity.notFound().build();
        }
        empresa.setNif(nif);
        Empresa actualizada = empresaRepository.save(empresa);
        return ResponseEntity.ok(actualizada);
    }


    @DeleteMapping("/{nif}")
    public ResponseEntity<Void> delete(@PathVariable String nif) {
        if (!empresaRepository.existsById(nif)) {
            return ResponseEntity.notFound().build();
        }
        empresaRepository.deleteById(nif);
        return ResponseEntity.noContent().build();
    }
}
