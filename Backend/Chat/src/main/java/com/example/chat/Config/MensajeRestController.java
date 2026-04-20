package com.example.chat.Config;

import com.example.chat.Model.Mensajes;
import com.example.chat.Repository.MensajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mensajes")
@CrossOrigin("*")
public class MensajeRestController {

    @Autowired
    private MensajeRepository mensajeRepository;

    @GetMapping
    public List<Mensajes> obtenerHistorialMensajes(){
        return mensajeRepository.findAllByOrderByFechaEnvioAsc();
    }
}
