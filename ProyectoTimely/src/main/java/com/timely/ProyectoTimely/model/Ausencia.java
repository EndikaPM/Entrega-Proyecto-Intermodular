package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * Mapea la tabla "Ausencias" de MySQL.
 *
 * IMPORTANTE: Fíjate que la tabla se llama "Ausencias" con mayúscula.
 * En MySQL esto importa dependiendo del SO (Linux distingue mayúsculas).
 *
 * Tu tabla en MySQL es:
 * CREATE TABLE Ausencias (
 *   id int NOT NULL AUTO_INCREMENT,
 *   id_trabajador char(9),                    ← FK a usuario.dni
 *   dia_inicio_ausencia date,
 *   dia_fin_ausencia date,
 *   motivo enum('VACACIONES','DESCANSO','CITA_MEDICA','OTRAS')
 * )
 */
@Entity
@Table(name = "Ausencias")  // ← Con mayúscula, tal como está en tu BD
public class Ausencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    // FK a usuario
    @ManyToOne
    @JoinColumn(name = "id_trabajador", nullable = false)
    private Usuario usuario;

    @Column(name = "dia_inicio_ausencia", nullable = false)
    private LocalDate diaInicioAusencia;

    @Column(name = "dia_fin_ausencia", nullable = false)
    private LocalDate diaFinAusencia;

    // El motivo es un enum → @Enumerated(EnumType.STRING)
    @Enumerated(EnumType.STRING)
    @Column(name = "motivo", nullable = false)
    private AusenciaType motivo;

    // ==========================================
    // CONSTRUCTORES
    // ==========================================

    public Ausencia() {
    }

    public Ausencia(Usuario usuario, LocalDate diaInicioAusencia,
                    LocalDate diaFinAusencia, AusenciaType motivo) {
        this.usuario = usuario;
        this.diaInicioAusencia = diaInicioAusencia;
        this.diaFinAusencia = diaFinAusencia;
        this.motivo = motivo;
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

    public LocalDate getDiaInicioAusencia() {
        return diaInicioAusencia;
    }

    public void setDiaInicioAusencia(LocalDate diaInicioAusencia) {
        this.diaInicioAusencia = diaInicioAusencia;
    }

    public LocalDate getDiaFinAusencia() {
        return diaFinAusencia;
    }

    public void setDiaFinAusencia(LocalDate diaFinAusencia) {
        this.diaFinAusencia = diaFinAusencia;
    }

    public AusenciaType getMotivo() {
        return motivo;
    }

    public void setMotivo(AusenciaType motivo) {
        this.motivo = motivo;
    }

    @Override
    public String toString() {
        return "Ausencia{id=" + id + ", motivo=" + motivo +
               ", desde=" + diaInicioAusencia + ", hasta=" + diaFinAusencia + "}";
    }
}
