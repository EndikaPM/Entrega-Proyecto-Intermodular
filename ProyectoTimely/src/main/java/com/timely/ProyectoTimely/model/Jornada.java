package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Mapea la tabla "jornada" de MySQL.
 *
 * Tu tabla en MySQL es:
 * CREATE TABLE jornada (
 *   id int UNSIGNED NOT NULL AUTO_INCREMENT,
 *   id_trabajador char(9) NOT NULL,           ← FK a usuario.dni
 *   fecha_actual date,
 *   hora_entrada time,
 *   hora_salida time,
 *   modificado tinyint(1)                     ← booleano (0 o 1)
 * )
 *
 * NUEVOS CONCEPTOS:
 * - LocalTime → tipo Java para horas (sin fecha). Perfecto para TIME de MySQL.
 * - tinyint(1) en MySQL = boolean en Java (0=false, 1=true)
 */
@Entity
@Table(name = "jornada")
public class Jornada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    // FK a la tabla usuario. Muchas jornadas → Un usuario.
    @ManyToOne
    @JoinColumn(name = "id_trabajador", nullable = false)
    private Usuario usuario;

    // LocalDate = solo fecha (2025-10-20), sin hora
    @Column(name = "fecha_actual", nullable = false)
    private LocalDate fechaActual;

    // LocalTime = solo hora (07:00:00), sin fecha
    @Column(name = "hora_entrada")
    private LocalTime horaEntrada;

    @Column(name = "hora_salida")
    private LocalTime horaSalida;

    // tinyint(1) en MySQL → boolean en Java
    // MySQL guarda 0 o 1, Java lo interpreta como false o true
    @Column(name = "modificado", nullable = false)
    private boolean modificado;

    // ==========================================
    // CONSTRUCTORES
    // ==========================================

    public Jornada() {
    }

    public Jornada(Usuario usuario, LocalDate fechaActual, LocalTime horaEntrada) {
        this.usuario = usuario;
        this.fechaActual = fechaActual;
        this.horaEntrada = horaEntrada;
        this.modificado = false;
    }

    // ==========================================
    // GETTERS Y SETTERS
    // ==========================================

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LocalDate getFechaActual() {
        return fechaActual;
    }

    public void setFechaActual(LocalDate fechaActual) {
        this.fechaActual = fechaActual;
    }

    public LocalTime getHoraEntrada() {
        return horaEntrada;
    }

    public void setHoraEntrada(LocalTime horaEntrada) {
        this.horaEntrada = horaEntrada;
    }

    public LocalTime getHoraSalida() {
        return horaSalida;
    }

    public void setHoraSalida(LocalTime horaSalida) {
        this.horaSalida = horaSalida;
    }

    public boolean isModificado() {
        return modificado;
    }

    public void setModificado(boolean modificado) {
        this.modificado = modificado;
    }

    @Override
    public String toString() {
        return "Jornada{id=" + id + ", fecha=" + fechaActual +
               ", entrada=" + horaEntrada + ", salida=" + horaSalida + "}";
    }
}
