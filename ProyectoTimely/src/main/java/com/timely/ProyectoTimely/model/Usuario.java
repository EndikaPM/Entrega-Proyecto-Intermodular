package com.timely.ProyectoTimely.model;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * Mapea la tabla "usuario" de MySQL.
 *
 * Tu tabla en MySQL es:
 * CREATE TABLE usuario (
 *   dni char(9) NOT NULL,                     ← PK (texto)
 *   firstName varchar(50),
 *   lastName varchar(150),
 *   email varchar(250),
 *   password varchar(50),
 *   birthday date,
 *   contract_date date,
 *   social_security char(12),
 *   user_type enum('Administrador','Empleado','Jefe'),
 *   department int UNSIGNED                    ← FK a departamento.id
 * )
 *
 * NUEVA ANOTACIÓN:
 * @Enumerated(EnumType.STRING) → Le dice a JPA cómo guardar el enum en MySQL:
 *   - EnumType.STRING  = guarda el TEXTO ("Administrador", "Empleado", "Jefe")
 *   - EnumType.ORDINAL = guardaría el NÚMERO (0, 1, 2) — NO queremos esto
 *   Usamos STRING porque en tu BD el enum es texto.
 */
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @Column(name = "dni", length = 9)
    private String dni;

    // name = "first_name" → coincide con la columna en MySQL
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 150)
    private String lastName;

    @Column(name = "email", nullable = false, length = 250)
    private String email;

    @Column(name = "password", nullable = false, length = 50)
    private String password;

    // LocalDate → tipo Java para fechas (sin hora). Perfecto para DATE de MySQL.
    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;

    @Column(name = "contract_date", nullable = false)
    private LocalDate contractDate;

    @Column(name = "social_security", nullable = false, length = 12)
    private String socialSecurity;

    // @Enumerated(EnumType.STRING) → Guarda "Administrador"/"Empleado"/"Jefe" como texto
    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false)
    private UserType userType;

    // @ManyToOne = Muchos usuarios → Un departamento
    // La FK en MySQL es: department int → apunta a departamento.id
    @ManyToOne
    @JoinColumn(name = "department", nullable = false)
    private Departamento departamento;

    // ==========================================
    // CONSTRUCTORES
    // ==========================================

    public Usuario() {
    }

    public Usuario(String dni, String firstName, String lastName, String email,
                   String password, LocalDate birthday, LocalDate contractDate,
                   String socialSecurity, UserType userType, Departamento departamento) {
        this.dni = dni;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.contractDate = contractDate;
        this.socialSecurity = socialSecurity;
        this.userType = userType;
        this.departamento = departamento;
    }

    // ==========================================
    // GETTERS Y SETTERS
    // ==========================================

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public LocalDate getContractDate() {
        return contractDate;
    }

    public void setContractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
    }

    public String getSocialSecurity() {
        return socialSecurity;
    }

    public void setSocialSecurity(String socialSecurity) {
        this.socialSecurity = socialSecurity;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    @Override
    public String toString() {
        return "Usuario{dni='" + dni + "', nombre='" + firstName + " " + lastName + "'}";
    }
}
