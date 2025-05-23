USE gestor_horaris;

-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: gestor_horaris
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `entrades_sortides`
--

DROP TABLE IF EXISTS `entrades_sortides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrades_sortides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuari_id` int DEFAULT NULL,
  `data` date NOT NULL,
  `hora_entrada` timestamp NULL DEFAULT NULL,
  `hora_sortida` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuari_id` (`usuari_id`),
  CONSTRAINT `entrades_sortides_ibfk_1` FOREIGN KEY (`usuari_id`) REFERENCES `usuaris` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrades_sortides`
--

LOCK TABLES `entrades_sortides` WRITE;
/*!40000 ALTER TABLE `entrades_sortides` DISABLE KEYS */;
INSERT INTO `entrades_sortides` VALUES (1,3,'2025-03-12','2025-03-12 17:46:02',NULL),(2,3,'2025-03-12',NULL,'2025-03-12 17:46:20'),(3,6,'2025-03-24','2025-03-24 15:23:23',NULL),(4,6,'2025-03-24',NULL,'2025-03-24 15:24:46'),(5,6,'2025-03-27','2025-03-27 14:41:11',NULL),(6,6,'2025-03-27',NULL,'2025-03-27 14:41:40'),(7,3,'2025-03-31','2025-03-31 13:46:51',NULL),(8,3,'2025-03-31',NULL,'2025-03-31 13:53:08'),(9,3,'2025-04-03','2025-04-03 15:38:23',NULL),(10,3,'2025-04-03',NULL,'2025-04-03 15:39:31'),(11,3,'2025-04-04','2025-04-04 14:22:57',NULL),(12,3,'2025-04-04',NULL,'2025-04-04 14:24:17'),(13,3,'2025-04-08','2025-04-08 18:20:25',NULL),(14,3,'2025-04-08',NULL,'2025-04-08 18:21:17'),(15,3,'2025-04-08','2025-04-08 18:21:19',NULL),(16,3,'2025-04-08',NULL,'2025-04-08 18:22:01'),(17,3,'2025-04-08','2025-04-08 18:24:17',NULL),(18,3,'2025-04-08',NULL,'2025-04-08 18:26:28'),(19,3,'2025-04-08','2025-04-08 18:26:47',NULL),(20,3,'2025-04-08',NULL,'2025-04-08 18:26:53'),(21,3,'2025-04-08','2025-04-08 18:27:30',NULL),(22,3,'2025-04-08',NULL,'2025-04-08 18:27:59'),(23,3,'2025-04-08','2025-04-08 18:28:41',NULL),(24,3,'2025-04-08',NULL,'2025-04-08 18:29:06'),(50,3,'2025-04-21','2025-04-21 18:20:34',NULL),(51,3,'2025-04-21',NULL,'2025-04-21 18:20:42'),(52,6,'2025-04-24','2025-04-24 14:04:38',NULL),(53,6,'2025-04-24',NULL,'2025-04-24 14:05:21');
/*!40000 ALTER TABLE `entrades_sortides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `festius`
--

DROP TABLE IF EXISTS `festius`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `festius` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `nom` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `festius`
--

LOCK TABLES `festius` WRITE;
/*!40000 ALTER TABLE `festius` DISABLE KEYS */;
/*!40000 ALTER TABLE `festius` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horari_dies`
--

DROP TABLE IF EXISTS `horari_dies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horari_dies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `horari_id` int NOT NULL,
  `dia` date NOT NULL,
  `hora_inici` time NOT NULL,
  `hora_fi` time NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `horari_id` (`horari_id`,`dia`),
  CONSTRAINT `horari_dies_ibfk_1` FOREIGN KEY (`horari_id`) REFERENCES `horaris` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horari_dies`
--

LOCK TABLES `horari_dies` WRITE;
/*!40000 ALTER TABLE `horari_dies` DISABLE KEYS */;
/*!40000 ALTER TABLE `horari_dies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horaris`
--

DROP TABLE IF EXISTS `horaris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horaris` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuari_id` int DEFAULT NULL,
  `data_inici` date NOT NULL,
  `data_fi` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuari_id` (`usuari_id`),
  CONSTRAINT `horaris_ibfk_1` FOREIGN KEY (`usuari_id`) REFERENCES `usuaris` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horaris`
--

LOCK TABLES `horaris` WRITE;
/*!40000 ALTER TABLE `horaris` DISABLE KEYS */;
/*!40000 ALTER TABLE `horaris` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuari_id` int NOT NULL,
  `accio` varchar(255) NOT NULL,
  `descripcio` text,
  `data_accio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuari_id` (`usuari_id`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`usuari_id`) REFERENCES `usuaris` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,6,'Sol·licitud de vacances','Sol·licitud creada per usuari 6 del 2025-03-29 al 2025-03-30','2025-03-27 18:12:05');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuari_id` int DEFAULT NULL,
  `data_generacio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `format` enum('PDF','Excel') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuari_id` (`usuari_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`usuari_id`) REFERENCES `usuaris` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,3,'2025-03-12 17:47:01','PDF'),(2,3,'2025-03-13 16:23:40','PDF');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'Administrador'),(2,'Treballador');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasques`
--

DROP TABLE IF EXISTS `tasques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasques` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuari_id` int NOT NULL,
  `data` date NOT NULL,
  `descripcio` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `completada` tinyint(1) DEFAULT '0',
  `hora_inici` time DEFAULT NULL,
  `hora_fi` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuari_id` (`usuari_id`),
  CONSTRAINT `tasques_ibfk_1` FOREIGN KEY (`usuari_id`) REFERENCES `usuaris` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasques`
--

LOCK TABLES `tasques` WRITE;
/*!40000 ALTER TABLE `tasques` DISABLE KEYS */;
INSERT INTO `tasques` VALUES (33,3,'2025-04-25','Tasca de Node per fer.','2025-04-24 15:30:54','2025-04-25 15:23:29',0,'11:30:00','13:30:00'),(34,3,'2025-04-10','Tasca Node','2025-04-24 15:31:28','2025-04-24 15:31:30',1,'13:31:00','15:31:00');
/*!40000 ALTER TABLE `tasques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuaris`
--

DROP TABLE IF EXISTS `usuaris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuaris` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `cognoms` varchar(255) NOT NULL,
  `correu` varchar(100) NOT NULL,
  `contrasenya` varchar(255) NOT NULL,
  `rol_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correu` (`correu`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuaris_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuaris`
--

LOCK TABLES `usuaris` WRITE;
/*!40000 ALTER TABLE `usuaris` DISABLE KEYS */;
INSERT INTO `usuaris` VALUES (1,'Joan','Llobet','joan@example.com','$2b$10$PIDOS4v4FkJtalyPrKV3qO6Su.1C0qYcT3czoTT3YrykiTVySVufq',2),(3,'Admin','Secret','admin@example.com','$2b$10$Ws1r4FVh1BEIXSHaqGkWM.4Ju6BIneOLEFZKFYR8gOF5ZuEBCttsq',1),(4,'prova','','prova@gmail.com','$2b$10$uEKYgWGGuquYRtlwOHxTqO9SFgl.hF5wIYIF5CHmpui08tGMTjLPS',2),(6,'Treballador 1','','treballador1@gmail.com','$2b$10$o7bx4Um1DkRl0Z.ZHdlIEey9CeVywzUmlnOSxfWKe.QIPv2qWYBim',2),(7,'Treballador 2','','treballador2@gmail.com','$2b$10$1zZe54D9vuc483YU8KorxuFNhjpPA9VlccCRnc1n/6ApsbcmF4YKi',2),(8,'Bachir','Mejor','bachir@gmail.com','$2b$10$9Vhe1cOqSGcJNmh3cnKNh.mtGcRGXxYG1KjlDbLlZU8jSf0wvMTJm',2);
/*!40000 ALTER TABLE `usuaris` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacances`
--

DROP TABLE IF EXISTS `vacances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuari_id` int NOT NULL,
  `data_inici` date NOT NULL,
  `data_fi` date NOT NULL,
  `estat` enum('pendent','aprovat','rebutjat') DEFAULT 'pendent',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `notificat` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `usuari_id` (`usuari_id`),
  CONSTRAINT `vacances_ibfk_1` FOREIGN KEY (`usuari_id`) REFERENCES `usuaris` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacances`
--

LOCK TABLES `vacances` WRITE;
/*!40000 ALTER TABLE `vacances` DISABLE KEYS */;
INSERT INTO `vacances` VALUES (1,6,'2025-03-29','2025-03-30','pendent','2025-03-27 18:12:05','2025-03-27 18:12:05',0);
/*!40000 ALTER TABLE `vacances` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-09 15:52:58
