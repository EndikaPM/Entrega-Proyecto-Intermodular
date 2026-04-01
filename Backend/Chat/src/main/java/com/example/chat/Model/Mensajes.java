package com.example.chat.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table (name = "mensajes")
@Data
public class Mensajes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @Column (name = "usuario_dni", length = 9, nullable = false)
    private String usuarioDni;
    //El motor es "intelijente y si tienene el mismo nombre exacto los relaciona automaticamente
    //En los otros es camelCase a snake_case
    @Column (columnDefinition = "TEXT", nullable = false)
    private String contenido;
    @Column(name = "fecha_envio", nullable = false, updatable = false)
    private LocalDateTime fechaEnvio;

    // Este met odo se ejecuta AUTOMÁTICAMENTE justo antes de guardar en la BD
    @PrePersist
    protected void onCreate() {
        this.fechaEnvio = LocalDateTime.now();
    }

}
