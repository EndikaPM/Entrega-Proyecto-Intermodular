package com.timely.ProyectoTimely.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;


public class FechasUtil {

    private static final DateTimeFormatter FORMATO = DateTimeFormatter.ofPattern("dd/MM/yyyy");

   
    public static LocalDate convertirFecha(String fecha) {
        try {
            return LocalDate.parse(fecha, FORMATO);
        } catch (DateTimeParseException e) {
            System.out.println("Formato de fecha incorrecto: " + fecha);
            return null;
        }
    }

    
    public static String convertirFecha(LocalDate fecha) {
        return fecha.format(FORMATO);
    }
}
