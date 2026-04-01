package com.timely.ProyectoTimely.util;

/**
 * Clase de utilidad para validar DNI/NIE españoles.
 *
 * Reutilizada de tu proyecto original — solo cambiamos el package.
 *
 * En Spring Boot, las clases de utilidad no necesitan ninguna anotación especial.
 * Son clases Java normales con métodos estáticos.
 */
public class CheckDni {

    private static final String letrasOrdenadas = "TRWAGMYFPDXBNJZSQVHLCKE";

    public static boolean validDni(String dniComprovar) {
        String dni = dniComprovar.toLowerCase();
        if (dni.length() != 9) {
            return false;
        }

        char ultimaLetra = dni.charAt(8);
        int numerosDni;

        if (Character.isLetter(ultimaLetra)) {
            try {
                char primeraLetra = dni.charAt(0);
                if (Character.isLetter(primeraLetra) &&
                        (primeraLetra == 'x' || primeraLetra == 'y' || primeraLetra == 'z')) {
                    String formatearDNI = (primeraLetra == 'x') ? "0" : (primeraLetra == 'y' ? "1" : "2");
                    String dniFormateado = formatearDNI + dni.substring(1, 8);
                    numerosDni = Integer.parseInt(dniFormateado);
                } else if (Character.isDigit(primeraLetra)) {
                    numerosDni = Integer.parseInt(dni.substring(0, 8));
                } else {
                    return false;
                }
                char letrasCalculada = letrasOrdenadas.charAt(numerosDni % 23);
                return letrasCalculada == ultimaLetra;
            } catch (NumberFormatException e) {
                e.printStackTrace();
                return false;
            }
        }
        return false;
    }
}
