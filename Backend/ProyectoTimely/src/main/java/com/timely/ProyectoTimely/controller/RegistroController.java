package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.Jornada;
import com.timely.ProyectoTimely.model.Registro;
import com.timely.ProyectoTimely.repository.RegistroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/registros") // Añadimos ruta base ¿¿¿¿Tiene sentido????
@CrossOrigin(origins = "*")
public class RegistroController {

    @Autowired
    private RegistroRepository registroRepository;

    @PostMapping
    public ResponseEntity<Registro> crearRegistro(@RequestBody Registro registro) {
        // Establecemos la fecha de la modificación como "ahora" automáticamente
        registro.setFechaModificada(LocalDateTime.now());
        Registro guardado = registroRepository.save(registro);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    @GetMapping("/jornada/{idJornada}")
    public List<Registro> obtenerPorJornada(@PathVariable int idJornada) {
        Jornada j = new Jornada();
        j.setId(idJornada);
        return registroRepository.findByJornada(j);
    }
}
