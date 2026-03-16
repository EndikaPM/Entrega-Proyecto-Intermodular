package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.HorasTrabajo;
import com.timely.ProyectoTimely.repository.HorasTrabajoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/horas-trabajo")
@CrossOrigin(origins = "*")
public class HorasTrabajoController {

    @Autowired
    private HorasTrabajoRepository horasTrabajoRepository;

    // GET /api/horas-trabajo → Todas las horas
    @GetMapping
    public List<HorasTrabajo> getAll() {
        return horasTrabajoRepository.findAll();
    }

    // GET /api/horas-trabajo/52413669H → Horas de un usuario por DNI
    @GetMapping("/{dni}")
    public ResponseEntity<HorasTrabajo> getByDni(@PathVariable String dni) {
        Optional<HorasTrabajo> horas = horasTrabajoRepository.findById(dni);
        if (horas.isPresent()) {
            return ResponseEntity.ok(horas.get());
        }
        return ResponseEntity.notFound().build();
    }

    // POST /api/horas-trabajo → Crear registro de horas
    @PostMapping
    public ResponseEntity<HorasTrabajo> create(@RequestBody HorasTrabajo horasTrabajo) {
        HorasTrabajo guardada = horasTrabajoRepository.save(horasTrabajo);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }

    // PUT /api/horas-trabajo/52413669H → Actualizar horas
    @PutMapping("/{dni}")
    public ResponseEntity<HorasTrabajo> update(@PathVariable String dni,
                                               @RequestBody HorasTrabajo horasTrabajo) {
        if (!horasTrabajoRepository.existsById(dni)) {
            return ResponseEntity.notFound().build();
        }
        horasTrabajo.setIdUsuario(dni);
        HorasTrabajo actualizada = horasTrabajoRepository.save(horasTrabajo);
        return ResponseEntity.ok(actualizada);
    }

    // DELETE /api/horas-trabajo/52413669H → Eliminar registro de horas
    @DeleteMapping("/{dni}")
    public ResponseEntity<Void> delete(@PathVariable String dni) {
        if (!horasTrabajoRepository.existsById(dni)) {
            return ResponseEntity.notFound().build();
        }
        horasTrabajoRepository.deleteById(dni);
        return ResponseEntity.noContent().build();
    }
}
