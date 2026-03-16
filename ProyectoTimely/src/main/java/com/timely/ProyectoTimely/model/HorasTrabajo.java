package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Mapea la tabla "horas_trabajo" de MySQL.
 *
 * Tu tabla en MySQL es:
 * CREATE TABLE horas_trabajo (
 *   id_usuario char(9) NOT NULL,              ← PK y FK a usuario.dni
 *   horas_contrato decimal(10,1),
 *   horas_trabajadas decimal(10,1)
 * )
 *
 * CASO ESPECIAL: Aquí la Primary Key es TAMBIÉN una Foreign Key.
 * Es decir, "id_usuario" es a la vez PK de esta tabla Y apunta a usuario.dni.
 *
 * En JPA esto se resuelve con @MapsId:
 * - @Id recae sobre el campo "idUsuario" (la PK)
 * - @OneToOne + @MapsId dice "esta relación USA la misma columna que la PK"
 *
 * BigDecimal → tipo Java para decimales exactos. Perfecto para DECIMAL de MySQL.
 *   (no usamos double porque double puede tener errores de redondeo: 0.1 + 0.2 ≠ 0.3)
 */
@Entity
@Table(name = "horas_trabajo")
public class HorasTrabajo {

    @Id
    @Column(name = "id_usuario", length = 9)
    private String idUsuario;

    // @OneToOne = Relación 1 a 1 con Usuario
    // @MapsId = "usa la misma columna que la @Id" (id_usuario = dni del usuario)
    // Esto significa: un registro de horas_trabajo POR cada usuario
    @OneToOne
    @MapsId
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    // BigDecimal para decimales exactos (DECIMAL en MySQL)
    @Column(name = "horas_contrato", precision = 10, scale = 1)
    private BigDecimal horasContrato;

    @Column(name = "horas_trabajadas", precision = 10, scale = 1)
    private BigDecimal horasTrabajadas;

    // ==========================================
    // CONSTRUCTORES
    // ==========================================

    public HorasTrabajo() {
    }

    public HorasTrabajo(Usuario usuario, BigDecimal horasContrato) {
        this.usuario = usuario;
        this.idUsuario = usuario.getDni();
        this.horasContrato = horasContrato;
        this.horasTrabajadas = BigDecimal.ZERO;
    }

    // ==========================================
    // GETTERS Y SETTERS
    // ==========================================

    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public BigDecimal getHorasContrato() {
        return horasContrato;
    }

    public void setHorasContrato(BigDecimal horasContrato) {
        this.horasContrato = horasContrato;
    }

    public BigDecimal getHorasTrabajadas() {
        return horasTrabajadas;
    }

    public void setHorasTrabajadas(BigDecimal horasTrabajadas) {
        this.horasTrabajadas = horasTrabajadas;
    }

    @Override
    public String toString() {
        return "HorasTrabajo{usuario='" + idUsuario +
               "', contrato=" + horasContrato +
               ", trabajadas=" + horasTrabajadas + "}";
    }
}
