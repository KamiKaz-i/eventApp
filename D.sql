-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: lockedin
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organizer_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `total_tickets` int NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `type` enum('Concert','Gallery','Theatre','Cinema','Other') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `organizer_id` (`organizer_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (14,5,'Galeria 120','long description long description  long description  long description  long description  long description  long description  long description  long description ',1000,'2025-08-11 11:58:32','2025-04-06 19:10:22','Theatre'),(15,5,'Koncert Madzi','Koncert Madzi',1000,'2025-04-08 08:09:40','2025-04-06 19:11:43','Concert'),(16,5,'Absolute Cinema Madzi','Absolute Cinema Madzi',1000,'2025-03-08 23:00:00','2025-04-06 19:11:58','Cinema'),(17,6,'Other Franka','Other Franka',1880,'2025-04-06 19:12:42','2025-04-06 19:13:09','Other'),(18,6,'Cinema Franka','Cinema Franka',888,'2025-04-06 19:13:12','2025-04-06 19:13:47','Cinema'),(19,7,'Teatr Carlito','Teatr Carlito',996,'2025-08-20 14:56:25','2025-04-06 19:14:40','Theatre'),(20,7,'Koncert Carlito','Koncert Carlito',777,'2025-04-06 19:14:16','2025-04-06 19:15:10','Concert'),(21,7,'test','test',10,'2025-04-08 07:58:53','2025-04-08 07:59:01','Cinema'),(23,5,'123','123',500,'2025-06-11 22:00:00','2025-04-08 14:19:31','Concert'),(24,7,'','',1,'2025-08-09 08:30:19','2025-08-09 08:32:55','Gallery'),(29,7,'test1','123',123,'2025-02-11 23:00:00','2025-08-09 11:52:19','Theatre'),(30,7,'qwe','qwe',1234,'2025-01-17 23:00:00','2025-08-09 11:53:55','Theatre'),(31,7,'ghfn','dfg',312,'2025-06-08 22:00:00','2025-08-09 11:56:04','Gallery'),(32,7,'test2','tesr',123,'2025-08-08 22:00:00','2025-08-09 12:00:17','Gallery'),(33,7,'asddsa','asdsadas',12,'2025-08-17 22:00:00','2025-08-09 15:40:43','Gallery'),(34,7,'Bongcloud','Opener',12,'2025-08-19 22:00:00','2025-08-10 18:58:27','Cinema'),(35,7,'tesc','tesc',4,'2025-08-21 22:00:00','2025-08-11 11:57:58','Gallery'),(36,7,'resc','resc',56,'2025-08-15 22:00:00','2025-08-11 11:58:25','Theatre'),(37,7,'fasddas','dasdas',42,'2025-08-12 22:00:00','2025-08-11 12:01:50','Cinema'),(38,7,'ggfd','asdas',4,'2025-08-12 22:00:00','2025-08-11 20:41:49','Concert'),(41,7,'asdasdas','12312',12,'2025-08-21 22:00:00','2025-08-13 19:45:36','Cinema'),(42,7,'d','d',2,'2025-08-19 22:00:00','2025-08-15 09:04:15','Other'),(43,7,'t','t',2,'2025-08-20 22:00:00','2025-08-15 09:13:51','Cinema'),(44,7,'2','2',2,'2025-08-19 22:00:00','2025-08-15 09:16:25','Theatre'),(45,7,'B','d',5,'2025-08-18 22:00:00','2025-08-15 09:17:49','Theatre'),(47,7,'DB','d',2,'2026-08-17 22:00:00','2025-08-15 11:07:30','Theatre'),(48,19,'Tescik','TEST',16,'2025-08-19 22:00:00','2025-08-15 13:01:19','Gallery');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_tickets`
--

DROP TABLE IF EXISTS `order_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `ticket_id` int NOT NULL,
  `quantity` int NOT NULL,
  `subtotal_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id_idx` (`order_id`),
  KEY `ticket_id_idx` (`ticket_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `ticket_id` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=352 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_tickets`
--

LOCK TABLES `order_tickets` WRITE;
/*!40000 ALTER TABLE `order_tickets` DISABLE KEYS */;
INSERT INTO `order_tickets` VALUES (201,93,15,5,81.20),(202,93,16,4,94.80),(208,97,13,3,361.20),(209,97,15,5,81.20),(214,101,20,10,120.00),(215,102,16,5,118.50),(216,102,18,4,1892.40),(222,108,16,22,521.40),(223,108,18,10,4731.00),(224,109,19,9,6993.00),(225,110,19,8,6216.00),(226,111,19,10,7770.00),(227,112,19,10,7770.00),(228,113,19,10,7770.00),(229,114,19,10,7770.00),(230,115,19,10,7770.00),(231,116,16,1,23.70),(232,117,17,1,77.00),(233,118,19,10,7770.00),(234,119,19,10,7770.00),(235,120,19,9,6993.00),(236,121,19,10,7770.00),(237,122,18,1,473.10),(238,123,16,1,23.70),(239,123,17,1,77.00),(240,123,18,1,473.10),(243,125,16,3,71.10),(244,125,18,2,946.20),(245,126,22,4,200.00),(246,126,15,5,81.20),(248,128,14,3,192.00),(249,128,19,1,777.00),(250,129,14,4,256.00),(256,131,13,2,240.80),(257,131,14,1,64.00),(264,135,13,2,240.80),(265,135,14,2,128.00),(310,177,13,5,603.40),(314,180,13,1,120.68),(317,182,14,16,1024.00),(321,184,14,1,64.00),(337,198,13,2,241.36),(341,201,13,1,120.68),(345,204,13,1,120.68),(350,209,13,1,120.68),(351,210,13,1,120.68);
/*!40000 ALTER TABLE `order_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('pending','paid','canceled') NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `user_id_idx_orders` (`user_id`),
  CONSTRAINT `user_id_orders` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (93,7,176.00,'paid','2025-04-06 19:15:44'),(97,7,442.40,'paid','2025-04-07 12:38:33'),(101,5,120.00,'paid','2025-04-08 07:59:22'),(102,5,2010.90,'paid','2025-04-08 08:13:48'),(108,5,5252.40,'paid','2025-04-08 10:16:04'),(109,5,6993.00,'paid','2025-04-08 10:21:10'),(110,5,6216.00,'paid','2025-04-08 10:21:34'),(111,5,7770.00,'paid','2025-04-08 10:25:19'),(112,5,7770.00,'paid','2025-04-08 10:27:14'),(113,5,7770.00,'paid','2025-04-08 10:29:01'),(114,5,7770.00,'paid','2025-04-08 10:32:54'),(115,5,7770.00,'paid','2025-04-08 10:38:02'),(116,5,23.70,'paid','2025-04-08 10:39:22'),(117,5,77.00,'paid','2025-04-08 10:39:44'),(118,5,7770.00,'paid','2025-04-08 10:40:43'),(119,5,7770.00,'paid','2025-04-08 10:42:50'),(120,5,6993.00,'paid','2025-04-08 10:44:52'),(121,5,7770.00,'paid','2025-04-08 10:46:10'),(122,5,473.10,'paid','2025-04-08 11:15:19'),(123,5,573.80,'paid','2025-04-08 11:15:49'),(125,5,1017.30,'pending','2025-04-08 14:18:05'),(126,6,281.20,'paid','2025-04-08 14:20:06'),(128,6,969.00,'paid','2025-04-08 14:22:07'),(129,7,256.00,'paid','2025-04-19 15:56:25'),(131,7,304.80,'paid','2025-08-05 11:27:20'),(135,8,368.80,'pending','2025-08-10 17:53:22'),(177,7,603.40,'paid','2025-08-11 20:41:22'),(180,14,120.68,'pending','2025-08-12 14:54:58'),(182,7,1024.00,'paid','2025-08-13 17:48:00'),(184,7,64.00,'paid','2025-08-13 18:44:46'),(198,7,241.36,'paid','2025-08-14 08:32:05'),(201,7,120.68,'paid','2025-08-14 08:42:16'),(204,7,120.68,'paid','2025-08-14 10:09:29'),(209,19,120.68,'pending','2025-08-15 13:00:48'),(210,7,120.68,'pending','2025-08-18 17:15:24');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `wallet_transaction_id` int NOT NULL,
  `method` enum('wallet') NOT NULL,
  `status` enum('pending','paid','canceled') NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (38,93,295,'wallet','paid','2025-04-06 19:16:13'),(39,97,302,'wallet','paid','2025-04-07 12:39:29'),(40,101,307,'wallet','paid','2025-04-08 07:59:41'),(41,102,319,'wallet','paid','2025-04-08 08:15:13'),(42,108,323,'wallet','paid','2025-04-08 10:21:01'),(43,109,326,'wallet','paid','2025-04-08 10:21:14'),(44,110,328,'wallet','paid','2025-04-08 10:21:42'),(45,111,330,'wallet','paid','2025-04-08 10:25:58'),(46,112,332,'wallet','paid','2025-04-08 10:27:18'),(47,113,334,'wallet','paid','2025-04-08 10:29:07'),(48,114,336,'wallet','paid','2025-04-08 10:32:58'),(49,115,338,'wallet','paid','2025-04-08 10:38:07'),(50,116,340,'wallet','paid','2025-04-08 10:39:25'),(51,117,344,'wallet','paid','2025-04-08 10:39:46'),(52,118,346,'wallet','paid','2025-04-08 10:41:14'),(53,119,348,'wallet','paid','2025-04-08 10:43:47'),(54,120,350,'wallet','paid','2025-04-08 10:45:35'),(55,121,352,'wallet','paid','2025-04-08 10:49:20'),(56,122,356,'wallet','paid','2025-04-08 11:15:23'),(57,123,359,'wallet','paid','2025-04-08 11:17:24'),(58,126,367,'wallet','paid','2025-04-08 14:20:31'),(59,128,370,'wallet','paid','2025-04-08 14:22:45'),(60,129,374,'wallet','paid','2025-04-19 16:00:02'),(61,131,376,'wallet','paid','2025-08-05 11:51:29'),(62,177,380,'wallet','paid','2025-08-11 20:45:45'),(63,182,402,'wallet','paid','2025-08-13 17:59:17'),(64,184,404,'wallet','paid','2025-08-13 19:10:40'),(65,198,406,'wallet','paid','2025-08-14 08:32:10'),(66,201,408,'wallet','paid','2025-08-14 08:44:25'),(67,204,410,'wallet','paid','2025-08-14 10:10:40');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity_available` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id_idx` (`event_id`),
  CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (13,14,120.68,986),(14,15,64.00,975),(15,16,16.24,985),(16,17,23.70,1847),(17,18,77.00,886),(18,19,102.00,980),(19,20,777.00,670),(20,21,12.00,0),(22,23,50.00,496),(23,24,1.00,1),(24,29,2.00,123),(25,30,123.00,1234),(26,31,131.00,312),(27,32,323.00,123),(28,33,23.00,12),(29,34,12.00,12),(30,35,4.00,4),(31,36,5.00,56),(32,37,42.00,42),(33,38,4.00,4),(34,41,14.00,12),(35,42,2.00,2),(36,43,2.00,2),(37,44,3.00,2),(38,45,5.00,5),(39,47,2.00,2),(40,48,14.00,16);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isFirstLogin` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'madzia','$2b$10$9sYVcMJia9z1IkLki6/XI.b5oGMdq4He3u5pNKeb9z1UGaG3qduiC',0),(6,'Franek','$2b$10$jf7MV4DDQXyOPQIxTAeUh.6zRuBpZ0ZyIU3T/bS6wyIe8ZTEQEhHi',0),(7,'Carlito','$2b$10$FOFa0TgB9GgO5oCKX6m1bOk0NTb0AfwQRvHqNdgi/hxutxtYwW3NS',0),(8,'Bong','$2b$10$kx3G28UIn6TdqNqpaziaRe.TRvEO4FE3kZMrfTYpAh.2rIQJeNS3K',0),(9,'test4','$2b$10$ytG3tCFxg5QjcM2uVXET0ev/sHPEIARro8oEk.KGJaA2ztRKkk/oa',1),(10,'bam','$2b$10$8/agU.od19ZlZk5t71r9S.p.eCB3taS6eSYcD6ws1su2MxplUzzmy',1),(11,'carlito1','$2b$10$SXPltMPz7FYKNn/uuCJ7QOYAs7ug9f2atXbVBwXMoEeQ.AKKrbFSa',1),(12,'Lolek','$2b$10$ZCTtjme6VYifIoPNkcgDKOwiTDImnF6uWisbCWMQ.NJOUEDXPA.1u',1),(13,'carlito2','$2b$10$dMSZA.g86QJ8n2R2BoCB1e82yXubT71vdE8FaAtIkkTC/mQHhCYB2',1),(14,'bambo','$2b$10$ytsAccOqwfhMNb9SnjElBO4EJo9E4RFBNqdl8A4y8Q.FsDTwuiLpS',1),(18,'bambo1','$2b$10$SqRMcDXw83g5aTvrNsRE4OZ9BbqeRbATAELNe2QSVxTXlIfAQSU2q',1),(19,'Bombaj','$2b$10$QX6BBAvy52ni.A7ilAd5kumAeWKGuC.FAIkcRuU/ttg6DoAxNBMke',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_transactions`
--

DROP TABLE IF EXISTS `wallet_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wallet_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_type` enum('purchase','deposit','withdraw','sell') NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `wallet_id_idx` (`wallet_id`),
  CONSTRAINT `wallet_id` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=413 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_transactions`
--

LOCK TABLES `wallet_transactions` WRITE;
/*!40000 ALTER TABLE `wallet_transactions` DISABLE KEYS */;
INSERT INTO `wallet_transactions` VALUES (294,7,10000.00,'deposit','2025-04-06 19:15:31'),(295,7,176.00,'purchase','2025-04-06 19:16:13'),(296,5,81.20,'sell','2025-04-06 19:16:13'),(297,6,94.80,'sell','2025-04-06 19:16:13'),(298,6,200.00,'deposit','2025-04-06 19:23:51'),(299,6,190.00,'deposit','2025-04-06 19:23:55'),(300,6,190.00,'withdraw','2025-04-06 19:23:58'),(301,6,190.00,'withdraw','2025-04-06 19:24:04'),(302,7,442.40,'purchase','2025-04-07 12:39:29'),(303,5,442.40,'sell','2025-04-07 12:39:29'),(304,7,1000.00,'withdraw','2025-04-07 12:40:50'),(305,7,1000.00,'deposit','2025-04-07 12:40:52'),(306,5,44.00,'deposit','2025-04-07 12:45:30'),(307,5,120.00,'purchase','2025-04-08 07:59:41'),(308,7,120.00,'sell','2025-04-08 07:59:41'),(309,5,8000.00,'deposit','2025-04-08 08:00:27'),(310,5,8000.00,'deposit','2025-04-08 08:04:16'),(311,5,8000.00,'withdraw','2025-04-08 08:04:19'),(312,5,8000.00,'deposit','2025-04-08 08:04:31'),(313,5,8000.00,'withdraw','2025-04-08 08:04:38'),(314,5,100.00,'deposit','2025-04-08 08:04:52'),(315,5,3000.00,'deposit','2025-04-08 08:05:22'),(316,5,3000.00,'withdraw','2025-04-08 08:05:25'),(317,5,3000.00,'withdraw','2025-04-08 08:05:41'),(318,5,3000.00,'deposit','2025-04-08 08:05:43'),(319,5,2010.90,'purchase','2025-04-08 08:15:13'),(320,6,118.50,'sell','2025-04-08 08:15:13'),(321,7,1892.40,'sell','2025-04-08 08:15:13'),(322,5,100.04,'deposit','2025-04-08 09:57:09'),(323,5,5252.40,'purchase','2025-04-08 10:21:01'),(324,6,521.40,'sell','2025-04-08 10:21:01'),(325,7,4731.00,'sell','2025-04-08 10:21:01'),(326,5,6993.00,'purchase','2025-04-08 10:21:14'),(327,7,6993.00,'sell','2025-04-08 10:21:14'),(328,5,6216.00,'purchase','2025-04-08 10:21:42'),(329,7,6216.00,'sell','2025-04-08 10:21:42'),(330,5,7770.00,'purchase','2025-04-08 10:25:58'),(331,7,7770.00,'sell','2025-04-08 10:25:58'),(332,5,7770.00,'purchase','2025-04-08 10:27:18'),(333,7,7770.00,'sell','2025-04-08 10:27:18'),(334,5,7770.00,'purchase','2025-04-08 10:29:07'),(335,7,7770.00,'sell','2025-04-08 10:29:07'),(336,5,7770.00,'purchase','2025-04-08 10:32:58'),(337,7,7770.00,'sell','2025-04-08 10:32:58'),(338,5,7770.00,'purchase','2025-04-08 10:38:07'),(339,7,7770.00,'sell','2025-04-08 10:38:07'),(340,5,23.70,'purchase','2025-04-08 10:39:25'),(341,6,23.70,'sell','2025-04-08 10:39:25'),(342,5,200.00,'withdraw','2025-04-08 10:39:33'),(343,5,200.00,'deposit','2025-04-08 10:39:35'),(344,5,77.00,'purchase','2025-04-08 10:39:46'),(345,6,77.00,'sell','2025-04-08 10:39:46'),(346,5,7770.00,'purchase','2025-04-08 10:41:14'),(347,7,7770.00,'sell','2025-04-08 10:41:14'),(348,5,7770.00,'purchase','2025-04-08 10:43:47'),(349,7,7770.00,'sell','2025-04-08 10:43:47'),(350,5,6993.00,'purchase','2025-04-08 10:45:35'),(351,7,6993.00,'sell','2025-04-08 10:45:35'),(352,5,7770.00,'purchase','2025-04-08 10:49:20'),(353,7,7770.00,'sell','2025-04-08 10:49:20'),(354,5,8000.00,'deposit','2025-04-08 10:51:06'),(355,5,8000.00,'withdraw','2025-04-08 10:51:09'),(356,5,473.10,'purchase','2025-04-08 11:15:23'),(357,7,473.10,'sell','2025-04-08 11:15:23'),(358,5,43634.00,'deposit','2025-04-08 11:16:43'),(359,5,573.80,'purchase','2025-04-08 11:17:24'),(360,6,100.70,'sell','2025-04-08 11:17:24'),(361,7,473.10,'sell','2025-04-08 11:17:24'),(362,5,43584.74,'withdraw','2025-04-08 11:37:49'),(363,5,1000.00,'deposit','2025-04-08 11:37:53'),(364,7,100051.60,'withdraw','2025-04-08 11:38:19'),(365,7,1000.00,'deposit','2025-04-08 11:38:23'),(366,6,53.90,'deposit','2025-04-08 11:38:45'),(367,6,281.20,'purchase','2025-04-08 14:20:31'),(368,5,281.20,'sell','2025-04-08 14:20:31'),(369,6,400.00,'deposit','2025-04-08 14:22:33'),(370,6,969.00,'purchase','2025-04-08 14:22:45'),(371,5,192.00,'sell','2025-04-08 14:22:45'),(372,7,777.00,'sell','2025-04-08 14:22:45'),(373,7,4000.00,'deposit','2025-04-19 15:56:45'),(374,7,256.00,'purchase','2025-04-19 16:00:02'),(375,5,256.00,'sell','2025-04-19 16:00:02'),(376,7,304.80,'purchase','2025-08-05 11:51:29'),(377,5,304.80,'sell','2025-08-05 11:51:29'),(378,7,400.00,'deposit','2025-08-10 17:02:25'),(379,8,100.00,'deposit','2025-08-10 17:53:12'),(380,7,603.40,'purchase','2025-08-11 20:45:45'),(381,5,603.40,'sell','2025-08-11 20:45:45'),(382,7,100.00,'deposit','2025-08-13 17:42:27'),(383,7,100.00,'deposit','2025-08-13 17:42:30'),(384,7,100.00,'withdraw','2025-08-13 17:42:32'),(385,7,100.00,'withdraw','2025-08-13 17:42:33'),(402,7,1024.00,'purchase','2025-08-13 17:59:17'),(403,5,1024.00,'sell','2025-08-13 17:59:17'),(404,7,64.00,'purchase','2025-08-13 19:10:40'),(405,5,64.00,'sell','2025-08-13 19:10:40'),(406,7,241.36,'purchase','2025-08-14 08:32:10'),(407,5,241.36,'sell','2025-08-14 08:32:10'),(408,7,120.68,'purchase','2025-08-14 08:44:25'),(409,5,120.68,'sell','2025-08-14 08:44:25'),(410,7,120.68,'purchase','2025-08-14 10:10:40'),(411,5,120.68,'sell','2025-08-14 10:10:40'),(412,16,100.00,'deposit','2025-08-15 13:00:39');
/*!40000 ALTER TABLE `wallet_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
INSERT INTO `wallets` VALUES (5,5,4208.12,'2025-08-14 10:10:40'),(6,6,149.80,'2025-04-08 14:22:45'),(7,7,3442.08,'2025-08-14 10:10:40'),(8,8,100.00,'2025-08-10 17:53:12'),(9,9,0.00,'2025-08-10 18:31:03'),(10,10,0.00,'2025-08-10 18:35:29'),(11,11,0.00,'2025-08-10 18:44:47'),(12,12,0.00,'2025-08-11 07:59:25'),(13,13,0.00,'2025-08-12 14:50:07'),(14,14,0.00,'2025-08-12 14:51:07'),(15,18,0.00,'2025-08-12 15:05:48'),(16,19,100.00,'2025-08-15 13:00:39');
/*!40000 ALTER TABLE `wallets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-20 18:21:32
