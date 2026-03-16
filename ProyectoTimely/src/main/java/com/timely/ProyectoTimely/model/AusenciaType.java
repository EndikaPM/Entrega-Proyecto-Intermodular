package com.timely.ProyectoTimely.model;

/**
 * Enum que representa los tipos de ausencia.
 *
 * Debe coincidir con la columna "motivo" de la tabla "Ausencias" en MySQL.
 * En tu BD tienes: enum('VACACIONES','DESCANSO','CITA_MEDICA','OTRAS')
 */
public enum AusenciaType {
    VACACIONES,
    DESCANSO,
    CITA_MEDICA,
    OTRAS
}
