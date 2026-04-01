package com.timely.ProyectoTimely.model.Dto;

import com.timely.ProyectoTimely.model.Jornada;

public class UpdateJornadaRegistro {
    private Jornada jornada;
    private String motivo;

    public UpdateJornadaRegistro() {}

    public UpdateJornadaRegistro(Jornada jornada, String motivo) {
        this.jornada = jornada;
        this.motivo = motivo;
    }

    public Jornada getJornada() {
        return jornada;
    }

    public void setJorbada(Jornada joranda) {
        this.jornada = joranda;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}
