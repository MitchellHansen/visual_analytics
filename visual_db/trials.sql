CREATE DATABASE  IF NOT EXISTS `visual` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `visual`;


DROP TABLE IF EXISTS `trials`;
CREATE TABLE `trials` (
  `test_set_id` int(11) NOT NULL AUTO_INCREMENT,
  `app_user_id` int(11) NOT NULL,
  PRIMARY KEY (`test_set_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trials` WRITE;
INSERT INTO `trials` VALUES (1,1);
UNLOCK TABLES;
