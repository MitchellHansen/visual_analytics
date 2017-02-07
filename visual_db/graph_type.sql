CREATE DATABASE  IF NOT EXISTS `visual` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `visual`;

DROP TABLE IF EXISTS `graph_type`;

CREATE TABLE `graph_type` (
  `graph_type_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`graph_type_id`)
/*Add data points*/
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES `graph_type` WRITE;

UNLOCK TABLES;
