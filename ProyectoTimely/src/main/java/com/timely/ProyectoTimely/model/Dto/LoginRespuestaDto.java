package com.timely.ProyectoTimely.model.Dto;

import com.timely.ProyectoTimely.model.UserType;

import java.time.LocalDate;

public class LoginRespuestaDto {

    private String dni;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthdate;
    private LocalDate contractDate;
    private String ss;
    private UserType userType;
    private int departmentId;

    public LoginRespuestaDto(){}

    public LoginRespuestaDto(String dni, String firstName, String lastName, String email,
                             LocalDate birthdate,LocalDate contractDate, String ss,UserType
                                     userType, int departmentId) {
        this.dni = dni;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthdate = birthdate;
        this.contractDate = contractDate;
        this.ss = ss;
        this.userType = userType;
        this.departmentId = departmentId;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
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

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate bithdate) {
        this.birthdate = bithdate;
    }

    public LocalDate getContractDate() {
        return contractDate;
    }

    public void setContractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
    }

    public String getSs() {
        return ss;
    }

    public void setSs(String ss) {
        this.ss = ss;
    }
}
