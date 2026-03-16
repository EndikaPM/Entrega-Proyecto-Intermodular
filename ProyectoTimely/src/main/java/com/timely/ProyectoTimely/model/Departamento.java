package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;

/**
 * Mapea la tabla "departamento" de MySQL.
 *
 * Tu tabla en MySQL es:
 * CREATE TABLE departamento (
 *   id int UNSIGNED NOT NULL AUTO_INCREMENT,  ← PK numérica
 *   nombre_depar varchar(80),
 *   id_empresa char(12)                       ← FK a empresa.nif
 * )
 *
 * NUEVA ANOTACIÓN:
 * @ManyToOne → Indica una relación "Muchos a Uno".
 *   Significa: "muchos departamentos pertenecen a UNA empresa"
 *   En la BD esto es la FOREIGN KEY (id_empresa) REFERENCES empresa(nif)
 *
 * @JoinColumn(name = "id_empresa") → Le dice a JPA que la columna de la FK
 *   en la tabla "departamento" se llama "id_empresa"
 *
 * @GeneratedValue(strategy = GenerationType.IDENTITY) → El ID lo genera MySQL
 *   automáticamente con AUTO_INCREMENT (tú no lo pones, MySQL lo crea solo)
 */
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
