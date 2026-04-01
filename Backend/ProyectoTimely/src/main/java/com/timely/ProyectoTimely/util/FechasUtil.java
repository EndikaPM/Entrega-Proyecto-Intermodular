package com.timely.ProyectoTimely.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/**
 * Clase de utilidad para convertir fechas.
 *
 * Reutilizada de tu proyecto original — solo cambiamos el package.
 */
public class FechasUtil {

    private static final DateTimeFormatter FORMATO = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    // Convierte un String "dd/MM/yyyy" a LocalDate
    public static LocalDate convertirFecha(String fecha) {
        try {
            return LocalDate.parse(fecha, FORMATO);
        } catch (DateTimeParseException e) {
            System.out.println("Formato de fecha incorrecto: " + fecha);
            return null;
        }
    }

    // Convierte un LocalDate a un String "dd/MM/yyyy"
    public static String convertirFecha(LocalDate fecha) {
        return fecha.format(FORMATO);
    }
}
