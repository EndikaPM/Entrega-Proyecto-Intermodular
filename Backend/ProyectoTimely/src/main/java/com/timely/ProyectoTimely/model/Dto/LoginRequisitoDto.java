package com.timely.ProyectoTimely.model.Dto;

public class LoginRequisitoDto {


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
