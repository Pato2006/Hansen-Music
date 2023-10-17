-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2023 a las 01:43:40
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

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
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `vendedor` int(11) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `precio` int(8) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `estado` varchar(30) DEFAULT NULL,
  `orientacion` varchar(30) DEFAULT NULL,
  `entrega` varchar(50) DEFAULT NULL,
  `ubicacion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`vendedor`, `nombre`, `precio`, `marca`, `estado`, `orientacion`, `entrega`, `ubicacion`) VALUES
(NULL, 'Piano', 100, 'Marca1', 'Nuevo', 'Orientacion1', 'Entrega1', 'Ubicacion1'),
(NULL, 'Guitarra', 150, 'Marca2', 'Usado', 'Orientacion2', 'Entrega2', 'Ubicacion2'),
(NULL, 'Saxofon', 200, 'Marca3', 'Nuevo', 'Orientacion3', 'Entrega3', 'Ubicacion3'),
(NULL, 'Ukulele', 120, 'Marca4', 'Nuevo', 'Orientacion4', 'Entrega4', 'Ubicacion4'),
(NULL, 'Guitarra Roja', 100, 'Marca1', 'Nuevo', 'Orientacion1', 'Entrega1', 'Ubicacion1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `nombre_usuario` varchar(255) DEFAULT NULL,
  `contraseña` varchar(255) NOT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `reputacion` int(2) DEFAULT NULL,
  `envio` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `nombre_usuario`, `contraseña`, `correo`, `reputacion`, `envio`) VALUES
(2, 'pato', 'Pato', '$2y$10$2SYIEXDO.CCPo3vrqnuo8.9fJ1LMQFr3ksHOuHxQb.z2q0WQZSda2', 'pato', NULL, ''),
(9, 'NEgrosSucio', 'ASDASDsA', '$2y$10$JxP.gB/DAQuRKhCcirFfN.GZvalQ0zuar3O5URKT4vk2K0gTpjiS2', 'ASDASDsAd', NULL, 'Hogar y envío');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
