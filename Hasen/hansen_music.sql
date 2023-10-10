-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2023 a las 21:16:27
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

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
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id_compra` int(255) NOT NULL,
  `id_vendedor` int(255) NOT NULL,
  `id_comprador` varchar(255) NOT NULL,
  `id_producto` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `nombre_usuario`, `contraseña`, `correo`, `reputacion`, `envio`) VALUES
(1, 'pato', 'asdadsa', '$2y$10$ffGReFfA4rlNiXxv2o3WFefwG2zbPErDvtm0JZcwXrXDgg63zB1me', 'asdsadsad', 2, ''),
(2, 'Taker', 'asa', '$2y$10$MaXKc3fH2F8UwyusH0D9W.neQUAJyhk..SF2yDyv1Yw0LE2.XGAOW', 'asa', NULL, 'Hogar y envío'),
(3, '', NULL, '$2y$10$FXqBYZXL9u/lkUvLbkIX.uFRaQE2vTwLjpoD1TY09o0xY7WV271Hi', NULL, NULL, NULL),
(4, '', NULL, '$2y$10$TNKnCMRAc7vEZEO0qyf9EO86D.9T3gBsJfwo6./815qsx06rbXWeG', NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `fk_id_vendedor` (`id_vendedor`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `fk_id_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
