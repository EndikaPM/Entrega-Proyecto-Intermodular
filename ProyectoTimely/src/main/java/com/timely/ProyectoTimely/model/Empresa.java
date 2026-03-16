package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;

/**
 * ENTITY = Una clase Java que representa UNA TABLA de tu base de datos.
 *
 * Esta clase mapea la tabla "empresa" de MySQL.
 *
 * ¿Qué hace cada anotación?
 *
 * @Entity       → Le dice a Spring: "esta clase es una tabla de la BD"
 * @Table        → Indica el nombre EXACTO de la tabla en MySQL
 * @Id           → Esta columna es la PRIMARY KEY
 * @Column       → Mapea un atributo Java a una columna de la tabla
 *                  name = "nombre en MySQL" (si el nombre Java es diferente)
 *
 * REGLA DE ORO: Los nombres en @Column(name="...") y @Table(name="...")
 * deben ser EXACTAMENTE iguales que en tu base de datos (Timely.sql)
 *
 * Tu tabla en MySQL es:
 * CREATE TABLE empresa (
 *   nif char(12) NOT NULL,          ← PRIMARY KEY (texto, no auto-increment)
 *   nombre_empre varchar(80),
 *   direccion varchar(200)
 * )
 */
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
