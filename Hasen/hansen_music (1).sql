-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-10-2023 a las 15:41:04
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hansen_music`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contraseña` varchar(255) CHARACTER SET macce COLLATE macce_nopad_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `contraseña`) VALUES
(1, 'pato', '$2y$10$/eQoh8nYbdTaBFtip0SpPOUUcJma6ycApDfbu5mSkpiILwhx2JLF2'),
(2, 'pato', '$2y$10$D54a9HVIj.1ABVANBm80cuJtIIP1ZBxGQRbivHnSpZz0Hob3jZ2Du'),
(3, 'santi', '$2y$10$jr1.QQm6v..sJUYcMhqj7eIJOZa9SYmFTvarRYUWKxfWWgof1BMWW');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_informacion`
--

CREATE TABLE `usuarios_informacion` (
  `id` int(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `nombre_compañia` varchar(255) NOT NULL,
  `reputacion` int(2) NOT NULL,
  `envio` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios_informacion`
--

INSERT INTO `usuarios_informacion` (`id`, `correo`, `nombre_compañia`, `reputacion`, `envio`) VALUES
(1, '', '', 0, ''),
(2, '', '', 0, ''),
(3, '', '', 0, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios_informacion`
--
ALTER TABLE `usuarios_informacion`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios_informacion`
--
ALTER TABLE `usuarios_informacion`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
