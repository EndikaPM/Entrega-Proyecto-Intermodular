package com.timely.ProyectoTimely.model.Dto;

import com.timely.ProyectoTimely.model.UserType;

public class LoginRespuestaDto {
    /**
     * DTO para la respuesta del login.
     *
     * ¿Por qué este DTO?
     * - Seguridad: NO devolvemos la contraseña al frontend
     * - Eficiencia: Solo enviamos los datos que el frontend necesita
     * - Token: En el futuro puedes agregar un campo "token" para JWT
     *
     * El backend devolverá un JSON así:
     * {
     *   "dni": "52413669H",
     *   "firstName": "Juan",
     *   "lastName": "Pérez",
     *   "email": "juan@empresa.com",
     *   "userType": "Empleado",
     *   "departmentId": 3
     * }
     */
    private String dni;
    private String firstName;
    private String lastName;
    private String email;
    private UserType userType;
    private int departmentId;

    public LoginRespuestaDto(){}

    public LoginRespuestaDto(String dni, String firstName, String lastName, String email, UserType userType, int departmentId) {
        this.dni = dni;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
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
}
