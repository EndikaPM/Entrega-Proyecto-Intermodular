package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;


@Entity
@Table(name = "empresa")
public class Empresa {


    @Id
    @Column(name = "nif", length = 12)
    private String nif;


    @Column(name = "nombre_empre", nullable = false, length = 80)
    private String nombreEmpre;

    @Column(name = "direccion", length = 200)
    private String direccion;


    public Empresa() {
    }

    public Empresa(String nif, String nombreEmpre, String direccion) {
        this.nif = nif;
        this.nombreEmpre = nombreEmpre;
        this.direccion = direccion;
    }



    public String getNif() {
        return nif;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    public String getNombreEmpre() {
        return nombreEmpre;
    }

    public void setNombreEmpre(String nombreEmpre) {
        this.nombreEmpre = nombreEmpre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @Override
    public String toString() {
        return "Empresa{nif='" + nif + "', nombre='" + nombreEmpre + "'}";
    }
}
