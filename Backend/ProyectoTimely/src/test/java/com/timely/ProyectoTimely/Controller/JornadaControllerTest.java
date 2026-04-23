package com.timely.ProyectoTimely.Controller;

import com.timely.ProyectoTimely.Service.JornadaService;
import com.timely.ProyectoTimely.controller.JornadaController;
import com.timely.ProyectoTimely.model.Jornada;
import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.JornadaRepository;
import com.timely.ProyectoTimely.repository.RegistroRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(JornadaController.class)
public class JornadaControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private JornadaService jornadaService;
    @MockitoBean
    private JornadaRepository jornadaRepository;
    @MockitoBean
    private RegistroRepository registroRepository;

    @Test
    void fichar_DebeCrearNuevaJornada_CuandoNoExisteFichajeHoy() throws Exception {
        String dni = "12345678Z";

        Jornada jornadaFake = new Jornada();

        Usuario u = new Usuario();
        u.setDni(dni);
        jornadaFake.setUsuario(u);
        jornadaFake.setHoraEntrada(LocalTime.now());

        // Simulamos que al buscar jornada hoy, la lista está vacía
        when(jornadaService.registrarFichaje(dni)).thenReturn(jornadaFake);


        mockMvc.perform(post("/api/v1/jornadas/fichar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"dni\": \"" + dni + "\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tipo").value("ENTRADA"))
                .andExpect(jsonPath("$.jornada.usuario.dni").value(dni));
    }
}
