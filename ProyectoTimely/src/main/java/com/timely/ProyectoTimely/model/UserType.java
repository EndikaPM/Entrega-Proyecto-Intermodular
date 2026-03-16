package com.timely.ProyectoTimely.model;

/**
 * Enum que representa los tipos de usuario en la BD.
 *
 * IMPORTANTE: Los valores deben coincidir EXACTAMENTE con lo que hay en la columna
 * "user_type" de la tabla "usuario" en MySQL.
 *
 * En tu BD tienes: enum('Administrador','Empleado','Jefe')
 * Así que aquí ponemos esos MISMOS valores.
 */
public enum UserType {
    Administrador,
    Empleado,
    Jefe
}
