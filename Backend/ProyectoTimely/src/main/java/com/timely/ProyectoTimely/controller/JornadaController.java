package com.timely.ProyectoTimely.controller;

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
@CrossOrigin(origins = "*")
public class JornadaController {

    @Autowired
    private JornadaRepository jornadaRepository;
    @Autowired
    private RegistroRepository registroRepository;

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
            return ResponseEntity.badRequest().body("El id no es valido");
        }

        try{
            LocalDate hoy = LocalDate.now();


            List<Jornada> jornadaHoy = jornadaRepository
                    .findByUsuarioDniAndFechaActual(dniUsuario, hoy);


            Optional<Jornada> jornadaSinSalida = jornadaHoy.stream()
                    .filter(j -> j.getHoraSalida() == null).findFirst();


            if (jornadaSinSalida.isPresent()){
                Jornada jornada = jornadaSinSalida.get();
                jornada.setHoraSalida(LocalTime.now());
                Jornada jornadaActualizada = jornadaRepository.save(jornada);

                return ResponseEntity.ok(Map.of(
                        "tipo", "SALIDA",
                        "jornada", jornadaActualizada,
                        "mensaje", "Salida registrada: " + jornadaActualizada.getHoraSalida()
                ));
            }


            Usuario dniUser = new Usuario();
            dniUser.setDni(dniUsuario);

            Jornada nuevaJornada = new Jornada(dniUser, hoy, LocalTime.now());
            Jornada guardar = jornadaRepository.save(nuevaJornada);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "tipo", "Entrada",
                    "jornada", guardar,
                    "mesaje", "Entrada registrada " + guardar.getHoraEntrada()
            ));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al fichar: " + e.getMessage()));
        }
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Jornada> update(@PathVariable int id,
                                          @RequestBody UpdateJornadaRegistro jornadaRegistro) {

        //Aqui primero buscamos la jornada tal cual esta en la DB
        Optional <Jornada> jornadaVieja = jornadaRepository.findById(id);
        if (jornadaVieja.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Jornada jornadaEnDB = jornadaVieja.get();

        Registro temporalRegistro = new Registro();
        temporalRegistro.setIdUsuarioModificador(jornadaRegistro.getJornada().getUsuario().getDni());
        temporalRegistro.setFechaModificada(LocalDateTime.now());
        temporalRegistro.setFechaAnterior(jornadaEnDB.getFechaActual());
        temporalRegistro.setHoraEntradaAnterior(jornadaEnDB.getHoraEntrada());
        temporalRegistro.setHoraSalidaAnterior(jornadaEnDB.getHoraSalida());
        temporalRegistro.setJornada(jornadaEnDB);
        temporalRegistro.setMotivo(jornadaRegistro.getMotivo());

        registroRepository.save(temporalRegistro);

        Jornada jornadaNueva = jornadaRegistro.getJornada();

        jornadaEnDB.setFechaActual(jornadaNueva.getFechaActual());
        jornadaEnDB.setHoraEntrada(jornadaNueva.getHoraEntrada());
        jornadaEnDB.setHoraSalida(jornadaNueva.getHoraSalida());
        jornadaEnDB.setModificado(true);

        Jornada actualizada = jornadaRepository.save(jornadaEnDB);

        return ResponseEntity.ok(actualizada);
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
