package com.timely.ProyectoTimely.Service;

import com.timely.ProyectoTimely.model.Dto.UpdateJornadaRegistro;
import com.timely.ProyectoTimely.model.Jornada;
import com.timely.ProyectoTimely.model.Registro;
import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.JornadaRepository;
import com.timely.ProyectoTimely.repository.RegistroRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class JornadaService {
    @Autowired
    private JornadaRepository jornadaRepository;
    @Autowired
    private RegistroRepository registroRepository;

    public Jornada registrarFichaje (String dniUsuario){
        LocalDate hoy = LocalDate.now();
        List<Jornada> jornadaHoy = jornadaRepository.findByUsuarioDniAndFechaActual(dniUsuario, hoy);

        //Buscamos si hay alguna jornada abierta (sin hora de salida)
        Optional<Jornada> jornadaSinSalida = jornadaHoy.stream()
                .filter(j -> j.getHoraSalida() == null)
                .findFirst();

        if (jornadaSinSalida.isPresent()) {
            // Es una SALIDA
            Jornada jornada = jornadaSinSalida.get();
            jornada.setHoraSalida(LocalTime.now());
            return jornadaRepository.save(jornada);
        } else {
            // Es una ENTRADA
            Usuario user = new Usuario();
            user.setDni(dniUsuario);
            Jornada nuevaJornada = new Jornada(user, hoy, LocalTime.now());
            return jornadaRepository.save(nuevaJornada);
        }
    }

    @Transactional
    public Jornada actualizarJornada(int id, UpdateJornadaRegistro dto) {
        Jornada jornadaEnDB = jornadaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Jornada no encontrada"));

        // Guardar rastro en la tabla Registro
        Registro temporalRegistro = new Registro();
        temporalRegistro.setIdUsuarioModificador(dto.getJornada().getUsuario().getDni());
        temporalRegistro.setFechaModificada(LocalDateTime.now());
        temporalRegistro.setFechaAnterior(jornadaEnDB.getFechaActual());
        temporalRegistro.setHoraEntradaAnterior(jornadaEnDB.getHoraEntrada());
        temporalRegistro.setHoraSalidaAnterior(jornadaEnDB.getHoraSalida());
        temporalRegistro.setJornada(jornadaEnDB);
        temporalRegistro.setMotivo(dto.getMotivo());

        registroRepository.save(temporalRegistro);

        // Actualizar datos
        Jornada datosNuevos = dto.getJornada();
        jornadaEnDB.setFechaActual(datosNuevos.getFechaActual());
        jornadaEnDB.setHoraEntrada(datosNuevos.getHoraEntrada());
        jornadaEnDB.setHoraSalida(datosNuevos.getHoraSalida());
        jornadaEnDB.setModificado(true);

        return jornadaRepository.save(jornadaEnDB);
    }
}
