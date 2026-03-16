package com.timely.ProyectoTimely.model.Dto;

public class LoginRequisitoDto {
    /**
     * DTO (Data Transfer Object) para recibir las credenciales del login.
     *
     * ¿Por qué un DTO?
     * - Seguridad: No exponemos la entidad Usuario completa
     * - Limpieza: Solo enviamos email + password (no DNI, departamento, etc.)
     * - Validación: Podemos agregar anotaciones @NotBlank, @Email, etc.
     *
     * El frontend enviará un JSON así:
     * {
     *   "email": "juan@empresa.com",
     *   "password": "miPassword123"
     * }
     */

    private String email;
    private String password;

    public LoginRequisitoDto(){}
    public LoginRequisitoDto(String email, String password){
        this.email = email;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
