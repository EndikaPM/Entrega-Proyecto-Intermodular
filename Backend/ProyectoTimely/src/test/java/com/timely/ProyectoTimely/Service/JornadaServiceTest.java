package com.timely.ProyectoTimely.Service;

import com.timely.ProyectoTimely.model.Dto.UpdateJornadaRegistro;
import com.timely.ProyectoTimely.model.Jornada;
import com.timely.ProyectoTimely.model.Registro;
import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.JornadaRepository;
import com.timely.ProyectoTimely.repository.RegistroRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JornadaServiceTest {

    @Mock
    private JornadaRepository jornadaRepository;
    @Mock
    private RegistroRepository registroRepository;
    @InjectMocks
    private JornadaService jornadaService;

    @Test
    void registrarFichaje_DebeCrearNuevaJornada_CuandoNoHayJornada(){
        String dni = "12345678Z";
        // Simulamos que hoy no hay ninguna jornada para este DNI
        when(jornadaRepository.findByUsuarioDniAndFechaActual(eq(dni), any(LocalDate.class)))
                .thenReturn(new ArrayList<>());

        // Simulamos el guardado devolviendo el mismo objeto que recibe
        when(jornadaRepository.save(any(Jornada.class))).thenAnswer(i -> i.getArguments()[0]);

        // WHEN
        Jornada resultado = jornadaService.registrarFichaje(dni);

        // THEN
        assertNotNull(resultado);
        assertEquals(dni, resultado.getUsuario().getDni());
        assertNotNull(resultado.getHoraEntrada());
        assertNull(resultado.getHoraSalida()); // Es una entrada
        verify(jornadaRepository, times(1)).save(any(Jornada.class));
        //El verify(...) asegura que el repositorio realmente ha intentado guardar los datos.
    }

    @Test
    void registrarFichaje_DebeRegistrarSalida_CuandoYaExisteUnaEntradaSinSalida(){
        String dni = "12345678Z";
        Jornada jornadaExistente = new Jornada();
        jornadaExistente.setHoraEntrada(LocalTime.of(8, 0));
        jornadaExistente.setHoraSalida(null); // Está abierta

        when(jornadaRepository.findByUsuarioDniAndFechaActual(eq(dni), any(LocalDate.class)))
                .thenReturn(List.of(jornadaExistente));

        when(jornadaRepository.save(any(Jornada.class))).thenAnswer(i -> i.getArguments()[0]);
        /*
        Esto es muy útil porque el save de Spring Data suele devolver el objeto guardado.
        Con esa línea le decimos a Mockito: "Simplemente devuelve lo mismo que te pase por el parámetro".
        */

        // WHEN
        Jornada resultado = jornadaService.registrarFichaje(dni);

        // THEN
        assertNotNull(resultado.getHoraSalida());
        assertEquals(LocalTime.of(8, 0), resultado.getHoraEntrada());
        verify(jornadaRepository, times(1)).save(jornadaExistente);
    }

    @Test
    void actualizarJornada_DebeGuardarRegistroYActualizarDatos() {
        int idJornada = 1;
        Usuario usuario = new Usuario();
        usuario.setDni("12345678Z");

        Jornada jornadaEnDB = new Jornada();
        jornadaEnDB.setId(idJornada);
        jornadaEnDB.setUsuario(usuario);
        jornadaEnDB.setFechaActual(LocalDate.now().minusDays(1));

        UpdateJornadaRegistro jornadaActualizada = new UpdateJornadaRegistro();
        jornadaActualizada.setMotivo("Olvido marcar salida");
        Jornada jornadaNueva = new Jornada();
        jornadaNueva.setUsuario(usuario);
        jornadaNueva.setFechaActual(LocalDate.now().minusDays(1));
        jornadaNueva.setHoraSalida(LocalTime.of(18, 0));
        jornadaActualizada.setJorbada(jornadaNueva);

        when(jornadaRepository.findById(idJornada)).thenReturn(Optional.of(jornadaEnDB));
        when(jornadaRepository.save(any(Jornada.class))).thenAnswer(i -> i.getArguments()[0]);

        // 2. WHEN
        Jornada resultado = jornadaService.actualizarJornada(idJornada, jornadaActualizada);

        // 3. THEN
        assertTrue(resultado.isModificado());
        verify(registroRepository, times(1)).save(any(Registro.class)); // Verifica que se creó el rastro
        verify(jornadaRepository, times(1)).save(jornadaEnDB);
    }
}
