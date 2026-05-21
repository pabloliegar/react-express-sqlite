-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2026 a las 21:16:46
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
-- Base de datos: `users`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `tweet_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `texto` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `tweet_id`, `usuario_id`, `texto`, `fecha`) VALUES
(1, 1, 3, 'hola', '2025-06-17 12:34:30'),
(2, 1, 3, 'hola', '2025-06-18 23:48:07'),
(4, 1, 3, 'per', '2025-06-18 23:49:44'),
(5, 1, 3, 'per', '2025-06-18 23:49:44'),
(6, 1, 3, 'bb', '2025-06-18 23:50:12'),
(7, 1, 3, 'bb', '2025-06-18 23:50:12'),
(8, 1, 3, 'jjj', '2025-06-18 23:55:21'),
(9, 1, 3, 'cc', '2025-06-18 23:57:14'),
(10, 2, 3, 'cccc', '2025-06-18 23:58:26'),
(11, 2, 3, 'ccccccccccccccccccc', '2025-06-18 23:58:30'),
(12, 7, 3, 'bbbbbb', '2025-06-19 16:38:10'),
(13, 7, 3, 'ccccccc', '2025-06-19 16:38:12'),
(14, 7, 3, 'ccccccccc', '2025-06-19 16:38:14'),
(17, 24, 16, 'hola', '2026-05-20 18:12:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tweets`
--

CREATE TABLE `tweets` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `texto` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tweets`
--

INSERT INTO `tweets` (`id`, `usuario_id`, `texto`, `fecha_creacion`) VALUES
(1, 3, 'hola', '2025-06-17 11:57:24'),
(2, 3, 'tonto', '2025-06-17 12:40:43'),
(3, 3, 'hhh', '2025-06-18 23:22:53'),
(4, 3, 'ccccccccccc', '2025-06-19 14:55:34'),
(5, 3, 'ccccccccccc', '2025-06-19 14:55:36'),
(6, 3, 'cccccccccccccc', '2025-06-19 14:55:38'),
(7, 3, 'cccccccc', '2025-06-19 14:56:28'),
(24, 16, 'hola', '2026-05-20 18:12:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contrasena` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `conectado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contrasena`, `avatar`, `fecha_registro`, `conectado`) VALUES
(3, 'pablo', 'pabloliegar@gmail.com', '$2b$10$IgU9FKUi4.BlAAkuJ9npr.J5bE/ZKLFduYQfZQdJ/xAyyZ7shUbWe', '', '2025-06-08 19:59:17', 0),
(14, 'pablo3', 'pablo@gmail.com', '$2b$10$WDds/1ptEqk/Dp6IeIOCIOfE9wXN2oxRr5n97fk0j0R2N05oMDJQ6', '', '2026-05-17 11:08:45', 1),
(15, 'Pr', '', '$2b$10$y55Ae0L6Bd34wTvvgrhs5OAXyzArlednB0seEqcYJwt0.qMOlUx32', '', '2026-05-20 18:10:14', 0),
(16, 'prueba', 'prueba@gmail.com', '$2b$10$KW6iLx1ptpOM.vtKrxlh9uz4sYwhYJVcU1RV7FURba8Z/UuvFj6Ga', '', '2026-05-20 18:10:29', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tweet_id` (`tweet_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `tweets`
--
ALTER TABLE `tweets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD UNIQUE KEY `nombre` (`nombre`) USING HASH;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `tweets`
--
ALTER TABLE `tweets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tweets`
--
ALTER TABLE `tweets`
  ADD CONSTRAINT `tweets_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
