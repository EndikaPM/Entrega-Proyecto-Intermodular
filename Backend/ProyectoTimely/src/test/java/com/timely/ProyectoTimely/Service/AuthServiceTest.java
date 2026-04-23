package com.timely.ProyectoTimely.Service;

import com.timely.ProyectoTimely.model.Departamento;
import com.timely.ProyectoTimely.model.Dto.LoginRequisitoDto;
import com.timely.ProyectoTimely.model.Dto.LoginRespuestaDto;
import com.timely.ProyectoTimely.model.Empresa;
import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;
    @InjectMocks
    private AuthService authService;
    @Test
    void autenticar_SiDatosSonCorrectos_RetornaResponseDto() {
        // 1.Preparación
        LoginRequisitoDto req = new LoginRequisitoDto("test@mail.com", "1234");

        Empresa empFake = new Empresa();
        Departamento depaFake = new Departamento();
        depaFake.setId(1);
        depaFake.setEmpresa(empFake);
        depaFake.setNombreDepar("IT");

        Usuario usuarioFake = new Usuario();
        usuarioFake.setEmail("test@mail.com");
        usuarioFake.setPassword("1234");
        usuarioFake.setDepartamento(depaFake);

        // Cuando el repo busque ese email, devolverá nuestro usuario fake
        when(usuarioRepository.findByEmail("test@mail.com")).thenReturn(Optional.of(usuarioFake));

        // 2. WHEN (Ejecución)
        LoginRespuestaDto resultado = authService.autenticar(req);

        // 3. THEN (Verificación)
        assertNotNull(resultado);
        assertEquals("test@mail.com", resultado.getEmail());
        verify(usuarioRepository, times(1)).findByEmail("test@mail.com");
    }

    @Test
    void autenticar_SiPasswordIncorrecta_LanzaExcepcion() {

        LoginRequisitoDto req = new LoginRequisitoDto("test@mail.com", "password_mal");
        Usuario usuarioFake = new Usuario();
        usuarioFake.setEmail("test@mail.com");
        usuarioFake.setPassword("1234");

        when(usuarioRepository.findByEmail("test@mail.com")).thenReturn(Optional.of(usuarioFake));

        // WHEN & THEN
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.autenticar(req);
        });

        assertEquals("Credenciales inválidas", exception.getMessage());
    }
}
