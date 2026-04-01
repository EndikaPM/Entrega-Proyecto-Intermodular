package com.example.chat.Controller;

import com.example.chat.Model.Mensajes;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.chat.Repository.MensajeRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@Controller
public class ChatController {

    @Autowired
    private MensajeRepository mensajeRepository;

    //Esto es el chat en tiempo real
    @MessageMapping("/enviar-mensaje")
    @SendTo("/topic/mensajes")//esto reenvia a todos el mensaje
    public Mensajes gestionMensajes(Mensajes mensajes){
        //Guardamos el mensaje en la DB
        return mensajeRepository.save(mensajes);
    }
}
