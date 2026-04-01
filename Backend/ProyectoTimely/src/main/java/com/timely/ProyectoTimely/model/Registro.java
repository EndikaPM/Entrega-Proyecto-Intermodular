package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "registro")
public class Registro {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "id_usuario_modificador", nullable = false, length = 9)
    private String idUsuarioModificador;

    @Column(name = "fecha_modificacion", nullable = false)
    private LocalDateTime fechaModificada;

    @Column(name = "fecha_anterior")
    private LocalDate fechaAnterior;

    @Column(name = "hora_entrada_anterior")
    private LocalTime horaEntradaAnterior;

    @Column(name = "hora_salida_anterior")
    private LocalTime horaSalidaAnterior;

    @ManyToOne
    @JoinColumn(name = "id_jornada_modificada")
    private Jornada jornada;

    @Column(name= "motivo", nullable = false, length = 250)
    private String motivo;

    public Registro() {}
    public Registro(int id, String idUsuarioModificador, Jornada jornada, LocalDateTime fechaModificada,
                    LocalDate fechaAnterior,LocalTime horaEntradaAnterior,LocalTime horaSalidaEntarior, String motivo) {
        this.id = id;
        this.idUsuarioModificador = idUsuarioModificador;
        this.jornada = jornada;
        this.fechaModificada = fechaModificada;
        this.fechaAnterior = fechaAnterior;
        this.horaEntradaAnterior = horaEntradaAnterior;
        this.horaSalidaAnterior = horaSalidaEntarior;
        this.motivo = motivo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIdUsuarioModificador() {
        return idUsuarioModificador;
    }

    public void setIdUsuarioModificador(String idUsuarioModificador) {
        this.idUsuarioModificador = idUsuarioModificador;
    }

    public LocalDateTime getFechaModificada() {
        return fechaModificada;
    }

    public void setFechaModificada(LocalDateTime fechaModificada) {
        this.fechaModificada = fechaModificada;
    }

    public void setJornada(Jornada jornada) {
        this.jornada = jornada;
    }

    public LocalDate getFechaAnterior() {
        return fechaAnterior;
    }

    public void setFechaAnterior(LocalDate fechaAnterior) {
        this.fechaAnterior = fechaAnterior;
    }

    public LocalTime getHoraEntradaAnterior() {
        return horaEntradaAnterior;
    }

    public void setHoraEntradaAnterior(LocalTime horaEntradaAnterior) {
        this.horaEntradaAnterior = horaEntradaAnterior;
    }

    public LocalTime getHoraSalidaAnterior() {
        return horaSalidaAnterior;
    }

    public void setHoraSalidaAnterior(LocalTime horaSalidaAnterior) {
        this.horaSalidaAnterior = horaSalidaAnterior;
    }

    public Jornada getJornada() {
        return jornada;
    }


    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}
