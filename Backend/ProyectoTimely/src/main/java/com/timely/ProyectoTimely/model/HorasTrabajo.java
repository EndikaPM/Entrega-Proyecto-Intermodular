package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;
import java.math.BigDecimal;


@Entity
@Table(name = "horas_trabajo")
public class HorasTrabajo {

    @Id
    @Column(name = "id_usuario", length = 9)
    private String idUsuario;


    @OneToOne
    @MapsId
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;


    @Column(name = "horas_contrato", precision = 10, scale = 1)
    private BigDecimal horasContrato;

    @Column(name = "horas_trabajadas", precision = 10, scale = 1)
    private BigDecimal horasTrabajadas;



    public HorasTrabajo() {
    }

    public HorasTrabajo(Usuario usuario, BigDecimal horasContrato) {
        this.usuario = usuario;
        this.idUsuario = usuario.getDni();
        this.horasContrato = horasContrato;
        this.horasTrabajadas = BigDecimal.ZERO;
    }



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
