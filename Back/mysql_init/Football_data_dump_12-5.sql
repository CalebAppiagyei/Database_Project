CREATE DATABASE  IF NOT EXISTS `football_data` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `football_data`;
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
FLUSH PRIVILEGES;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: football_data
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `coach`
--

DROP TABLE IF EXISTS `coach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coach` (
  `coach_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`coach_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coach`
--

LOCK TABLES `coach` WRITE;
/*!40000 ALTER TABLE `coach` DISABLE KEYS */;
INSERT INTO `coach` VALUES (1,'John','Doe'),(2,'Coach','Ryan'),(3,'Coach','Katelyn'),(4,'Coach','Johanna'),(5,'Coach','Caleb');
/*!40000 ALTER TABLE `coach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conference`
--

DROP TABLE IF EXISTS `conference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference` (
  `conference_id` int NOT NULL,
  `conference_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`conference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference`
--

LOCK TABLES `conference` WRITE;
/*!40000 ALTER TABLE `conference` DISABLE KEYS */;
INSERT INTO `conference` VALUES (1,'AFC'),(2,'NFC');
/*!40000 ALTER TABLE `conference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `game_id` int NOT NULL AUTO_INCREMENT,
  `year` int DEFAULT NULL,
  `team_away` int DEFAULT NULL,
  `team_home` int DEFAULT NULL,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (17,2021,5,17);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_stats`
--

DROP TABLE IF EXISTS `game_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_stats` (
  `game_id` int NOT NULL,
  `team_id` int NOT NULL,
  `total_yards` int DEFAULT '0',
  `total_tds` int DEFAULT '0',
  `total_fgs` int DEFAULT '0',
  `turnovers` int DEFAULT '0',
  PRIMARY KEY (`game_id`,`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_stats`
--

LOCK TABLES `game_stats` WRITE;
/*!40000 ALTER TABLE `game_stats` DISABLE KEYS */;
INSERT INTO `game_stats` VALUES (1,1,350,3,1,1),(1,2,280,2,0,2),(2,3,400,4,1,1),(2,4,290,2,2,0),(3,5,310,3,0,1);
/*!40000 ALTER TABLE `game_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `player_id` int NOT NULL AUTO_INCREMENT,
  `position_id` int DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `Team` varchar(45) DEFAULT NULL,
  `extra` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`player_id`)
) ENGINE=InnoDB AUTO_INCREMENT=628 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (3,5,'Chris Boswell','K','PIT','BoswCh00'),(4,5,'Younghoe Koo','K','ATL','KooxYo00'),(5,5,'Brandon Aubrey','K','DAL','AubrBr00'),(6,5,'Wil Lutz','K','DEN','LutzWi00'),(7,5,'Cameron Dicker','K','LAC','DickCa00'),(8,5,'Justin Tucker','K','BAL','TuckJu00'),(9,5,'Brayden Narveson','K','GNB','NarvBr00'),(10,5,'Daniel Carlson','K','LVR','CarlDa00'),(11,5,'Harrison Butker','K','KAN','ButkHa00'),(12,5,'Dustin Hopkins','K','CLE','HopkDu00'),(13,5,'Jason Sanders','K','MIA','SandJa00'),(14,5,'Greg Joseph','K','NYG','JoseGr00'),(15,5,'Tyler Bass','K','BUF','BassTy00'),(16,5,'Evan McPherson','K','CIN','McPhEv00'),(17,5,'Jason Myers','K','SEA','MyerJa00'),(18,5,'Greg Zuerlein','K','NYJ','ZuerGr00'),(19,5,'Chase McLaughlin','K','TAM','McLaCh00'),(20,5,'Blake Grupe','K','NOR','GrupBl00'),(21,5,'Will Reichard','K','MIN','ReicWi00'),(22,5,'Cam Little','K','JAX','LittCa00'),(23,5,'Matt Gay','K','IND','GayxMa00'),(24,5,'Jake Moody','K','SFO','MoodJa00'),(25,5,'Joey Slye','K','NWE','SlyeJo00'),(26,5,'Jake Bates','K','DET','BateJa00'),(27,5,'Jake Elliott','K','PHI','ElliJa03'),(28,5,'Joshua Karty','K','LAR','KartJo00'),(29,5,'Cairo Santos','K','CHI','SantCa01'),(30,5,'Eddy Pineiro','K','CAR','PineEd00'),(31,5,'Nick Folk','K','TEN','FolkNi20'),(32,5,'Chad Ryland','K','ARI','RylaCh00'),(33,5,'Matt Prater','K','ARI','PratMa20'),(34,5,'Anders Carlson','K','SFO','CarlAn00'),(35,5,'Brandon McManus','K','GNB','McMaBr01'),(36,5,'Matthew Wright','K','SFO','WrigMa00'),(37,5,'Cade York','K','WAS','YorkCa00'),(38,5,'Graham Gano','K','NYG','GanoGr44'),(39,5,'Mitch Wishnowsky','K','SFO','WishMi00'),(40,5,'Spencer Shrader','K','IND','ShraSp00'),(41,5,'Riley Patterson','K','NYJ','PattRi01'),(42,5,'Jamie Gillan','K','NYG','GillJa00'),(43,5,'Ethan Evans','K','LAR','EvanEt00'),(44,5,'Braden Mann','K','PHI','MannBr01'),(45,5,'Bradley Pinion','K','ATL','PiniBr00'),(46,5,'Jake Camarda','K','TAM','CamaJa00'),(47,5,'Trenton Gill','K','TAM','GillTr01'),(48,5,'Jake Bailey','K','MIA','BailJa00'),(49,5,'Logan Cooke','K','JAX','CookLo00'),(50,5,'Matthew Hayball','K','NOR','HaybMa00'),(51,5,'Johnny Hekker','K','CAR','HekkJo00'),(52,5,'Daniel Whelan','K','GNB','WhelDa00'),(53,5,'Ryan Wright','K','MIN','WrigRy00'),(54,2,'Derrick Henry','RB','BAL','HenrDe00'),(55,1,'Lamar Jackson','QB','BAL','JackLa00'),(56,1,'Baker Mayfield','QB','TAM','MayfBa00'),(57,3,'Ja\'Marr Chase','WR','CIN','ChasJa00'),(58,2,'Saquon Barkley','RB','PHI','BarkSa00'),(59,2,'Alvin Kamara','RB','NOR','KamaAl00'),(60,4,'George Kittle','TE','SFO','KittGe00'),(61,2,'Kyren Williams','RB','LAR','WillKy02'),(62,2,'Jahmyr Gibbs','RB','DET','GibbJa01'),(63,3,'Garrett Wilson','WR','NYJ','WilsGa00'),(64,2,'Joe Mixon','RB','HOU','MixoJo00'),(65,3,'Justin Jefferson','WR','MIN','JeffJu00'),(66,3,'Brian Thomas','WR','JAX','ThomBr06'),(67,1,'Jayden Daniels','QB','WAS','DaniJa02'),(68,2,'Bijan Robinson','RB','ATL','RobiBi01'),(69,2,'James Cook','RB','BUF','CookJa01'),(70,3,'Chris Godwin','WR','TAM','GodwCh00'),(71,1,'Josh Allen','QB','BUF','AlleJo02'),(72,3,'CeeDee Lamb','WR','DAL','LambCe00'),(73,3,'Jayden Reed','WR','GNB','ReedJa03'),(74,2,'Breece Hall','RB','NYJ','HallBr03'),(75,3,'Drake London','WR','ATL','LondDr00'),(76,2,'Josh Jacobs','RB','GNB','JacoJo01'),(77,2,'David Montgomery','RB','DET','MontDa01'),(78,3,'Terry McLaurin','WR','WAS','McLaTe00'),(79,4,'Tucker Kraft','TE','GNB','KrafTu00'),(80,2,'James Conner','RB','ARI','ConnJa00'),(81,1,'Joe Burrow','QB','CIN','BurrJo01'),(82,4,'Brock Bowers','TE','LVR','BoweBr01'),(83,1,'Jalen Hurts','QB','PHI','HurtJa00'),(84,3,'Stefon Diggs','WR','HOU','DiggSt00'),(85,3,'Amon-Ra St. Brown','WR','DET','StxxAm00'),(86,4,'Kyle Pitts','TE','ATL','PittKy00'),(87,3,'Nico Collins','WR','HOU','CollNi00'),(88,3,'Darnell Mooney','WR','ATL','MoonDa00'),(89,1,'Kyler Murray','QB','ARI','MurrKy00'),(90,1,'Brock Purdy','QB','SFO','PurdBr00'),(91,2,'Jordan Mason','RB','SFO','MasoJo00'),(92,2,'Kenneth Walker III','RB','SEA','WalkKe00'),(93,2,'Chuba Hubbard','RB','CAR','HubbCh01'),(94,2,'D\'Andre Swift','RB','CHI','SwifDA00'),(95,3,'Marvin Harrison Jr.','WR','ARI','HarrMa09'),(96,3,'Allen Lazard','WR','NYJ','LazaAl00'),(97,3,'D.K. Metcalf','WR','SEA','MetcDK00'),(98,2,'Brian Robinson Jr.','RB','WAS','RobiBr01'),(99,2,'Aaron Jones','RB','MIN','JoneAa00'),(100,3,'Mike Evans','WR','TAM','EvanMi00'),(101,3,'Malik Nabers','WR','NYG','NabeMa00'),(102,2,'Najee Harris','RB','PIT','HarrNa00'),(103,2,'J.K. Dobbins','RB','LAC','DobbJK00'),(104,4,'Trey McBride','TE','ARI','McBrTr01'),(105,4,'Cole Kmet','TE','CHI','KmetCo00'),(106,4,'Mark Andrews','TE','BAL','AndrMa00'),(107,4,'Cade Otton','TE','TAM','OttoCa00'),(108,1,'Aaron Rodgers','QB','NYJ','RodgAa00'),(109,2,'Jonathan Taylor','RB','IND','TaylJo02'),(110,3,'Zay Flowers','WR','BAL','FlowZa00'),(111,3,'Ladd McConkey','WR','LAC','McCoLa00'),(112,1,'Bo Nix','QB','DEN','NixxBo00'),(113,3,'Rashod Bateman','WR','BAL','BateRa00'),(114,4,'Isaiah Likely','TE','BAL','LikeIs00'),(115,1,'C.J. Stroud','QB','HOU','StroCJ00'),(116,3,'Rashid Shaheed','WR','NOR','ShahRa00'),(117,3,'Deebo Samuel','WR','SFO','SamuDe00'),(118,2,'De\'Von Achane','RB','MIA','AchaDe00'),(119,2,'Tony Pollard','RB','TEN','PollTo00'),(120,3,'A.J. Brown','WR','PHI','BrowAJ00'),(121,3,'Jauan Jennings','WR','SFO','JennJa00'),(122,3,'Xavier Worthy','WR','KAN','WortXa00'),(123,4,'Zach Ertz','TE','WAS','ErtzZa00'),(124,1,'Geno Smith','QB','SEA','SmitGe00'),(125,1,'Trevor Lawrence','QB','JAX','LawrTr00'),(126,1,'Kirk Cousins','QB','ATL','CousKi00'),(127,1,'Jared Goff','QB','DET','GoffJa00'),(128,1,'Sam Darnold','QB','MIN','DarnSa00'),(129,1,'Justin Fields','QB','PIT','FielJu00'),(130,1,'Jordan Love','QB','GNB','LoveJo03'),(131,1,'Caleb Williams','QB','CHI','WillCa03'),(132,1,'Dak Prescott','QB','DAL','PresDa01'),(133,1,'Patrick Mahomes','QB','KAN','MahoPa00'),(134,1,'Daniel Jones','QB','NYG','JoneDa05'),(135,1,'Justin Herbert','QB','LAC','HerbJu00'),(136,1,'Matthew Stafford','QB','LAR','StafMa00'),(137,2,'Tank Bigsby','RB','JAX','BigsTa00'),(138,1,'Deshaun Watson','QB','CLE','WatsDe00'),(139,2,'Rhamondre Stevenson','RB','NWE','StevRh00'),(140,2,'Chase Brown','RB','CIN','BrowCh10'),(141,1,'Derek Carr','QB','NOR','CarrDe02'),(142,2,'Bucky Irving','RB','TAM','IrviBu00'),(143,2,'Alexander Mattison','RB','LVR','MattAl01'),(144,2,'Zach Charbonnet','RB','SEA','CharZa00'),(145,1,'Anthony Richardson','QB','IND','RichAn03'),(146,2,'Rachaad White','RB','TAM','WhitRa01'),(147,1,'Gardner Minshew II','QB','LVR','MinsGa00'),(148,2,'Tyrone Tracy','RB','NYG','TracTy00'),(149,2,'Javonte Williams','RB','DEN','WillJa10'),(150,1,'Andy Dalton','QB','CAR','DaltAn00'),(151,2,'Kareem Hunt','RB','KAN','HuntKa00'),(152,2,'Zack Moss','RB','CIN','MossZa00'),(153,3,'Keon Coleman','WR','BUF','ColeKe02'),(154,3,'George Pickens','WR','PIT','PickGe00'),(155,3,'Alec Pierce','WR','IND','PierAl00'),(156,3,'DeVonta Smith','WR','PHI','SmitDe07'),(157,3,'Jameson Williams','WR','DET','WillJa11'),(158,1,'Joe Flacco','QB','IND','FlacJo00'),(159,3,'Khalil Shakir','WR','BUF','ShakKh00'),(160,3,'Josh Downs','WR','IND','DownJo00'),(161,3,'Diontae Johnson','WR','CAR','JohnDi01'),(162,1,'Drake Maye','QB','NWE','MayeDr00'),(163,3,'D.J. Moore','WR','CHI','MoorD.00'),(164,3,'Tee Higgins','WR','CIN','HiggTe00'),(165,3,'Tank Dell','WR','HOU','DellNa00'),(166,2,'Austin Ekeler','RB','WAS','EkelAu00'),(167,3,'Davante Adams','WR','2TM','AdamDa01'),(168,3,'Amari Cooper','WR','2TM','CoopAm00'),(169,3,'Romeo Doubs','WR','GNB','DoubRo00'),(170,2,'Rico Dowdle','RB','DAL','DowdRi01'),(171,2,'Tyler Allgeier','RB','ATL','AllgTy00'),(172,3,'Courtland Sutton','WR','DEN','SuttCo00'),(173,3,'Darius Slayton','WR','NYG','SlayDa01'),(174,3,'Jakobi Meyers','WR','LVR','MeyeJa01'),(175,3,'Michael Pittman Jr.','WR','IND','PittMi01'),(176,3,'Wan\'Dale Robinson','WR','NYG','RobiWa01'),(177,1,'Malik Willis','QB','GNB','WillMa12'),(178,3,'Tyreek Hill','WR','MIA','HillTy00'),(179,3,'Calvin Ridley','WR','TEN','RidlCa00'),(180,3,'Jaxon Smith-Njigba','WR','SEA','SmitJa06'),(181,2,'Braelon Allen','RB','NYJ','AlleBr05'),(182,1,'Jacoby Brissett','QB','NWE','BrisJa00'),(183,2,'Justice Hill','RB','BAL','HillJu00'),(184,3,'Tyler Lockett','WR','SEA','LockTy00'),(185,3,'Jalen Tolbert','WR','DAL','TolbJa00'),(186,3,'Calvin Austin III','WR','PIT','AustCa00'),(187,2,'Ray Davis','RB','BUF','DaviRa04'),(188,3,'Christian Kirk','WR','JAX','KirkCh01'),(189,3,'Michael Wilson','WR','ARI','WilsMi02'),(190,3,'Jerry Jeudy','WR','CLE','JeudJe00'),(191,3,'Chris Olave','WR','NOR','OlavCh00'),(192,3,'Dontayvion Wicks','WR','GNB','WickDo00'),(193,2,'Travis Etienne','RB','JAX','EtieTr00'),(194,4,'Hunter Henry','TE','NWE','HenrHu00'),(195,4,'Dalton Kincaid','TE','BUF','KincDa00'),(196,2,'Devin Singletary','RB','NYG','SingDe00'),(197,2,'Jerome Ford','RB','CLE','FordJe00'),(198,3,'Xavier Legette','WR','CAR','LegeXa00'),(199,3,'Rashee Rice','WR','KAN','RiceRa01'),(200,3,'Demarcus Robinson','WR','LAR','RobiDe01'),(201,4,'Travis Kelce','TE','KAN','KelcTr00'),(202,2,'Jaleel McLaughlin','RB','DEN','McLaJa00'),(203,3,'Tre Tucker','WR','LVR','TuckTr00'),(204,2,'Roschon Johnson','RB','CHI','JohnRo07'),(205,4,'Sam LaPorta','TE','DET','LaPoSa01'),(206,1,'Will Levis','QB','TEN','LeviWi00'),(207,3,'Jalen Nailor','WR','MIN','NailJa00'),(208,1,'Tua Tagovailoa','QB','MIA','TagoTu00'),(209,2,'Sean Tucker','RB','TAM','TuckSe00'),(210,1,'Russell Wilson','QB','PIT','WilsRu00'),(211,3,'Brandon Aiyuk','WR','SFO','AiyuBr00'),(212,3,'Andrei Iosivas','WR','CIN','IosiAn00'),(213,3,'Jordan Addison','WR','MIN','AddiJo00'),(214,3,'Tutu Atwell','WR','LAR','AtweTu00'),(215,4,'Tyler Conklin','TE','NYJ','ConkTy00'),(216,4,'Pat Freiermuth','TE','PIT','FreiPa00'),(217,2,'Antonio Gibson','RB','NWE','GibsAn00'),(218,3,'Rome Odunze','WR','CHI','OdunRo00'),(219,3,'Quentin Johnston','WR','LAC','JohnQu02'),(220,2,'Jeremy McNichols','RB','WAS','McNiJe00'),(221,4,'David Njoku','TE','CLE','NjokDa00'),(222,3,'Kalif Raymond','WR','DET','RaymKa00'),(223,3,'Demario Douglas','WR','NWE','DougDe00'),(224,3,'Cooper Kupp','WR','LAR','KuppCo00'),(225,1,'Mason Rudolph','QB','TEN','RudoMa00'),(226,2,'Emanuel Wilson','RB','GNB','WilsEm00'),(227,1,'Jameis Winston','QB','CLE','WinsJa00'),(228,3,'Noah Brown','WR','WAS','BrowNo00'),(229,3,'Gabriel Davis','WR','JAX','DaviGa01'),(230,2,'Ty Johnson','RB','BUF','JohnTy02'),(231,4,'Jonnu Smith','TE','MIA','SmitJo01'),(232,3,'Cedric Tillman','WR','CLE','TillCe01'),(233,3,'Jaylen Waddle','WR','MIA','WaddJa00'),(234,2,'Ezekiel Elliott','RB','DAL','ElliEz00'),(235,2,'Trey Sermon','RB','IND','SermTr00'),(236,4,'Brenton Strange','TE','JAX','StraBr00'),(237,3,'Christian Watson','WR','GNB','WatsCh00'),(238,4,'Dallas Goedert','TE','PHI','GoedDa00'),(239,3,'Ray-Ray McCloud','WR','ATL','McClRa00'),(240,2,'Raheem Mostert','RB','MIA','MostRa00'),(241,2,'Miles Sanders','RB','CAR','SandMi01'),(242,4,'Noah Fant','TE','SEA','FantNo00'),(243,2,'Isaac Guerendo','RB','SFO','GuerIs00'),(244,3,'Keenan Allen','WR','CHI','AlleKe00'),(245,1,'Tyler Huntley','QB','MIA','HuntTy01'),(246,1,'Bryce Young','QB','CAR','YounBr01'),(247,4,'Foster Moreau','TE','NOR','MoreFo00'),(248,2,'Dare Ogunbowale','RB','HOU','OgunDa00'),(249,2,'Cam Akers','RB','2TM','AkerCa00'),(250,4,'Jake Ferguson','TE','DAL','FergJa00'),(251,3,'DeAndre Hopkins','WR','2TM','HopkDe00'),(252,3,'KaVontae Turpin','WR','DAL','TurpKa00'),(253,3,'Kayshon Boutte','WR','NWE','BoutKa00'),(254,3,'Jalen Coker','WR','CAR','CokeJa01'),(255,2,'Isiah Pacheco','RB','KAN','PachIs00'),(256,1,'Spencer Rattler','QB','NOR','RattSp00'),(257,2,'Tyjae Spears','RB','TEN','SpeaTy00'),(258,3,'DJ Turner','WR','LVR','TurnDJ00'),(259,2,'Tyler Goodson','RB','IND','GoodTy00'),(260,4,'Taysom Hill','TE','NOR','HillTa00'),(261,4,'Juwan Johnson','TE','NOR','JohnJu02'),(262,3,'Josh Palmer','WR','LAC','PalmJo00'),(263,3,'Josh Reynolds','WR','DEN','ReynJo00'),(264,4,'Dalton Schultz','TE','HOU','SchuDa00'),(265,3,'Nick Westbrook-Ikhine','WR','TEN','WestNi00'),(266,3,'Nelson Agholor','WR','BAL','AghoNe00'),(267,4,'Will Dissly','TE','LAC','DissWi00'),(268,3,'Greg Dortch','WR','ARI','DortGr01'),(269,4,'Mike Gesicki','TE','CIN','GesiMi00'),(270,4,'Evan Engram','TE','JAX','EngrEv00'),(271,3,'Elijah Moore','WR','CLE','MoorEl00'),(272,1,'Aidan O\'Connell','QB','LVR','OConAi00'),(273,3,'Sterling Shepard','WR','TAM','ShepSt00'),(274,2,'Jaylen Warren','RB','PIT','WarrJa01'),(275,4,'Noah Gray','TE','KAN','GrayNo00'),(276,4,'Colby Parkinson','TE','LAR','ParkCo02'),(277,2,'Samaje Perine','RB','KAN','PeriSa00'),(278,3,'JuJu Smith-Schuster','WR','KAN','SmitJu00'),(279,2,'Jamaal Williams','RB','NOR','WillJa06'),(280,4,'Jordan Akins','TE','CLE','AkinJo00'),(281,2,'D\'Onta Foreman','RB','CLE','ForeDO00'),(282,3,'Mack Hollins','WR','BUF','HollMa00'),(283,3,'Van Jefferson','WR','PIT','JeffVa00'),(284,1,'Marcus Mariota','QB','WAS','MariMa01'),(285,3,'Jalen McMillan','WR','TAM','McMiJa01'),(286,3,'Jordan Whittington','WR','LAR','WhitJo04'),(287,3,'Dyami Brown','WR','WAS','BrowDy00'),(288,4,'Grant Calcaterra','TE','PHI','CalcGr00'),(289,2,'Ty Chandler','RB','MIN','ChanTy01'),(290,4,'Elijah Higgins','TE','ARI','HiggEl00'),(291,3,'KhaDarel Hodge','WR','ATL','HodgKh00'),(292,2,'D\'Ernest Johnson','RB','JAX','JohnDE04'),(293,4,'Josh Oliver','TE','MIN','OlivJo00'),(294,2,'Jaylen Wright','RB','MIA','WrigJa04'),(295,3,'Tyler Boyd','WR','TEN','BoydTy00'),(296,2,'Emari Demercado','RB','ARI','DemeEm00'),(297,3,'Troy Franklin','WR','DEN','FranTr00'),(298,3,'Tyler Johnson','WR','LAR','JohnTy00'),(299,4,'Charlie Kolar','TE','BAL','KolaCh00'),(300,3,'Bub Means','WR','NOR','MeanBu00'),(301,4,'Adam Trautman','TE','DEN','TrauAd00'),(302,4,'Darnell Washington','TE','PIT','WashDa03'),(303,3,'Olamide Zaccheaus','WR','WAS','ZaccOl01'),(304,4,'AJ Barner','TE','SEA','BarnAJ00'),(305,4,'Austin Hooper','TE','NWE','HoopAu00'),(306,5,'Kyle Juszczyk','FB','SFO','JuszKy00'),(307,3,'Tim Patrick','WR','DET','PatrTi00'),(308,3,'Adam Thielen','WR','CAR','ThieAd00'),(309,3,'Devaughn Vele','WR','DEN','VeleDe00'),(310,3,'Mike Williams','WR','NYJ','WillMi07'),(311,2,'Ameer Abdullah','RB','LVR','AbduAm00'),(312,4,'Mo Alie-Cox','TE','IND','AlieMo00'),(313,3,'Mecole Hardman','WR','KAN','HardMe00'),(314,3,'Lil\'Jordan Humphrey','WR','DEN','HumpLi01'),(315,4,'Dawson Knox','TE','BUF','KnoxDa00'),(316,4,'Chigoziem Okonkwo','TE','TEN','OkonCh00'),(317,2,'Dameon Pierce','RB','HOU','PierDa01'),(318,4,'Ja\'Tavion Sanders','TE','CAR','SandJa01'),(319,3,'Brandin Cooks','WR','DAL','CookBr00'),(320,3,'Ashton Dulin','WR','IND','DuliAs00'),(321,2,'Kenneth Gainwell','RB','PHI','GainKe00'),(322,2,'Jamycal Hasty','RB','NWE','HastJa02'),(323,4,'Theo Johnson','TE','NYG','JohnTh00'),(324,4,'Johnny Mundt','TE','MIN','MundJo00'),(325,3,'Puka Nacua','WR','LAR','NacuPu00'),(326,3,'Trey Palmer','WR','TAM','PalmTr00'),(327,2,'Kimani Vidal','RB','LAC','VidaKi00'),(328,2,'Zamir White','RB','LVR','WhitZa01'),(329,2,'Nick Chubb','RB','CLE','ChubNi00'),(330,3,'Adonai Mitchell','WR','IND','MitcAd00'),(331,3,'Ja\'Lynn Polk','WR','NWE','PolkJa00'),(332,4,'Erick All','TE','CIN','AllxEr00'),(333,2,'Trey Benson','RB','ARI','BensTr01'),(334,1,'Jake Haener','QB','NOR','HaenJa00'),(335,2,'Cordarrelle Patterson','RB','PIT','PattCo00'),(336,2,'Pierre Strong','RB','CLE','StroPi00'),(337,3,'Parker Washington','WR','JAX','WashPa01'),(338,3,'Justin Watson','WR','KAN','WatsJu01'),(339,4,'Josh Whyle','TE','TEN','WhylJo01'),(340,3,'Cedrick Wilson Jr.','WR','NOR','WilsCe01'),(341,2,'Gus Edwards','RB','LAC','EdwaGu00'),(342,4,'Andrew Ogletree','TE','IND','OgleAn00'),(343,3,'K.J. Osborn','WR','NWE','OsboKJ00'),(344,4,'Brock Wright','TE','DET','WrigBr01'),(345,3,'Simi Fehoko','WR','LAC','FehoSi00'),(346,5,'Alec Ingold','FB','MIA','IngoAl01'),(347,2,'Hunter Luepke','RB','DAL','LuepHu00'),(348,3,'Luke McCaffrey','WR','WAS','McCaLu00'),(349,3,'Jonathan Mingo','WR','CAR','MingJo00'),(350,2,'Carson Steele','RB','KAN','SteeCa00'),(351,4,'Nick Vannett','TE','TEN','VannNi00'),(352,3,'Ricky Pearsall','WR','SFO','PearRi00'),(353,3,'Curtis Samuel','WR','BUF','SamuCu00'),(354,3,'Trent Sherfield','WR','MIN','SherTr00'),(355,3,'Mason Tipton','WR','NOR','TiptMa00'),(356,3,'Jermaine Burton','WR','CIN','BurtJe01'),(357,3,'Parris Campbell','WR','PHI','CampPa00'),(358,2,'Blake Corum','RB','LAR','CoruBl00'),(359,4,'Connor Heyward','TE','PIT','HeywCo00'),(360,3,'Bo Melton','WR','GNB','MeltBo00'),(361,4,'Cade Stover','TE','HOU','StovCa00'),(362,3,'Robert Woods','WR','HOU','WoodRo02'),(363,4,'Nate Adkins','TE','DEN','AdkiNa00'),(364,3,'Jake Bobo','WR','SEA','BoboJa00'),(365,3,'Jalen Brooks','WR','DAL','BrooJa03'),(366,3,'Xavier Gipson','WR','NYJ','GipsXa00'),(367,2,'Khalil Herbert','RB','CHI','HerbKh00'),(368,4,'Lucas Krull','TE','DEN','KrulLu00'),(369,3,'David Moore','WR','CAR','MoorDa03'),(370,3,'Laviska Shenault Jr.','WR','SEA','ShenLa00'),(371,1,'Skylar Thompson','QB','MIA','ThomSk00'),(372,3,'Kristian Wilkerson','WR','LVR','WilkKr00'),(373,1,'Tim Boyle','QB','MIA','BoylTi00'),(374,3,'DeAndre Carter','WR','CHI','CartDe02'),(375,3,'Marvin Mims','WR','DEN','MimsMa00'),(376,4,'Eric Saubert','TE','SFO','SaubEr00'),(377,4,'Ben Sinnott','TE','WAS','SinnBe00'),(378,4,'Blake Whiteheart','TE','CLE','WhitBl01'),(379,2,'Tyler Badie','RB','DEN','BadiTy00'),(380,4,'Harrison Bryant','TE','LVR','BryaHa00'),(381,2,'Julius Chestnut','RB','TEN','ChesJu00'),(382,2,'DeeJay Dallas','RB','ARI','DallDe00'),(383,2,'Eric Gray','RB','NYG','GrayEr01'),(384,5,'C.J. Ham','FB','MIN','HamxC.00'),(385,4,'Hayden Hurst','TE','LAC','HursHa00'),(386,3,'Xavier Hutchinson','WR','HOU','HutcXa00'),(387,3,'Rakim Jarrett','WR','TAM','JarrRa00'),(388,3,'Ryan Miller','WR','TAM','MillRy01'),(389,3,'Jalen Reagor','WR','LAC','ReagJa00'),(390,5,'Patrick Ricard','FB','BAL','RicaPa00'),(391,4,'Luke Schoonmaker','TE','DAL','SchoLu00'),(392,1,'Tyrod Taylor','QB','NYJ','TaylTy00'),(393,3,'Jacob Cowing','WR','SFO','CowiJa00'),(394,3,'Jahan Dotson','WR','PHI','DotsJa00'),(395,4,'Kylen Granson','TE','IND','GranKy00'),(396,4,'Julian Hill','TE','MIA','HillJu02'),(397,3,'Charlie Jones','WR','CIN','JoneCh11'),(398,2,'Kendre Miller','RB','NOR','MillKe01'),(399,2,'Ronnie Rivers','RB','LAR','RiveRo01'),(400,4,'Jeremy Ruckert','TE','NYJ','RuckJe00'),(401,3,'Tyquan Thornton','WR','NWE','ThorTy00'),(402,4,'Tommy Tremble','TE','CAR','TremTo00'),(403,2,'Jeff Wilson','RB','MIA','WilsJe01'),(404,2,'Chris Brooks','RB','GNB','BrooCh00'),(405,3,'Treylon Burks','WR','TEN','BurkTr00'),(406,5,'Michael Burton','FB','DEN','BurtMi00'),(407,3,'Derius Davis','WR','LAC','DaviDe02'),(408,3,'D\'Wayne Eskridge','WR','MIA','EskrDW00'),(409,2,'Audric Estime','RB','DEN','EstiAu00'),(410,4,'Hunter Long','TE','LAR','LongHu00'),(411,3,'John Metchie','WR','HOU','MetcJo00'),(412,4,'Ben Sims','TE','GNB','SimsBe00'),(413,4,'Stone Smartt','TE','LAC','SmarSt00'),(414,3,'Xavier Smith','WR','LAR','SmitXa00'),(415,2,'J.J. Taylor','RB','HOU','TaylJJ01'),(416,2,'Patrick Taylor','RB','SFO','TaylPa01'),(417,1,'Dorian Thompson-Robinson','QB','CLE','ThomDo02'),(418,3,'Alex Bachman','WR','LVR','BachAl00'),(419,4,'John Bates','TE','WAS','BateJo00'),(420,4,'Daniel Bellinger','TE','NYG','BellDa00'),(421,3,'David Bell','WR','CLE','BellDa02'),(422,3,'Kendrick Bourne','WR','NWE','BourKe00'),(423,3,'Britain Covey','WR','PHI','CoveBr00'),(424,4,'Greg Dulcich','TE','DEN','DulcGr00'),(425,4,'Gerald Everett','TE','CHI','EverGe00'),(426,4,'Luke Farrell','TE','JAX','FarrLu00'),(427,3,'Malik Heath','WR','GNB','HeatMa00'),(428,1,'Davis Mills','QB','HOU','MillDa02'),(429,3,'Scott Miller','WR','PIT','MillSc01'),(430,2,'Jordan Mims','RB','NOR','MimsJo00'),(431,3,'Brandon Powell','WR','MIN','PoweBr00'),(432,4,'Drew Sample','TE','CIN','SampDr00'),(433,3,'Marquez Valdes-Scantling','WR','BUF','ValdMa00'),(434,2,'Deuce Vaughn','RB','DAL','VaugDe00'),(435,3,'Tylan Wallace','WR','BAL','WallTy00'),(436,3,'Ronnie Bell','WR','SFO','BellRo01'),(437,4,'Pharaoh Brown','TE','SEA','BrowPh01'),(438,4,'Tanner Conner','TE','MIA','ConnTa00'),(439,2,'Dalvin Cook','RB','DAL','CookDa01'),(440,2,'Isaiah Davis','RB','NYJ','DaviIs00'),(441,2,'Hassan Haskins','RB','LAC','HaskHa00'),(442,2,'Travis Homer','RB','CHI','HomeTr00'),(443,3,'Trenton Irwin','WR','CIN','IrwiTr00'),(444,3,'Tim Jones','WR','JAX','JoneTi00'),(445,2,'MarShawn Lloyd','RB','GNB','LloyMa00'),(446,1,'Drew Lock','QB','NYG','LockDr00'),(447,4,'Michael Mayer','TE','LVR','MayeMi00'),(448,2,'Jase McClellan','RB','ATL','McClJa05'),(449,2,'Kenny McIntosh','RB','SEA','McInKe00'),(450,4,'Luke Musgrave','TE','GNB','MusgLu00'),(451,4,'MyCole Pruitt','TE','PIT','PruiMy00'),(452,2,'Craig Reynolds','RB','DET','ReynCr00'),(453,2,'Aaron Shampklin','RB','PIT','ShamAa00'),(454,4,'Brevyn Spann-Ford','TE','DAL','SpanBr00'),(455,2,'Sione Vaki','RB','DET','VakiSi00'),(456,2,'Jonathan Ward','RB','PIT','WardJo00'),(457,3,'Malik Washington','WR','MIA','WashMa00'),(458,4,'Charlie Woerner','TE','ATL','WoerCh00'),(459,1,'Kyle Allen','QB','PIT','AlleKy00'),(460,3,'Robbie Chosen','WR','MIA','AndeRo04'),(461,2,'Mike Boone','RB','CAR','BoonMi00'),(462,3,'Jamison Crowder','WR','WAS','CrowJa00'),(463,3,'Jaelon Darden','WR','CLE','DardJa00'),(464,4,'Josiah Deguara','TE','JAX','DeguJo00'),(465,3,'Grant Dubose','WR','MIA','DuboGr00'),(466,4,'Payne Durham','TE','TAM','DurhPa00'),(467,3,'Devin Duvernay','WR','JAX','DuveDe00'),(468,4,'Jody Fortson','TE','KAN','FortJo01'),(469,2,'Myles Gaskin','RB','MIN','GaskMy00'),(470,1,'Taylor Heinicke','QB','LAC','HeinTa00'),(471,3,'Isaiah Hodgins','WR','NYG','HodgIs00'),(472,1,'Hendon Hooker','QB','DET','HookHe00'),(473,3,'Jalin Hyatt','WR','NYG','HyatJa00'),(474,2,'Terrell Jennings','RB','NWE','JennTe00'),(475,3,'Brandon Johnson','WR','PIT','JohnBr23'),(476,4,'Brevin Jordan','TE','HOU','JordBr00'),(477,4,'Will Mallory','TE','IND','MallWi00'),(478,3,'Tyreik McAllister','WR','LVR','McAlTy00'),(479,1,'Nick Mullens','QB','MIN','MullNi00'),(480,1,'Michael Penix','QB','ATL','PeniMi00'),(481,4,'Tip Reiman','TE','ARI','ReimTi00'),(482,3,'John Ross','WR','PHI','RossJo00'),(483,4,'John Samuel Shenker','TE','LVR','ShenJo00'),(484,2,'Will Shipley','RB','PHI','ShipWi00'),(485,4,'Durham Smythe','TE','MIA','SmytDu00'),(486,4,'Jack Stoll','TE','PHI','StolJa00'),(487,4,'Geoff Swaim','TE','CLE','SwaiGe00'),(488,4,'Eric Tomlinson','TE','LAC','TomlEr01'),(489,3,'Casey Washington','WR','ATL','WashCa01'),(490,4,'Jared Wiley','TE','KAN','WileJa00'),(491,3,'Isaiah Williams','WR','DET','WillIs03'),(492,3,'Johnny Wilson','WR','PHI','WilsJo03'),(493,4,'Kenny Yeboah','TE','NYJ','YeboKe00'),(494,2,'Rasheen Ali','RB','BAL','AlixRa00'),(495,1,'Brandon Allen','QB','SFO','AlleBr00'),(496,4,'Davis Allen','TE','LAR','AlleDa02'),(497,3,'Javon Baker','WR','NWE','BakeJa00'),(498,4,'Brenden Bates','TE','NYJ','BateBr00'),(499,5,'Andrew Beck','FB','GNB','BeckAn01'),(500,3,'Odell Beckham Jr.','WR','MIA','BeckOd00'),(501,4,'Jaheim Bell','TE','NWE','BellJa00'),(502,3,'Braxton Berrios','WR','MIA','BerrBr00'),(503,2,'Raheem Blackshear','RB','CAR','BlacRa00'),(504,3,'Chris Blair','WR','ATL','BlaiCh00'),(505,5,'Khari Blasingame','FB','CHI','BlasKh00'),(506,2,'Gary Brightwell','RB','CLE','BrigGa00'),(507,2,'British Brooks','RB','HOU','BrooBr01'),(508,1,'Jake Browning','QB','CIN','BrowJa08'),(509,3,'Irvin Charles','WR','NYJ','CharIr00'),(510,2,'Chris Collier','RB','BAL','CollCh01'),(511,3,'Chris Conley','WR','SFO','ConlCh00'),(512,3,'Malachi Corley','WR','NYJ','CorlMa00'),(513,4,'Devin Culp','TE','TAM','CulpDe00'),(514,1,'Jeff Driskel','QB','WAS','DrisJe00'),(515,4,'Ross Dwelley','TE','ATL','DwelRo00'),(516,3,'Erik Ezukanma','WR','MIA','EzukEr00'),(517,4,'Princeton Fant','TE','DAL','FantPr00'),(518,4,'Anthony Firkser','TE','NYJ','FirkAn00'),(519,4,'John FitzPatrick','TE','GNB','FitzJo00'),(520,3,'Bryce Ford-Wheaton','WR','NYG','FordBr00'),(521,4,'Feleipe Franks','TE','CAR','FranFe00'),(522,5,'Reggie Gilliam','FB','BUF','GillRe00'),(523,3,'Anthony Gould','WR','IND','GoulAn00'),(524,5,'Troy Hairston','FB','HOU','HairTr00'),(525,3,'Deonte Harty','WR','BAL','HarrDe07'),(526,4,'Peyton Hendershot','TE','KAN','HendPe01'),(527,4,'Parker Hesse','TE','DET','HessPa00'),(528,2,'George Holani','RB','SEA','HolaGe00'),(529,4,'Dallin Holker','TE','NOR','HolkDa00'),(530,1,'Sam Howell','QB','SEA','HoweSa00'),(531,4,'Tanner Hudson','TE','CIN','HudsTa00'),(532,2,'Evan Hull','RB','IND','HullEv00'),(533,2,'Keaontay Ingram','RB','KAN','IngrKe01'),(534,3,'Jermaine Jackson','WR','NOR','JackJe01'),(535,3,'Jha\'Quan Jackson','WR','TEN','JackJh00'),(536,3,'Trishton Jackson','WR','MIN','JackTr02'),(537,4,'E.J. Jenkins','TE','PHI','JenkEJ00'),(538,3,'Collin Johnson','WR','CHI','JohnCo01'),(539,3,'Jaylen Johnson','WR','LAC','JohnJa07'),(540,5,'Jakob Johnson','FB','NYG','JohnJa12'),(541,1,'Josh Johnson','QB','BAL','JohnJo05'),(542,3,'Kameron Johnson','WR','TAM','JohnKa01'),(543,3,'Velus Jones Jr.','WR','CHI','JoneVe00'),(544,3,'Zay Jones','WR','ARI','JoneZa00'),(545,4,'Nikola Kalinic','TE','LAR','KaliNi00'),(546,2,'John Kelly','RB','BAL','KellJo00'),(547,3,'Tom Kennedy','WR','DET','KennTo01'),(548,4,'Ko Kieft','TE','TAM','KiefKo00'),(549,3,'Mason Kinsey','WR','TEN','KinsMa00'),(550,4,'Marcedes Lewis','TE','CHI','LewiMa00'),(551,4,'Chris Manhertz','TE','NYG','ManhCh00'),(552,4,'Jordan Matthews','TE','CAR','MattJo00'),(553,2,'Sincere McCormick','RB','LVR','McCoSi00'),(554,2,'Dante Miller','RB','NYG','MillDa04'),(555,3,'Chris Moore','WR','ARI','MoorCh00'),(556,3,'Skyy Moore','WR','KAN','MoorSk01'),(557,4,'Quintin Morris','TE','BUF','MorrQu00'),(558,4,'Nick Muse','TE','MIN','MuseNi00'),(559,4,'Thomas Odukoya','TE','TEN','OdukTh00'),(560,3,'Zach Pascal','WR','ARI','PascZa00'),(561,1,'Kenny Pickett','QB','PHI','PickKe00'),(562,5,'Adam Prentice','FB','NOR','PrenAd00'),(563,3,'James Proche','WR','CLE','ProcJa00'),(564,4,'Teagan Quitoriano','TE','HOU','QuitTe00'),(565,3,'Brenden Rice','WR','LAC','RiceBr00'),(566,1,'Desmond Ridder','QB','LVR','RiddDe00'),(567,3,'Allen Robinson','WR','DET','RobiAl02'),(568,2,'Chris Rodriguez','RB','WAS','RodrCh00'),(569,1,'Cooper Rush','QB','DAL','RushCo00'),(570,4,'Brady Russell','TE','SEA','RussBr00'),(571,3,'Tyler Scott','WR','CHI','ScotTy00'),(572,3,'Tyrell Shavers','WR','BUF','ShavTy00'),(573,4,'Justin Shorter','TE','LVR','ShorJu00'),(574,3,'Ben Skowronek','WR','PIT','SkowBe00'),(575,3,'Ainias Smith','WR','PHI','SmitAi00'),(576,3,'Ihmir Smith-Marsette','WR','NYG','SmitIh00'),(577,3,'Equanimeous St. Brown','WR','NOR','St.BEq00'),(578,1,'Jarrett Stidham','QB','DEN','StidJa00'),(579,3,'Trent Taylor','WR','SFO','TaylTr02'),(580,3,'Cody Thompson','WR','TAM','ThomCo04'),(581,4,'Ian Thomas','TE','CAR','ThomIa00'),(582,3,'Jamari Thrash','WR','CLE','ThraJa01'),(583,4,'Jake Tonges','TE','SFO','TongJa00'),(584,4,'Robert Tonyan','TE','MIN','TonyRo00'),(585,1,'Kyle Trask','QB','TAM','TrasKy00'),(586,3,'Brycen Tremayne','WR','WAS','TremBr00'),(587,1,'Mitchell Trubisky','QB','BUF','TrubMi00'),(588,3,'Jalen Virgil','WR','BUF','VirgJa00'),(589,4,'Travis Vokolek','TE','ARI','VokoTr00'),(590,3,'Devontez Walker','WR','BAL','WalkDe01'),(591,3,'Montrell Washington','WR','KAN','WashMo00'),(592,2,'Blake Watson','RB','DEN','WatsBl00'),(593,3,'Xavier Weaver','WR','ARI','WeavXa00'),(594,1,'Carson Wentz','QB','KAN','WentCa00'),(595,4,'Mitchell Wilcox','TE','NWE','WilcMi01'),(596,2,'Avery Williams','RB','ATL','WillAv02'),(597,4,'Brayden Willis','TE','SFO','WillBr06'),(598,2,'D.J. Williams','RB','TAM','WillDJ00'),(599,4,'Rodney Williams','TE','PIT','WillRo08'),(600,2,'Trayveon Williams','RB','CIN','WillTr06'),(601,3,'Roman Wilson','WR','PIT','WilsRo02'),(602,4,'Colson Yankoff','TE','WAS','YankCo00'),(603,3,'Dareke Young','WR','SEA','YounDa02'),(604,4,'Shane Zylstra','TE','DET','ZylsSh00'),(605,1,'Tyson Bagent','QB','CHI','BageTy00'),(606,3,'Ryan Flournoy','WR','DAL','FlouRy00'),(607,1,'Mac Jones','QB','JAX','JoneMa05'),(608,2,'Dylan Laube','RB','LVR','LaubDy00'),(609,3,'Steven Sims','WR','HOU','SimsSt00'),(610,1,'Clayton Tune','QB','ARI','TuneCl00'),(627,1,'Testing add player','QB','PIT','');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_stats`
--

DROP TABLE IF EXISTS `player_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_stats` (
  `player_id` int DEFAULT NULL,
  `game_id` int DEFAULT NULL,
  `team_id` int DEFAULT NULL,
  `passing_yds` int DEFAULT '0',
  `rushing_yds` int DEFAULT '0',
  `receiving_yds` int DEFAULT '0',
  `passing_tds` int DEFAULT '0',
  `rushing_tds` int DEFAULT '0',
  `receiving_tds` int DEFAULT '0',
  `misc_tds` int DEFAULT '0',
  `pass_attempts` int DEFAULT '0',
  `completions` int DEFAULT '0',
  `rush_attempts` int DEFAULT '0',
  `targets` int DEFAULT '0',
  `receptions` int DEFAULT '0',
  `name` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `team` varchar(45) DEFAULT NULL,
  `interceptions` int DEFAULT NULL,
  `fumbles` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_stats`
--

LOCK TABLES `player_stats` WRITE;
/*!40000 ALTER TABLE `player_stats` DISABLE KEYS */;
INSERT INTO `player_stats` VALUES (129,1,27,156,57,0,0,0,0,0,23,17,14,0,0,'Justin Fields','FielJu00','PIT',0,1),(102,1,27,0,70,9,0,0,0,0,0,0,20,2,1,'Najee Harris','HarrNa00','PIT',0,0),(335,1,27,0,13,0,0,0,0,0,0,0,4,0,0,'Cordarrelle Patterson','PattCo00','PIT',0,0),(274,1,27,0,7,13,0,0,0,0,0,0,2,2,2,'Jaylen Warren','WarrJa01','PIT',0,0),(216,1,27,0,0,27,0,0,0,0,0,0,0,4,4,'Pat Freiermuth','FreiPa00','PIT',0,0),(451,1,27,0,0,9,0,0,0,0,0,0,0,2,1,'MyCole Pruitt','PruiMy00','PIT',0,0),(186,1,27,0,0,7,0,0,0,0,0,0,0,2,1,'Calvin Austin III','AustCa00','PIT',0,0),(302,1,27,0,0,5,0,0,0,0,0,0,0,1,1,'Darnell Washington','WashDa03','PIT',0,0),(283,1,27,0,0,1,0,0,0,0,0,0,0,2,1,'Van Jefferson','JeffVa00','PIT',0,0),(154,1,27,0,-10,85,0,0,0,0,0,0,1,7,6,'George Pickens','PickGe00','PIT',0,0),(126,1,2,155,0,0,1,0,0,0,26,16,1,0,0,'Kirk Cousins','CousKi00','ATL',2,0),(68,1,2,0,68,43,0,0,0,0,0,0,18,5,5,'Bijan Robinson','RobiBi01','ATL',0,0),(171,1,2,0,21,0,0,0,0,0,0,0,3,0,0,'Tyler Allgeier','AllgTy00','ATL',0,0),(239,1,2,0,0,52,0,0,0,0,0,0,0,7,4,'Ray-Ray McCloud','McClRa00','ATL',0,0),(86,1,2,0,0,26,0,0,1,0,0,0,0,3,3,'Kyle Pitts','PittKy00','ATL',0,0),(88,1,2,0,0,15,0,0,0,0,0,0,0,3,1,'Darnell Mooney','MoonDa00','ATL',0,0),(75,1,2,0,0,15,0,0,0,0,0,0,0,3,2,'Drake London','LondDr00','ATL',0,0),(458,1,2,0,0,4,0,0,0,0,0,0,0,2,1,'Charlie Woerner','WoerCh00','ATL',0,0),(129,2,27,117,27,0,1,0,0,0,20,13,8,0,0,'Justin Fields','FielJu00','PIT',0,1),(102,2,27,0,69,5,0,0,0,0,0,0,17,2,1,'Najee Harris','HarrNa00','PIT',0,0),(274,2,27,0,42,19,0,0,0,0,0,0,9,2,2,'Jaylen Warren','WarrJa01','PIT',0,0),(335,2,27,0,3,0,0,0,0,0,0,0,2,0,0,'Cordarrelle Patterson','PattCo00','PIT',0,0),(216,2,27,0,0,39,0,0,0,0,0,0,0,4,4,'Pat Freiermuth','FreiPa00','PIT',0,0),(154,2,27,0,0,29,0,0,0,0,0,0,0,4,2,'George Pickens','PickGe00','PIT',0,0),(283,2,27,0,0,14,0,0,0,0,0,0,0,3,2,'Van Jefferson','JeffVa00','PIT',0,0),(186,2,27,0,0,6,0,0,0,0,0,0,0,2,1,'Calvin Austin III','AustCa00','PIT',0,0),(302,2,27,0,0,5,0,0,1,0,0,0,0,1,1,'Darnell Washington','WashDa03','PIT',0,0),(112,2,10,246,25,0,0,0,0,0,35,20,4,0,0,'Bo Nix','NixxBo00','DEN',2,0),(149,2,10,0,17,48,0,0,0,0,0,0,11,5,5,'Javonte Williams','WillJa10','DEN',0,0),(379,2,10,0,16,2,0,0,0,0,0,0,1,1,1,'Tyler Badie','BadiTy00','DEN',0,0),(202,2,10,0,6,0,0,0,0,0,0,0,3,0,0,'Jaleel McLaughlin','McLaJa00','DEN',0,0),(263,2,10,0,0,93,0,0,0,0,0,0,0,5,4,'Josh Reynolds','ReynJo00','DEN',0,0),(314,2,10,0,0,50,0,0,0,0,0,0,0,5,4,'Lil\'Jordan Humphrey','HumpLi01','DEN',0,0),(172,2,10,0,0,26,0,0,0,0,0,0,0,4,1,'Courtland Sutton','SuttCo00','DEN',0,0),(424,2,10,0,0,16,0,0,0,0,0,0,0,8,3,'Greg Dulcich','DulcGr00','DEN',0,0),(375,2,10,0,0,10,0,0,0,0,0,0,0,2,1,'Marvin Mims','MimsMa00','DEN',0,0),(406,2,10,0,0,1,0,0,0,0,0,0,0,1,1,'Michael Burton','BurtMi00','DEN',0,0),(297,2,10,0,0,0,0,0,0,0,0,0,0,1,0,'Troy Franklin','FranTr00','DEN',0,0),(363,2,10,0,0,0,0,0,0,0,0,0,0,1,0,'Nate Adkins','AdkiNa00','DEN',0,0),(135,3,17,125,0,0,1,0,0,0,18,12,1,0,0,'Justin Herbert','HerbJu00','LAC',0,1),(470,3,17,24,0,0,0,0,0,0,2,2,0,0,0,'Taylor Heinicke','HeinTa00','LAC',0,0),(103,3,17,0,44,10,0,0,0,0,0,0,15,3,3,'J.K. Dobbins','DobbJK00','LAC',0,0),(341,3,17,0,9,0,0,0,0,0,0,0,3,0,0,'Gus Edwards','EdwaGu00','LAC',0,0),(407,3,17,0,8,0,0,0,0,0,0,0,1,0,0,'Derius Davis','DaviDe02','LAC',0,0),(219,3,17,0,0,44,0,0,1,0,0,0,0,2,2,'Quentin Johnston','JohnQu02','LAC',0,0),(111,3,17,0,0,44,0,0,0,0,0,0,0,6,3,'Ladd McConkey','McCoLa00','LAC',0,0),(267,3,17,0,0,19,0,0,0,0,0,0,0,3,3,'Will Dissly','DissWi00','LAC',0,0),(345,3,17,0,0,17,0,0,0,0,0,0,0,3,1,'Simi Fehoko','FehoSi00','LAC',0,0),(385,3,17,0,0,15,0,0,0,0,0,0,0,2,2,'Hayden Hurst','HursHa00','LAC',0,0),(129,3,27,245,6,0,1,1,0,0,32,25,6,0,0,'Justin Fields','FielJu00','PIT',1,0),(102,3,27,0,70,16,0,0,0,0,0,0,18,5,5,'Najee Harris','HarrNa00','PIT',0,0),(335,3,27,0,33,15,0,0,0,0,0,0,4,5,3,'Cordarrelle Patterson','PattCo00','PIT',0,0),(274,3,27,0,5,-4,0,0,0,0,0,0,3,1,1,'Jaylen Warren','WarrJa01','PIT',0,0),(186,3,27,0,0,95,0,0,1,0,0,0,0,5,4,'Calvin Austin III','AustCa00','PIT',0,0),(154,3,27,0,0,57,0,0,0,0,0,0,0,7,5,'George Pickens','PickGe00','PIT',0,0),(216,3,27,0,0,33,0,0,0,0,0,0,0,5,4,'Pat Freiermuth','FreiPa00','PIT',0,0),(429,3,27,0,0,31,0,0,0,0,0,0,0,2,2,'Scott Miller','MillSc01','PIT',0,0),(359,3,27,0,0,2,0,0,0,0,0,0,0,1,1,'Connor Heyward','HeywCo00','PIT',0,0),(129,4,27,312,55,0,1,2,0,0,34,22,10,0,0,'Justin Fields','FielJu00','PIT',0,2),(335,4,27,0,43,19,0,0,0,0,0,0,6,2,2,'Cordarrelle Patterson','PattCo00','PIT',0,0),(102,4,27,0,19,54,0,0,0,0,0,0,13,6,3,'Najee Harris','HarrNa00','PIT',0,0),(453,4,27,0,5,0,0,0,0,0,0,0,1,0,0,'Aaron Shampklin','ShamAa00','PIT',0,0),(154,4,27,0,0,113,0,0,0,0,0,0,0,11,7,'George Pickens','PickGe00','PIT',0,1),(216,4,27,0,0,57,0,0,1,0,0,0,0,7,5,'Pat Freiermuth','FreiPa00','PIT',0,0),(302,4,27,0,0,31,0,0,0,0,0,0,0,2,2,'Darnell Washington','WashDa03','PIT',0,0),(283,4,27,0,0,21,0,0,0,0,0,0,0,3,2,'Van Jefferson','JeffVa00','PIT',0,0),(186,4,27,0,0,17,0,0,0,0,0,0,0,1,1,'Calvin Austin III','AustCa00','PIT',0,0),(158,4,14,168,3,0,2,0,0,0,26,16,2,0,0,'Joe Flacco','FlacJo00','IND',0,0),(145,4,14,71,24,0,0,0,0,0,4,3,3,0,0,'Anthony Richardson','RichAn03','IND',0,1),(109,4,14,0,88,20,0,1,0,0,0,0,21,4,3,'Jonathan Taylor','TaylJo02','IND',0,0),(330,4,14,0,10,0,0,0,0,0,0,0,1,3,0,'Adonai Mitchell','MitcAd00','IND',0,0),(235,4,14,0,8,0,0,0,0,0,0,0,5,0,0,'Trey Sermon','SermTr00','IND',0,0),(175,4,14,0,0,113,0,0,0,0,0,0,0,9,6,'Michael Pittman Jr.','PittMi01','IND',0,0),(160,4,14,0,0,82,0,0,1,0,0,0,0,9,8,'Josh Downs','DownJo00','IND',0,0),(342,4,14,0,0,15,0,0,1,0,0,0,0,1,1,'Andrew Ogletree','OgleAn00','IND',0,0),(155,4,14,0,0,9,0,0,0,0,0,0,0,2,1,'Alec Pierce','PierAl00','IND',0,0);
/*!40000 ALTER TABLE `player_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `position_id` int NOT NULL AUTO_INCREMENT,
  `position_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'Quarterback'),(2,'Runningback'),(3,'Wide Receiver'),(4,'Tight end'),(5,'Kicker');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `season`
--

DROP TABLE IF EXISTS `season`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `season` (
  `year` int NOT NULL,
  `total_games` int DEFAULT '0',
  PRIMARY KEY (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season`
--

LOCK TABLES `season` WRITE;
/*!40000 ALTER TABLE `season` DISABLE KEYS */;
INSERT INTO `season` VALUES (2019,16),(2020,16),(2021,17),(2022,17),(2023,17);
/*!40000 ALTER TABLE `season` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `conference` int DEFAULT NULL,
  `season` int DEFAULT NULL,
  `abreviation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'Arizona Cardinals',2,2024,'ARI'),(2,'Atlanta Falcons',2,2024,'ATL'),(3,'Baltimore Ravens',1,2024,'BAL'),(4,'Buffalo Bills',1,2024,'BUF'),(5,'Carolina Panthers',2,2024,'CAR'),(6,'Chicago Bears',2,2024,'CHI'),(7,'Cincinnati Bengals',1,2024,'CIN'),(8,'Cleveland Browns',1,2024,'CLE'),(9,'Dallas Cowboys',2,2024,'DAL'),(10,'Denver Broncos',1,2024,'DEN'),(11,'Detroit Lions',2,2024,'DET'),(12,'Green Bay Packers',2,2024,'GNB'),(13,'Houston Texans',1,2024,'HOU'),(14,'Indianapolis Colts',1,2024,'IND'),(15,'Jacksonville Jaguars',1,2024,'JAX'),(16,'Kansas City Chiefs',1,2024,'KAN'),(17,'Miami Dolphins',1,2024,'LAC'),(18,'Minnesota Vikings',2,2024,'LAR'),(19,'New England Patriots',1,2024,'LVR'),(20,'New Orleans Saints',2,2024,'MIA'),(21,'New York Giants',2,2024,'MIN'),(22,'New York Jets',1,2024,'NOR'),(23,'Las Vegas Raiders',1,2024,'NWE'),(24,'Philadelphia Eagles',2,2024,'NYG'),(25,'Pittsburgh Steelers',1,2024,'NYJ'),(26,'Los Angeles Chargers',1,2024,'PHI'),(27,'San Francisco 49ers',2,2024,'PIT'),(28,'Seattle Seahawks',2,2024,'SEA'),(29,'Los Angeles Rams',2,2024,'LAR'),(30,'Tampa Bay Buccaneers',2,2024,'TAM'),(31,'Tennessee Titans',1,2024,'TEN'),(32,'Washington Commanders',2,2024,'WAS');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user1','password');
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

-- Dump completed on 2024-12-06 12:18:28
