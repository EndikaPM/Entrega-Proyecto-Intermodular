package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;


@Entity
@Table(name = "departamento")
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "nombre_depar", nullable = false, length = 80)
    private String nombreDepar;

    // @ManyToOne = Muchos departamentos → Una empresa
    // @JoinColumn = La columna "id_empresa" en la tabla departamento
    //               apunta a la PK de la tabla empresa (nif)
    @ManyToOne
    @JoinColumn(name = "id_empresa", nullable = false)
    private Empresa empresa;

    // ==========================================
    // CONSTRUCTORES
    // ==========================================

    public Departamento() {
    }

    public Departamento(String nombreDepar, Empresa empresa) {
        this.nombreDepar = nombreDepar;
        this.empresa = empresa;
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

    public String getNombreDepar() {
        return nombreDepar;
    }

    public void setNombreDepar(String nombreDepar) {
        this.nombreDepar = nombreDepar;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    @Override
    public String toString() {
        return "Departamento{id=" + id + ", nombre='" + nombreDepar + "'}";
    }
}
