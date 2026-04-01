package com.example.chat.Repository;

import com.example.chat.Model.Mensajes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MensajeRepository extends JpaRepository<Mensajes, Long> {
    //No se si poner un filtro para buscar por dni????
    List<Mensajes> findByUsuarioDni(String usuarioDni);
    //añadir un orden a los mensajes para mi front
    List<Mensajes> findAllByOrderByFechaEnvioAsc();
}
