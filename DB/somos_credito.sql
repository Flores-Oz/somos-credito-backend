-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2025 a las 20:21:00
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
-- Base de datos: `somos_credito`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE `sucursales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `calle_numero` varchar(100) NOT NULL,
  `colonia` varchar(100) DEFAULT NULL,
  `municipio` varchar(50) NOT NULL,
  `departamento` varchar(50) NOT NULL,
  `codigo_postal` varchar(10) DEFAULT NULL,
  `telefono` varchar(30) NOT NULL,
  `estado` enum('ACTIVA','INACTIVA','PENDIENTE') NOT NULL DEFAULT 'ACTIVA',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sucursales`
--

INSERT INTO `sucursales` (`id`, `nombre`, `calle_numero`, `colonia`, `municipio`, `departamento`, `codigo_postal`, `telefono`, `estado`, `fecha_creacion`, `fecha_modificacion`) VALUES
(1, 'Sucursal Zona 1', '6a Avenida 14-25', 'Centro Histórico', 'Guatemala', 'Guatemala', '01001', '2314-5600', 'ACTIVA', '2025-11-27 10:14:54', '2025-11-27 17:42:40'),
(2, 'Sucursal Xela Centro', '4a Calle 12-45', 'Zona 1', 'Quetzaltenango', 'Quetzaltenango', '09001', '7767-2201', 'ACTIVA', '2025-11-27 10:14:54', '2025-11-27 10:14:54'),
(3, 'Sucursal Mazatenango', '2a Avenida 5-12', 'Zona 3', 'Mazatenango', 'Suchitepéquez', '10001', '7872-1188', 'ACTIVA', '2025-11-27 10:14:54', '2025-11-27 10:14:54'),
(4, 'Sucursal Chiquimula', '1a Avenida 3-40', 'Barrio El Molino', 'Chiquimula', 'Chiquimula', '20001', '7942-3345', 'ACTIVA', '2025-11-27 10:14:54', '2025-11-27 10:14:54'),
(5, 'Sucursal Antigua', '5a Avenida Norte 3', 'Centro', 'Antigua Guatemala', 'Sacatepéquez', '03001', '7832-1120', 'ACTIVA', '2025-11-27 10:14:54', '2025-11-27 10:14:54'),
(6, 'Sucursal Cobán', '2a Calle 7-55', 'Zona 3', 'Cobán', 'Alta Verapaz', '16001', '7951-3302', 'ACTIVA', '2025-11-27 10:14:54', '2025-11-27 10:14:54'),
(7, 'Sucursal Huehuetenango', '8a Avenida 4-10', 'Zona 1', 'Huehuetenango', 'Huehuetenango', '13001', '7765-8899', 'ACTIVA', '2025-11-27 10:14:54', '2025-11-27 10:14:54'),
(8, 'Sucursal Escuintla', '3a Avenida 6-30', 'Centro', 'Escuintla', 'Escuintla', '05001', '7888-4500', 'ACTIVA', '2025-11-27 10:14:54', '2025-11-27 10:14:54'),
(9, 'Sucursal Reu Centro', '6a Calle 9-14', 'Zona 1', 'Retalhuleu', 'Retalhuleu', '11001', '7771-2205', 'ACTIVA', '2025-11-27 10:14:54', '2025-11-27 10:14:54'),
(10, 'Sucursal Puerto Barrios', '10a Avenida 1-55', 'El Rastro', 'Puerto Barrios', 'Izabal', '07001', '7948-3308', 'ACTIVA', '2025-11-27 10:14:54', '2025-11-27 10:14:54'),
(11, 'Sucursal San Marcos', '7a Calle 3-15', 'Zona 2', 'San Marcos', 'San Marcos', '12001', '7760-5520', 'INACTIVA', '2025-11-27 10:15:16', '2025-11-27 10:15:16'),
(12, 'Sucursal Jalapa Centro', '4a Avenida 8-33', 'Barrio La Democracia', 'Jalapa', 'Jalapa', '22001', '7922-1187', 'INACTIVA', '2025-11-27 10:15:16', '2025-11-27 10:15:16'),
(13, 'Sucursal Salamá', '1a Calle 2-44', 'Zona 1', 'Salamá', 'Baja Verapaz', '15001', '7940-7714', 'INACTIVA', '2025-11-27 10:15:16', '2025-11-27 10:15:16'),
(14, 'Sucursal Jutiapa', '5a Calle 4-20', 'Colonia Independencia', 'Jutiapa', 'Jutiapa', '23001', '7844-9921', 'INACTIVA', '2025-11-27 10:15:16', '2025-11-27 10:15:16'),
(15, 'Sucursal Totonicapán', '3a Avenida 6-74', 'Zona 1', 'Totonicapán', 'Totonicapán', '08001', '7766-5410', 'PENDIENTE', '2025-11-27 10:15:16', '2025-11-27 10:15:16'),
(16, 'Sucursal Chimaltenango', '6a Calle 3-10', 'Colonia El Carmen', 'Chimaltenango', 'Chimaltenango', '04001', '7840-2205', 'PENDIENTE', '2025-11-27 10:15:16', '2025-11-27 10:15:16'),
(17, 'Sucursal Sololá', '2a Avenida 1-57', 'Centro', 'Sololá', 'Sololá', '07001', '7762-4411', 'PENDIENTE', '2025-11-27 10:15:16', '2025-11-27 10:15:16'),
(18, 'Sucursal Amatitlán', '7a Avenida 5-80', 'Colonia Progreso', 'Amatitlán', 'Guatemala', '01063', '6644-2215', 'ACTIVA', '2025-11-27 10:15:16', '2025-11-27 10:15:16'),
(19, 'Sucursal Villa Nueva', '14 Calle 5-11', 'Colonia La Reformita', 'Villa Nueva', 'Guatemala', '01064', '6622-5155', 'ACTIVA', '2025-11-27 10:15:16', '2025-11-27 10:15:16'),
(20, 'Sucursal Santa Lucía Cotzumalguapa', '3a Calle 1-20', 'Centro', 'Santa Lucía Cotzumalguapa', 'Escuintla', '05011', '7884-8110', 'ACTIVA', '2025-11-27 10:15:16', '2025-11-27 10:15:16'),
(21, 'Sucursal Zona 2', '6a Avenida 14-25', 'Centro ', 'Guatemala', 'Guatemala', '10023', '2315-4513', 'ACTIVA', '2025-11-27 12:22:04', '2025-11-27 12:22:18'),
(22, 'Sucursal Zona 4', '6a Avenida 14-23', 'Centro Histórico', 'Guatemala', 'Guatemala	', '01231', '2314-5600', 'ACTIVA', '2025-11-27 19:16:31', '2025-11-27 19:20:35');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
