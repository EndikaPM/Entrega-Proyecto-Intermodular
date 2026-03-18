-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 18-03-2026 a las 21:33:02
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
-- Estructura de tabla para la tabla `Ausencias`
--

CREATE TABLE `Ausencias` (
  `id` int(11) NOT NULL,
  `id_trabajador` char(9) NOT NULL,
  `dia_inicio_ausencia` date NOT NULL,
  `dia_fin_ausencia` date NOT NULL,
  `motivo` enum('VACACIONES','DESCANSO','CITA_MEDICA','OTRAS') NOT NULL
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id` int(11) UNSIGNED NOT NULL,
  `nombre_depar` varchar(80) NOT NULL,
  `id_empresa` char(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id`, `nombre_depar`, `id_empresa`) VALUES
(10, 'Logistica', 'B12345678'),
(11, 'ventas', 'B12345678'),
(12, 'gestion', 'B12345678');

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
('B12345678', 'Inditex', 'c/ Inventada 1 2ºiz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas_trabajo`
--

CREATE TABLE `horas_trabajo` (
  `id_usuario` char(9) NOT NULL,
  `horas_contrato` decimal(10,1) UNSIGNED NOT NULL,
  `horas_trabajadas` decimal(10,1) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horas_trabajo`
--

INSERT INTO `horas_trabajo` (`id_usuario`, `horas_contrato`, `horas_trabajadas`) VALUES
('12345678C', 1065.6, 10.0),
('52413669H', 1776.0, 14.0),
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
(16, '52413669H', '2025-10-21', '07:00:00', '14:00:00', 0),
(17, '6541355L', '2025-10-20', '10:00:00', '14:00:00', 0),
(18, '6541355L', '2025-10-21', '10:00:00', '14:00:00', 0),
(19, '78901234A', '2025-10-20', '07:00:00', '14:00:00', 0),
(20, '78901234A', '2025-10-21', '07:00:00', '14:00:00', 0),
(21, '90123456B', '2025-10-20', '08:00:00', '14:00:00', 0),
(22, '90123456B', '2025-10-21', '08:00:00', '14:00:00', 0),
(23, '12345678C', '2025-10-20', '09:00:00', '14:00:00', 0),
(24, '12345678C', '2025-10-21', '09:00:00', '14:00:00', 0);

--
-- Disparadores `jornada`
--
DELIMITER $$
CREATE TRIGGER `actualizar_horas_trabajadas` AFTER UPDATE ON `jornada` FOR EACH ROW BEGIN
	DECLARE total_horas DECIMAL(10,1);
    
    -- si se actualiza necesitamos recalcular las horas igual que antes
    SELECT COALESCE(SUM(TIMESTAMPDIFF(MINUTE, hora_entrada, hora_salida) / 60), 0)
    INTO total_horas 
    FROM jornada
    WHERE id_trabajador = NEW.id_trabajador
    AND hora_entrada IS NOT NULL 
    AND hora_salida IS NOT NULL;
    
    UPDATE horas_trabajo SET horas_trabajadas = ROUND(total_horas, 1) WHERE id_usuario = NEW.id_trabajador;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `calcular_horas_trabajadas` AFTER INSERT ON `jornada` FOR EACH ROW BEGIN
	DECLARE total_horas DECIMAL(10,2);
    
    -- calculo las horas de cada linea de empleado de horas que trabaja
    SELECT COALESCE(SUM(TIMESTAMPDIFF(MINUTE, hora_entrada, hora_salida) / 60), 0)
    /*  1ºPonemos el COALESE para evitar los null ya que si tiene entrada pero no salida petaba se lo pregunte a la IA (COALESCE(..., 0): Si no hay nada que sumar, entrega un 0 en lugar de un vacío.
    	2ºTIMESTAMPDIFF(MINUTE, ...): Calcula la diferencia entre entrada y salida en minutos lo divido en sesenta y asi me debuelve esos minutos en horas decimales.*/
    INTO total_horas
    FROM jornada
    WHERE id_trabajador = NEW.id_trabajador
    AND hora_entrada IS NOT NULL# aqui con estas dos lineas ignoramos todos los registros 
    AND hora_salida IS NOT NULL;# que no esten completo que le falte la salida.
    
    -- Actualizamos la tabla para que tenga las horas totales
    UPDATE horas_trabajo SET horas_trabajadas = ROUND(total_horas, 1)# Un metodo de seguridad por si se trunca mal
    WHERE id_usuario = NEW.id_trabajador;
END
$$
DELIMITER ;

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
  `contract_date` date NOT NULL,
  `social_security` char(12) NOT NULL,
  `user_type` enum('Administrador','Empleado','Jefe') NOT NULL,
  `department` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`dni`, `first_name`, `last_name`, `email`, `password`, `birthday`, `contract_date`, `social_security`, `user_type`, `department`) VALUES
('00000000O', 'admin', 'administrador', 'admin@gmail.com', 'admin', '1999-08-25', '2022-11-10', '109876543210', 'Administrador', 12),
('12345678C', 'marta', 'lopez', 'marta.lopez@gmail.com', 'marta_l', '1999-08-25', '2022-11-10', '109876543210', 'Empleado', 10),
('52413669H', 'usuario', 'prueba1', 'usuario.prueba1@gmail.com', 'usuario1', '2000-12-20', '2020-10-18', '412365478965', 'Empleado', 10),
('6541355L', '¡¡¡¡¡Editado!!!!!!', 'prueba2', 'usuario.prueba2@gmail.com', 'usuario2', '2000-12-20', '2020-10-18', '412365478965', 'Empleado', 11),
('78901234A', 'ana', 'garcia', 'ana.garcia@gmail.com', 'ana_g', '1995-05-15', '2021-03-01', '987654321012', 'Jefe', 10),
('90123456B', 'luis', 'fernandez', 'luis.fernandez@gmail.com', 'luis_f', '1988-11-10', '2018-07-20', '543210987654', 'Empleado', 11);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Ausencias`
--
ALTER TABLE `Ausencias`
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
-- AUTO_INCREMENT de la tabla `Ausencias`
--
ALTER TABLE `Ausencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jornada`
--
ALTER TABLE `jornada`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Ausencias`
--
ALTER TABLE `Ausencias`
  ADD CONSTRAINT `Ausencias_ibfk_1` FOREIGN KEY (`id_trabajador`) REFERENCES `usuario` (`dni`);

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
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_departamento` FOREIGN KEY (`department`) REFERENCES `departamento` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
