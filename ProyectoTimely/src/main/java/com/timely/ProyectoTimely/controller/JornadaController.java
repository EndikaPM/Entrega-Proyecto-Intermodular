package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.Jornada;
import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.JornadaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
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

    //Utilizamos el comodin para debolver distintos tipos de mensajes
    //Personalizar asi el mensaje al front-end, errores distintos o objetos complejos con metadatos
    @PostMapping("/fichar")
    public ResponseEntity<?> fichar(@RequestBody Map<String, String> body){
        String dniUsuario = body.get("dni");

        if(dniUsuario == null || dniUsuario.isEmpty()){
            return ResponseEntity.badRequest().body("El id no es valido");
        }

        try{
            LocalDate hoy = LocalDate.now();//Optenemos la fecha de hoy

            //Buscamos la jornada de hoy para eses usuario
            List<Jornada> jornadaHoy = jornadaRepository
                    .findByUsuarioDniAndFechaActual(dniUsuario, hoy);

            //Usamos una Stream para ver la ultima Jornada sin salida
            Optional<Jornada> jornadaSinSalida = jornadaHoy.stream()
                    .filter(j -> j.getHoraSalida() == null).findFirst();

            //Si hay una sin salida segistramos la salida
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

            //Si no hay jornada sin salida pues Registramos Entrada
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
