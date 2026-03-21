package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;


@Entity
@Table(name = "empresa")
public class Empresa {

    // @Id = Esta es la clave primaria
    // En tu BD, la PK de empresa es "nif" (un texto como "B12345678")
    // NO es auto-increment, por eso NO ponemos @GeneratedValue
    @Id
    @Column(name = "nif", length = 12)
    private String nif;

    // @Column(name = "nombre_empre") = en Java lo llamo "nombreEmpre"
    // pero en MySQL la columna se llama "nombre_empre"
    @Column(name = "nombre_empre", nullable = false, length = 80)
    private String nombreEmpre;

    @Column(name = "direccion", length = 200)
    private String direccion;

    // ==========================================
    // CONSTRUCTORES
    // ==========================================

    // Constructor vacío: OBLIGATORIO para JPA.
    // Spring necesita crear objetos vacíos y luego rellenarlos.
    public Empresa() {
    }

    public Empresa(String nif, String nombreEmpre, String direccion) {
        this.nif = nif;
        this.nombreEmpre = nombreEmpre;
        this.direccion = direccion;
    }

    // ==========================================
    // GETTERS Y SETTERS
    // Spring los usa para leer/escribir los datos de cada columna.
    // ==========================================

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
