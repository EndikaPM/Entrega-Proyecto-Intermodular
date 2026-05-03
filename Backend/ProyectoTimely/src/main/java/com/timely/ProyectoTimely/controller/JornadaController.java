package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.Service.JornadaService;
import com.timely.ProyectoTimely.model.Dto.UpdateJornadaRegistro;
import com.timely.ProyectoTimely.model.Jornada;
import com.timely.ProyectoTimely.model.Registro;
import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.JornadaRepository;
import com.timely.ProyectoTimely.repository.RegistroRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/jornadas")
@CrossOrigin("*")
public class JornadaController {

    @Autowired
    private JornadaRepository jornadaRepository;
    @Autowired
    private JornadaService jornadaService;


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


    @GetMapping("/usuario/{dni}")
    public List<Jornada> getByUsuario(@PathVariable String dni) {
        return jornadaRepository.findByUsuarioDni(dni);
    }


    @PostMapping
    public ResponseEntity<Jornada> create(@RequestBody Jornada jornada) {
        Jornada guardada = jornadaRepository.save(jornada);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }


    @PostMapping("/fichar")
    public ResponseEntity<?> fichar(@RequestBody Map<String, String> body){
        String dniUsuario = body.get("dni");

        if(dniUsuario == null || dniUsuario.isEmpty()){
            return ResponseEntity.badRequest().body("El DNI es obligatorio");
        }

        try {
            Jornada resultado = jornadaService.registrarFichaje(dniUsuario);
            String tipo = (resultado.getHoraSalida() == null) ? "ENTRADA" : "SALIDA";

            return ResponseEntity.ok(Map.of(
                    "tipo", tipo,
                    "jornada", resultado,
                    "mensaje", tipo + " registrada a las " +
                            (tipo.equals("ENTRADA") ? resultado.getHoraEntrada() : resultado.getHoraSalida())
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Jornada> update(@PathVariable int id, @RequestBody UpdateJornadaRegistro jornadaRegistro) {

        try {
            Jornada actualizada = jornadaService.actualizarJornada(id, jornadaRegistro);
            return ResponseEntity.ok(actualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!jornadaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        jornadaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
