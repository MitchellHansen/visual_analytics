CREATE DATABASE  IF NOT EXISTS `visual` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `visual`;

DROP TABLE IF EXISTS `test_set_result`;

CREATE TABLE test_set_result (
  template_id TEXT NOT NULL,
  login_uuid TEXT NOT NULL,
  result TEXT DEFAULT NULL,
  time TEXT DEFAULT NULL,
  selected_point TEXT DEFAULT NULL,
  class TEXT DEFAULT NULL,
  data_points TEXT DEFAULT NULL,
) 


LOCK TABLES `test_set_result` WRITE;
INSERT INTO test_set_result VALUES (1,1,3,92,45);
UNLOCK TABLES;
