-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2023 a las 20:24:09
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

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
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `id` int(8) NOT NULL,
  `name` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'Martin'),
(2, 'Gibson'),
(3, 'Takamine');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buys`
--

CREATE TABLE `buys` (
  `id` int(8) NOT NULL,
  `user_buyer_id` int(8) NOT NULL,
  `publication_id` int(8) NOT NULL,
  `status_id` int(8) DEFAULT NULL,
  `purchase_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `buys`
--

INSERT INTO `buys` (`id`, `user_buyer_id`, `publication_id`, `status_id`, `purchase_date`) VALUES
(1, 3, 25, 2, '2023-11-07 14:25:23'),
(2, 3, 21, 3, '2023-11-07 14:49:19'),
(3, 3, 24, 2, '2023-11-07 15:37:42'),
(4, 3, 22, 1, '2023-11-07 16:33:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orientations`
--

CREATE TABLE `orientations` (
  `id` int(8) NOT NULL,
  `name` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orientations`
--

INSERT INTO `orientations` (`id`, `name`) VALUES
(1, 'Diestro'),
(2, 'Zurdo'),
(3, 'Ambidiestro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(8) NOT NULL,
  `name` varchar(64) NOT NULL,
  `brand_id` int(8) NOT NULL,
  `orientation_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `brand_id`, `orientation_id`) VALUES
(1, 'Firebird X', 2, 2),
(2, 'Alhambra AJ-CR E9', 1, 1),
(3, 'GD30CE-12', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publications`
--

CREATE TABLE `publications` (
  `id` int(8) NOT NULL,
  `seller_id` int(8) DEFAULT NULL,
  `product_id` int(8) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(9) DEFAULT '0' NOT NULL CHECK (`price` > 0),
  `state` enum('Nuevo','Usado') DEFAULT NULL,
  `send_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publications`
--

INSERT INTO `publications` (`id`, `seller_id`, `product_id`, `name`, `description`, `price`, `state`, `send_id`) VALUES
(19, 3, 2, 'Guitarra Acústica', 'HOLAAA', 500, 'Nuevo', 1),
(20, 3, 2, 'Teclado Eléctrico', '', 750, 'Usado', 1),
(21, 3, 2, 'Batería Electrónica', '', 1000, 'Nuevo', 1),
(22, 3, 2, 'Bajo Eléctrico', '', 600, 'Nuevo', 1),
(23, 3, 2, 'Saxofón Tenor', '', 800, 'Nuevo', 1),
(24, 3, 2, 'Trompeta', '', 550, 'Usado', 1),
(25, 3, 2, 'Guitarra zurda', '', 12000, 'Nuevo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sends`
--

CREATE TABLE `sends` (
  `id` int(8) NOT NULL,
  `name` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sends`
--

INSERT INTO `sends` (`id`, `name`) VALUES
(1, 'En casa'),
(2, 'Envío');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `id` int(8) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'Despachando'),
(2, 'En envío'),
(3, 'Entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(8) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `location` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `mail`, `location`) VALUES
(3, 'Pato', '$2y$10$NO6KSpMSWRK0KG8RO.Wcee7aVxorO0lsnPCzJui5Ydf2w89J8ds2C', 'Pato@gmail.com', 'ASDSAD'),
(4, 'ASD', '$2y$10$zZqEYBejNlK0Ye5JfNNSweC323i7B4.SbU7w/VfoaeH0YNka/8X86', 'ASD@gmail.com', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `buys`
--
ALTER TABLE `buys`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_buyer_id` (`user_buyer_id`),
  ADD KEY `FK_status_id` (`status_id`),
  ADD KEY `FK_publication_id` (`publication_id`);

--
-- Indices de la tabla `orientations`
--
ALTER TABLE `orientations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_brand` (`brand_id`),
  ADD KEY `FK_orientation_id` (`orientation_id`);

--
-- Indices de la tabla `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `vendedor` (`seller_id`),
  ADD KEY `FK_product_id` (`product_id`),
  ADD KEY `FK_send_id` (`send_id`);

--
-- Indices de la tabla `sends`
--
ALTER TABLE `sends`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `buys`
--
ALTER TABLE `buys`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `orientations`
--
ALTER TABLE `orientations`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `publications`
--
ALTER TABLE `publications`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `sends`
--
ALTER TABLE `sends`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `buys`
--
ALTER TABLE `buys`
  ADD CONSTRAINT `FK_publication_id` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id`),
  ADD CONSTRAINT `FK_status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `fk_user_buyer_id` FOREIGN KEY (`user_buyer_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_orientation_id` FOREIGN KEY (`orientation_id`) REFERENCES `orientations` (`id`),
  ADD CONSTRAINT `fk_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`);

--
-- Filtros para la tabla `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `FK_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FK_send_id` FOREIGN KEY (`send_id`) REFERENCES `sends` (`id`),
  ADD CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
