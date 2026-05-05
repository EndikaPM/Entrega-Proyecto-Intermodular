package com.timely.ProyectoTimely.Service;

import com.timely.ProyectoTimely.model.Dto.LoginRequisitoDto;
import com.timely.ProyectoTimely.model.Dto.LoginRespuestaDto;
import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public LoginRespuestaDto autenticar(LoginRequisitoDto loginRequest){

        if (loginRequest.getEmail() == null || loginRequest.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("El email es obligatorio");
        }

        if (loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("La contraseña es obligatoria");
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginRequest.getEmail());

        if (!usuarioOpt.isPresent()) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        Usuario usuario = usuarioOpt.get();

        if (!usuario.getPassword().equals(loginRequest.getPassword())) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        LoginRespuestaDto response = new LoginRespuestaDto();
        response.setDni(usuario.getDni());
        response.setFirstName(usuario.getFirstName());
        response.setLastName(usuario.getLastName());
        response.setEmail(usuario.getEmail());
        response.setBirthdate(usuario.getBirthday());
        response.setSs(usuario.getSocialSecurity());
        response.setContractDate(usuario.getContractDate());
        response.setUserType(usuario.getUserType());
        response.setDepartmentId(usuario.getDepartamento().getId());

        return response;
    }

   
    public boolean existeUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }

}
