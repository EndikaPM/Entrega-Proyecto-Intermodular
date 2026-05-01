-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-05-2026 a las 11:43:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Timely`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ausencias`
--

CREATE TABLE `ausencias` (
  `id` int(11) NOT NULL,
  `id_trabajador` char(9) NOT NULL,
  `dia_inicio_ausencia` date NOT NULL,
  `dia_fin_ausencia` date NOT NULL,
  `motivo` enum('VACACIONES','DESCANSO','CITA_MEDICA','OTRAS') NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ausencias`
--

INSERT INTO `ausencias` (`id`, `id_trabajador`, `dia_inicio_ausencia`, `dia_fin_ausencia`, `motivo`, `descripcion`) VALUES
(1, '00000000O', '2026-04-03', '2026-04-03', 'CITA_MEDICA', 'Esto en una prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre_depar` varchar(80) NOT NULL,
  `id_empresa` char(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id`, `nombre_depar`, `id_empresa`) VALUES
(1, 'Insertado por la web', 'B12345678'),
(10, 'Logistica', 'B12345678'),
(11, 'ventas', 'B12345678'),
(12, 'gestion', 'B12345678'),
(13, 'Departamento desde React', 'G12345678H');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `nif` char(12) NOT NULL,
  `nombre_empre` varchar(80) NOT NULL,
  `direccion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`nif`, `nombre_empre`, `direccion`) VALUES
('B12345678', 'Inditex', 'c/ Inventada 1 2ºiz'),
('G12345678H', 'Empresa desde React', 'Direccion desde React , 1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas_trabajo`
--

CREATE TABLE `horas_trabajo` (
  `id_usuario` char(9) NOT NULL,
  `horas_contrato` decimal(10,1) UNSIGNED NOT NULL,
  `horas_trabajadas` decimal(10,1) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horas_trabajo`
--

INSERT INTO `horas_trabajo` (`id_usuario`, `horas_contrato`, `horas_trabajadas`) VALUES
('00000000O', 1750.0, 13.4),
('12345678C', 1065.6, 10.0),
('52413669H', 1776.0, 15.3),
('6541355L', 888.0, 8.0),
('78901234A', 1665.0, 14.0),
('90123456B', 1332.0, 12.0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornada`
--

CREATE TABLE `jornada` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_trabajador` char(9) NOT NULL,
  `fecha_actual` date NOT NULL,
  `hora_entrada` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `modificado` tinyint(1) NOT NULL
) ;

--
-- Volcado de datos para la tabla `jornada`
--

INSERT INTO `jornada` (`id`, `id_trabajador`, `fecha_actual`, `hora_entrada`, `hora_salida`, `modificado`) VALUES
(15, '52413669H', '2025-10-20', '07:00:00', '14:00:00', 0),
(16, '52413669H', '2025-10-21', '07:00:00', '15:00:00', 1),
(18, '6541355L', '2025-01-01', '07:00:00', '14:00:00', 1),
(19, '78901234A', '2025-10-20', '07:00:00', '14:00:00', 0),
(20, '78901234A', '2025-10-21', '07:00:00', '14:00:00', 0),
(21, '90123456B', '2025-10-20', '08:00:00', '14:00:00', 0),
(22, '90123456B', '2025-10-21', '08:00:00', '14:00:00', 0),
(23, '12345678C', '2025-10-20', '09:00:00', '14:00:00', 0),
(24, '12345678C', '2025-10-21', '09:00:00', '14:00:00', 0),
(26, '00000000O', '2026-03-21', '20:41:25', '20:41:51', 0),
(27, '00000000O', '2026-03-22', '13:03:26', '13:04:30', 0),
(28, '00000000O', '2026-03-22', '13:37:00', '14:20:48', 0),
(29, '00000000O', '2026-03-28', '17:59:02', '20:26:04', 0),
(30, '00000000O', '2026-03-28', '20:45:05', '21:36:08', 0),
(33, '00000000O', '2026-03-29', '19:41:07', '23:00:00', 0),
(34, '00000000O', '2026-03-30', '17:27:41', '19:27:12', 0),
(36, '00000000O', '2026-04-02', '13:33:43', '13:34:15', 0),
(37, '00000000O', '2026-04-02', '13:40:20', '13:40:27', 0),
(38, '00000000O', '2026-04-02', '18:54:49', '23:00:00', 0),
(39, '52413669H', '2026-04-20', '12:54:38', '13:09:40', 0),
(40, '6541355L', '2026-04-22', '12:08:41', NULL, 0);

--
-- Disparadores `jornada`
--
DELIMITER $$
CREATE TRIGGER `actualizar_horas_trabajadas` AFTER UPDATE ON `jornada` FOR EACH ROW BEGIN
    DECLARE total_horas DECIMAL(10,1);
    
    -- Solo ejecutar si se acaba de agregar hora_salida
    -- (antes era NULL y ahora tiene valor)
    IF OLD.hora_salida IS NULL AND NEW.hora_salida IS NOT NULL THEN
        
        -- Calcular el total de horas trabajadas del empleado
        SELECT COALESCE(SUM(TIMESTAMPDIFF(MINUTE, hora_entrada, hora_salida) / 60.0), 0)
        INTO total_horas
        FROM jornada
        WHERE id_trabajador = NEW.id_trabajador
          AND hora_entrada IS NOT NULL
          AND hora_salida IS NOT NULL;
        
        -- Actualizar o insertar en horas_trabajo
        INSERT INTO horas_trabajo (id_usuario, horas_contrato, horas_trabajadas)
        VALUES (NEW.id_trabajador, 0, ROUND(total_horas, 1))
        ON DUPLICATE KEY UPDATE 
            horas_trabajadas = ROUND(total_horas, 1);
            
    END IF;
    
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `calcular_horas_trabajadas` AFTER INSERT ON `jornada` FOR EACH ROW BEGIN
    DECLARE total_horas DECIMAL(10,1);
    
    -- Solo si se insertó con entrada Y salida completas
    IF NEW.hora_entrada IS NOT NULL AND NEW.hora_salida IS NOT NULL THEN
        
        SELECT COALESCE(SUM(TIMESTAMPDIFF(MINUTE, hora_entrada, hora_salida) / 60.0), 0)
        INTO total_horas
        FROM jornada
        WHERE id_trabajador = NEW.id_trabajador
          AND hora_entrada IS NOT NULL
          AND hora_salida IS NOT NULL;
        
        INSERT INTO horas_trabajo (id_usuario, horas_contrato, horas_trabajadas)
        VALUES (NEW.id_trabajador, 0, ROUND(total_horas, 1))
        ON DUPLICATE KEY UPDATE 
            horas_trabajadas = ROUND(total_horas, 1);
            
    END IF;
    
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `usuario_dni` char(9) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_envio` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `usuario_dni`, `contenido`, `fecha_envio`) VALUES
(1, '00000000O', 'Hola Mundo!', '2026-04-01 17:36:11'),
(2, '12345678C', 'Hola Admin', '2026-04-01 17:45:41'),
(3, '00000000O', 'Hola Marta', '2026-04-01 17:45:46'),
(4, '00000000O', 'Prueba desde React', '2026-04-01 21:03:54'),
(5, '12345678C', 'Hola Grupo', '2026-04-01 21:44:46'),
(6, '12345678C', 'Prueba desde una navegación privada', '2026-04-01 21:45:23'),
(7, '52413669H', 'Hola', '2026-04-02 13:42:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_usuario_modificador` char(9) NOT NULL,
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_anterior` date DEFAULT NULL,
  `hora_entrada_anterior` time DEFAULT NULL,
  `hora_salida_anterior` time DEFAULT NULL,
  `id_jornada_modificada` int(10) UNSIGNED NOT NULL,
  `motivo` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`id`, `id_usuario_modificador`, `fecha_modificacion`, `fecha_anterior`, `hora_entrada_anterior`, `hora_salida_anterior`, `id_jornada_modificada`, `motivo`) VALUES
(1, '00000000O', '2026-03-31 00:00:00', NULL, NULL, NULL, 18, 'Prueba de edición'),
(2, '00000000O', '2026-03-31 21:15:57', '2025-01-01', NULL, NULL, 18, 'Prueba 2'),
(3, '00000000O', '2026-03-31 21:29:28', '2025-10-21', '07:00:00', '14:00:00', 16, 'Prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `dni` char(9) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `contract_date` date DEFAULT NULL,
  `social_security` char(12) DEFAULT NULL,
  `user_type` enum('Administrador','Empleado','Jefe') DEFAULT NULL,
  `department` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`dni`, `first_name`, `last_name`, `email`, `password`, `birthday`, `contract_date`, `social_security`, `user_type`, `department`) VALUES
('00000000O', 'admin', 'administrador', 'admin@gmail.com', 'admin', '1999-08-25', '2022-11-10', '109876543210', 'Administrador', 12),
('12345678C', 'marta', 'lopez', 'marta.lopez@gmail.com', 'marta_l', '1999-08-25', '2022-11-10', '109876543210', 'Empleado', 10),
('12345678K', 'Prueba', 'NADA', 'esto.es@unapruebba.com', '12345678', '2026-04-22', NULL, NULL, 'Empleado', 1),
('52413669H', 'usuario', 'prueba1', 'usuario.prueba1@gmail.com', 'usuario1', '2000-12-20', '2020-10-18', '412365478965', 'Empleado', 10),
('6541355L', '¡¡¡¡¡Editado!!!!!!', 'prueba2', 'usuario.prueba2@gmail.com', 'usuario2', '2000-12-20', '2020-10-18', '412365478965', 'Empleado', 11),
('78901234A', 'ana', 'garcia', 'ana.garcia@gmail.com', 'ana_g', '1995-05-15', '2021-03-01', '987654321012', 'Jefe', 10),
('90123456B', 'luis', 'fernandez', 'luis.fernandez@gmail.com', 'luis_f', '1988-11-10', '2018-07-20', '543210987654', 'Empleado', 11);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ausencias`
--
ALTER TABLE `ausencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_trabajador` (`id_trabajador`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_empresa` (`id_empresa`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`nif`);

--
-- Indices de la tabla `horas_trabajo`
--
ALTER TABLE `horas_trabajo`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `jornada`
--
ALTER TABLE `jornada`
  ADD PRIMARY KEY (`id`,`id_trabajador`),
  ADD KEY `fk_usuario` (`id_trabajador`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mensaje_usuario` (`usuario_dni`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_registro_usuario` (`id_usuario_modificador`),
  ADD KEY `fk_registro_jornada` (`id_jornada_modificada`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`dni`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_departamento` (`department`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ausencias`
--
ALTER TABLE `ausencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `jornada`
--
ALTER TABLE `jornada`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ausencias`
--
ALTER TABLE `ausencias`
  ADD CONSTRAINT `ausencias_ibfk_1` FOREIGN KEY (`id_trabajador`) REFERENCES `usuario` (`dni`);

--
-- Filtros para la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD CONSTRAINT `fk_empresa` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`nif`);

--
-- Filtros para la tabla `horas_trabajo`
--
ALTER TABLE `horas_trabajo`
  ADD CONSTRAINT `fk_horas_trabajo_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`),
  ADD CONSTRAINT `fk_usuario_horas` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`),
  ADD CONSTRAINT `fk_usuario_horasContrato` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`dni`);

--
-- Filtros para la tabla `jornada`
--
ALTER TABLE `jornada`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_trabajador`) REFERENCES `usuario` (`dni`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `fk_mensaje_usuario` FOREIGN KEY (`usuario_dni`) REFERENCES `usuario` (`dni`);

--
-- Filtros para la tabla `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `fk_registro_jornada` FOREIGN KEY (`id_jornada_modificada`) REFERENCES `jornada` (`id`),
  ADD CONSTRAINT `fk_registro_usuario` FOREIGN KEY (`id_usuario_modificador`) REFERENCES `usuario` (`dni`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_departamento` FOREIGN KEY (`department`) REFERENCES `departamento` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
