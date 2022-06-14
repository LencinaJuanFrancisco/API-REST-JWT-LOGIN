CREATE DATABASE  IF NOT EXISTS `trabajofinal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trabajofinal`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: trabajofinal
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `title` varchar(124) DEFAULT NULL,
  `body` text,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (72,2,'Lorem','Lorem ipsum dolor sit amet, consectetur adipiscing elit '),(73,2,'Vivamus sodales','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales massa eu ante porta luctus. Aliquam'),(74,2,' Aliquam ultricies','Aliquam ultricies risus mauris, suscipit interdum diam sagittis id. Praesent rutrum pellentesque lorem ut pulvinar. Phasellus aliquam condimentum eu.'),(75,2,'Phasellus aliquam','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales massa eu ante porta luctus. Aliquam ultricies risus mauris, suscipit interdum diam sagittis id. Praesent rutrum pellentesque lorem ut pulvinar'),(76,2,'Praesent rutrum','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales massa eu ante porta luctus. '),(77,2,'Lorem ipsum','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales massa eu ante porta luctus. Aliquam ultricies risus mauris, suscipit interdum diam sagittis id. Praesent rutrum pellentesque lorem ut pulvinar. Phasellus aliquam condimentum eu.'),(78,2,'Lorem ipsum dolor sit amet,','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales massa eu ante porta luctus.'),(79,2,'luctus Aliquam','Praesent rutrum pellentesque lorem ut pulvinar. Phasellus aliquam condimentum eu.');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'JuanPaBlo','juanpa@admin.com','$2b$10$.GVen0aKqDOzi9lgNfwCXuNMM1EAoaOdTORdX7viJHi0IRIIMsBUm','http://localhost:3000/server/file_1655225068111.jpg'),(3,'uno','uno@uno.com','$2b$10$iC8Vh2VqMHjID7GpamhaDeG3Df/Y5JaeoaQ7vqwIjOmcfioJKnL5C','http://localhost:3001/file_1654296220332.jpg'),(4,'juan ignacio lencina','juan@gmail.mxsja.lkl','$2b$10$PTBZfVZCs.VD1xQBQTJ10u0hbEJhDGkm60EDu3T9waXp1uR0ynGyy','http://localhost/file_1654353885546.jpg'),(5,'pepito','otravez@pepito.com','$2b$10$.UUpJgS8q/rlBZBETXZo/.HkNlw1I.E0/Oo/NoIz537Y6en8uL5Oq','http://localhost/file_1654371551979.jpg'),(6,'dos','dos@dos.dos','$2b$10$HHTZcPARxaP6hZN3Wwyo/unGz6ls5ctIzA9l6AjH7dliGdCUsmgEa','http://localhost/file_1654373239073.jpg'),(7,'soy el Uno','uno@uno.uno','$2b$10$4w.MJvBqUthhruMoukzEeetgfNurrmZIzoKUX3yhX.prWAhz/Rive','[object Object]'),(8,'silvo','silvio@uno.uno','$2b$10$yYiYfPuSzq.ZsMWJGwJETOj2ECmqw0qCoX26eMk9e4S6e6pRv8Ujy','http://localhost/file_1654692562143.jpg'),(10,'Carlos Alberto Gimenez','cag@uno.uno','$2b$10$73WclJVXkTpTW//xkBp1U..6if6blsdqzEj7Tob4wdaca7vyOdqJW','http://localhost/file_1654692597600.jpg'),(109,'hola','upadreno@uno.uno','$2b$10$VF1uZxibD.l0v3CLbtB31OTNWjWpciEj.1EpI2ydqhu8Ps3i1wZO2','http://localhost:3001/file_1655204937399.jpeg'),(110,'el uno','eluno@uno.uno','$2b$10$EH0XE2EBRsEuqEI0TebimeOlgPOnhiRLrGpZGWk/.744DLMf8lHju','[object Object]');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-14 15:36:06
