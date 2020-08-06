-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `med`;
CREATE DATABASE `med` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `med`;

DROP TABLE IF EXISTS `RECORD`;
CREATE TABLE `RECORD` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `doctor_id` int unsigned NOT NULL,
  `date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `complaint` text NOT NULL,
  `fio` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `RECORD` (`id`, `user_id`, `doctor_id`, `date`, `complaint`, `fio`) VALUES
(2,	7,	1,	'2020-08-05 09:30:00',	'Болит голова',	'Федосеев Пантелей Павлович'),
(3,	7,	1,	'2020-08-05 12:00:00',	'Болит Макушка',	'Миронов Орест Андреевич'),
(4,	13,	1,	'2020-08-05 10:00:00',	'голова',	'Романов Максимилиан Геласьевич'),
(6,	14,	1,	'2020-08-05 16:00:00',	'голова',	'Коновалов Семен Оскарович'),
(7,	14,	1,	'2020-08-05 18:00:00',	'голова',	'Попов Вадим Тимурович'),
(19,	16,	2,	'2020-08-05 09:30:00',	'dffdggsdf',	'Зайцев Аверьян Эдуардович'),
(20,	16,	2,	'2020-08-06 12:00:00',	'fdgsg',	'Аксёнов Казимир Альвианович'),
(24,	16,	2,	'2020-08-06 09:00:00',	'',	'Яковлев иван Сергеевич'),
(27,	16,	2,	'2020-08-06 09:30:00',	'',	'Фомичёв Мирон Вадимович'),
(28,	16,	2,	'2020-08-06 10:00:00',	'',	'Фомичёв Мирон Вадимович'),
(29,	16,	2,	'2020-08-06 12:30:00',	'',	'Фомичёв Мирон Вадимович'),
(30,	16,	2,	'2020-08-06 13:30:00',	'',	'Фомичёв Мирон Вадимович'),
(31,	16,	2,	'2020-08-06 10:30:00',	'',	'Аксёнов Казимир Альвианович'),
(38,	16,	1,	'2020-08-06 09:30:00',	'test',	'Яковлев иван Сергеевич'),
(39,	16,	6,	'2020-08-06 12:30:00',	'sdffa',	'Аксёнов Казимир Альвианович'),
(40,	16,	6,	'2020-08-06 10:30:00',	'sdffa',	'Аксёнов Казимир Альвианович');

DROP TABLE IF EXISTS `USER`;
CREATE TABLE `USER` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `surname` char(255) NOT NULL,
  `second_name` char(255) NOT NULL,
  `group_id` int unsigned NOT NULL,
  `session_id` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `USER` (`id`, `name`, `surname`, `second_name`, `group_id`, `session_id`) VALUES
(1,	'Борис',	'Школвский',	'Елизарович',	2,	''),
(2,	'Тамара',	'Воронова',	'Ильевна',	2,	''),
(3,	'Лилия',	'Барсова',	'Олеговна',	2,	''),
(4,	'Валерий',	'Крючков',	'Филиппович',	2,	''),
(7,	'Мифодий',	'Сидоров',	'Инокентиивич',	1,	''),
(12,	'Иван',	'Яковлев',	'Сергеевич',	1,	'JjPzSy_lIrjMgEqoYpOWBd6XVqMAdYg2'),
(13,	'Иван',	'Яковлев',	'Сергеевич',	1,	'BOcOeoMNvqO0IgIVNhoTElp4dHZZK7Dv'),
(14,	'Иван',	'Яковлев',	'Сергеевич',	1,	'bdMiyqd_18yj_QumX4hojnyZswQTozXN'),
(15,	'аноним',	'аноним',	'аноним',	1,	'ODtaUU8lkktmMNfJw4297n4VO4wQibYq'),
(16,	'аноним',	'аноним',	'аноним',	1,	'GrNXSZ0zJDfPUUtMlOw-GyBUxMRNk9rc');

DROP TABLE IF EXISTS `USER_GROUP`;
CREATE TABLE `USER_GROUP` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `USER_GROUP` (`id`, `name`) VALUES
(1,	'пациент'),
(2,	'врач');

-- 2020-08-06 16:46:55