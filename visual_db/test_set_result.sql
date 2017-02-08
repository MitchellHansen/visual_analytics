CREATE DATABASE  IF NOT EXISTS `visual` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `visual`;

DROP TABLE IF EXISTS `test_set_result`;

CREATE TABLE test_set_result (
  test_set_id int(11) NOT NULL AUTO_INCREMENT,
  app_user_id int(11) NOT NULL,
  status int(11) NOT NULL,
  result int(11) DEFAULT NULL,
  time int(11) DEFAULT NULL,
  PRIMARY KEY (test_set_id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


LOCK TABLES `test_set_result` WRITE;
INSERT INTO test_set_result VALUES (1,1,3,92,45);
UNLOCK TABLES;
