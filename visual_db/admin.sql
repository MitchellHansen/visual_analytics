CREATE DATABASE  IF NOT EXISTS `visual` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `visual`;


DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'elliottwalsh94@gmail.com','password'),(2,'mitchellhansen3@gmail.com','password');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
