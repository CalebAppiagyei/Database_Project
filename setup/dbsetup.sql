DROP SCHEMA if exists football_data;

CREATE SCHEMA football_data;

CREATE TABLE football_data.conference (
  `conference_id` int NOT NULL,
  `conference_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`conference_id`)
);

CREATE TABLE football_data.season (
  `year` int NOT NULL,
  `total_games` int DEFAULT 0,
  PRIMARY KEY (`year`)
);

CREATE TABLE football_data.coach (
  `coach_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`coach_id`)
);

CREATE TABLE football_data.team (
  `team_id` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `coach_id` int NOT NULL,
  `conference_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `WL_pct` float DEFAULT NULL,
  PRIMARY KEY (`team_id`, `year`),
  FOREIGN KEY (`year`) REFERENCES `season` (`year`),
  FOREIGN KEY (`coach_id`) REFERENCES `coach` (`coach_id`),
  FOREIGN KEY (`conference_id`) REFERENCES `conference` (`conference_id`)
);

CREATE TABLE football_data.position (
  `position_id` int NOT NULL AUTO_INCREMENT,
  `position_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`position_id`)
);

CREATE TABLE football_data.game (
  `game_id` int NOT NULL AUTO_INCREMENT,
  `year` int DEFAULT NULL,
  `team_away` int DEFAULT NULL,
  `team_home` int DEFAULT NULL,
  PRIMARY KEY (`game_id`),
  FOREIGN KEY (`year`) REFERENCES `season` (`year`),
  FOREIGN KEY (`team_away`) REFERENCES `team` (`team_id`),
  FOREIGN KEY (`team_home`) REFERENCES `team` (`team_id`)
);

CREATE TABLE football_data.game_stats (
  `game_id` int NOT NULL,
  `team_id` int NOT NULL,
  `total_yards` int DEFAULT 0,
  `total_tds` int DEFAULT 0,
  `total_fgs` int DEFAULT 0,
  `turnovers` int DEFAULT 0,
  PRIMARY KEY (`game_id`, `team_id`),
  FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`),
  FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
);

CREATE TABLE football_data.player (
  `player_id` int NOT NULL AUTO_INCREMENT,
  `position_id` int DEFAULT NULL,
  `Name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`player_id`),
  FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`)
);

CREATE TABLE football_data.player_stats (
  `player_id` int NOT NULL,
  `game_id` int NOT NULL,
  `team_id` int DEFAULT NULL,
  `passing_yds` int DEFAULT 0,
  `rushing_yds` int DEFAULT 0,
  `receiving_yds` int DEFAULT 0,
  `passing_tds` int DEFAULT 0,
  `rushing_tds` int DEFAULT 0,
  `receiving_tds` int DEFAULT 0,
  `misc_tds` int DEFAULT 0,
  `pass_attempts` int DEFAULT 0,
  `completions` int DEFAULT 0,
  `rush_attempts` int DEFAULT 0,
  `targets` int DEFAULT 0,
  `receptions` int DEFAULT 0,
  `turnovers` int DEFAULT 0,
  PRIMARY KEY (`player_id`, `game_id`),
  FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`),
  FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`),
  FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
);

-- Sample Data --

INSERT INTO football_data.conference (conference_id, conference_name)
VALUES
(1, 'American Football Conference'),
(2, 'National Football Conference');

INSERT INTO football_data.season (year, total_games)
VALUES
(2004, 12),
(2005, 12),
(2006, 13),
(2007, 13),
(2008, 14),
(2009, 15),
(2010, 15),
(2011, 16),
(2012, 16),
(2013, 16),
(2014, 17),
(2015, 17),
(2016, 17),
(2017, 17),
(2018, 17),
(2019, 16),
(2020, 16),
(2021, 17),
(2022, 17),
(2023, 17);

INSERT INTO football_data.coach (coach_id, first_name, last_name)
VALUES
(1, 'Bill', 'Belichick'),
(2, 'Andy', 'Reid'),
(3, 'Sean', 'McVay'),
(4, 'Mike', 'Tomlin'),
(5, 'John', 'Harbaugh'),
(6, 'Pete', 'Carroll'),
(7, 'Kyle', 'Shanahan'),
(8, 'Matt', 'LaFleur'),
(9, 'Sean', 'Payton'),
(10, 'Doug', 'Pederson'),
(11, 'Ron', 'Rivera'),
(12, 'Mike', 'Vrabel'),
(13, 'Nick', 'Sirianni'),
(14, 'Dan', 'Campbell'),
(15, 'Frank', 'Reich'),
(16, 'Robert', 'Saleh'),
(17, 'Kevin', 'Stefanski'),
(18, 'Arthur', 'Smith'),
(19, 'Zac', 'Taylor'),
(20, 'Brandon', 'Staley');

INSERT INTO football_data.team (team_id, year, coach_id, conference_id, name)
VALUES
(1, 2023, 1, 2, 'Arizona Cardinals'),
(2, 2023, 2, 2, 'Atlanta Falcons'),
(3, 2023, 3, 1, 'Baltimore Ravens'),
(4, 2023, 4, 1, 'Buffalo Bills'),
(5, 2023, 5, 2, 'Carolina Panthers'),
(6, 2022, 6, 2, 'Chicago Bears'),
(7, 2022, 7, 1, 'Cincinnati Bengals'),
(8, 2022, 8, 1, 'Cleveland Browns'),
(9, 2021, 9, 2, 'Dallas Cowboys'),
(10, 2021, 10, 1, 'Denver Broncos'),
(11, 2021, 11, 2, 'Detroit Lions'),
(12, 2020, 12, 2, 'Green Bay Packers'),
(13, 2020, 13, 1, 'Houston Texans'),
(14, 2020, 14, 1, 'Indianapolis Colts'),
(15, 2019, 15, 1, 'Jacksonville Jaguars'),
(16, 2019, 16, 1, 'Kansas City Chiefs'),
(17, 2019, 17, 1, 'Las Vegas Raiders'),
(18, 2018, 18, 1, 'Los Angeles Chargers'),
(19, 2018, 19, 2, 'Los Angeles Rams'),
(20, 2018, 20, 1, 'Miami Dolphins');

INSERT INTO football_data.position (position_id, position_name)
VALUES
(1, 'Quarterback'),
(2, 'Runningback'),
(3, 'Wide Receiver'),
(4, 'Tight End'),
(5, 'Kicker'),
(6, 'Punter'),
(7, 'Linebacker'),
(8, 'Cornerback'),
(9, 'Safety'),
(10, 'Defensive End'),
(11, 'Defensive Tackle'),
(12, 'Offensive Tackle'),
(13, 'Offensive Guard'),
(14, 'Center'),
(15, 'Fullback'),
(16, 'Long Snapper'),
(17, 'Holder'),
(18, 'Return Specialist');

INSERT INTO football_data.game (game_id, year, team_home, team_away)
VALUES
(1, 2023, 1, 2),
(2, 2023, 3, 4),
(3, 2023, 5, 1),
(4, 2023, 2, 3),
(5, 2023, 4, 5),
(6, 2022, 6, 7),
(7, 2022, 8, 6),
(8, 2021, 9, 10),
(9, 2021, 11, 9),
(10, 2021, 10, 11),
(11, 2020, 12, 13),
(12, 2020, 14, 12),
(13, 2019, 15, 16),
(14, 2019, 17, 15),
(15, 2019, 16, 17),
(16, 2018, 18, 19),
(17, 2018, 20, 18),
(18, 2018, 19, 20),
(19, 2023, 2, 4),
(20, 2022, 3, 6);

INSERT INTO football_data.game_stats (game_id, team_id, total_yards, total_tds, total_fgs, turnovers)
VALUES
(1, 1, 350, 3, 1, 1),
(1, 2, 280, 2, 0, 2),
(2, 3, 400, 4, 1, 1),
(2, 4, 290, 2, 2, 0),
(3, 5, 310, 3, 0, 1),
(3, 1, 320, 3, 1, 1),
(4, 2, 285, 1, 2, 3),
(4, 3, 370, 4, 0, 2),
(5, 4, 300, 3, 0, 2),
(5, 5, 250, 2, 1, 1),
(6, 6, 410, 5, 1, 1),
(6, 7, 390, 4, 2, 0),
(7, 8, 315, 3, 1, 3),
(7, 6, 295, 2, 1, 1),
(8, 9, 450, 6, 2, 1),
(8, 10, 320, 3, 0, 2),
(9, 11, 330, 3, 2, 1),
(10, 12, 300, 2, 1, 2),
(11, 13, 310, 2, 1, 1),
(12, 14, 400, 4, 1, 0);

-- Sample Data for player --
INSERT INTO football_data.player (player_id, position_id, Name)
VALUES
(1, 1, 'Patrick Mahomes'),
(2, 2, 'Derrick Henry'),
(3, 3, 'Tyreek Hill'),
(4, 4, 'Travis Kelce'),
(5, 5, 'Justin Tucker'),
(6, 1, 'Josh Allen'),
(7, 2, 'Alvin Kamara'),
(8, 3, 'Stefon Diggs'),
(9, 4, 'George Kittle'),
(10, 5, 'Harrison Butker'),
(11, 1, 'Lamar Jackson'),
(12, 2, 'Saquon Barkley'),
(13, 3, 'Davante Adams'),
(14, 4, 'Darren Waller'),
(15, 5, 'Robbie Gould'),
(16, 1, 'Aaron Rodgers'),
(17, 2, 'Jonathan Taylor'),
(18, 3, 'Justin Jefferson'),
(19, 4, 'Mark Andrews'),
(20, 5, 'Evan McPherson');

-- Sample Data for player_stats --
INSERT INTO football_data.player_stats (player_id, game_id, team_id, passing_yds, rushing_yds, receiving_yds, passing_tds, rushing_tds, receiving_tds, misc_tds, pass_attempts, completions, rush_attempts, targets, receptions, turnovers)
VALUES
(1, 1, 1, 320, 0, 0, 3, 0, 0, 0, 35, 25, 0, 0, 0, 1),
(2, 1, 2, 0, 140, 0, 0, 1, 0, 0, 0, 0, 20, 0, 0, 0),
(3, 2, 3, 0, 0, 160, 0, 0, 2, 0, 0, 0, 8, 6, 1, 0),
(4, 2, 4, 0, 0, 100, 0, 0, 1, 0, 0, 0, 7, 5, 0, 0),
(5, 3, 5, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0),
(6, 3, 1, 250, 50, 0, 2, 1, 0, 0, 30, 20, 6, 0, 0, 1),
(7, 3, 2, 0, 120, 0, 0, 2, 0, 0, 0, 0, 18, 0, 0, 1),
(8, 4, 3, 0, 0, 150, 0, 0, 1, 0, 0, 0, 10, 8, 0, 0),
(9, 4, 4, 0, 0, 85, 0, 0, 1, 0, 0, 0, 9, 7, 0, 0),
(10, 4, 5, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0),
(11, 5, 1, 295, 70, 0, 2, 1, 0, 0, 28, 18, 10, 0, 0, 2),
(12, 5, 2, 0, 130, 0, 0, 1, 0, 0, 0, 0, 22, 0, 0, 1),
(13, 5, 3, 0, 0, 110, 0, 0, 2, 0, 0, 0, 9, 7, 0, 0),
(14, 5, 4, 0, 0, 75, 0, 0, 1, 0, 0, 0, 5, 4, 0, 0),
(15, 5, 5, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0),
(16, 1, 1, 305, 0, 0, 2, 0, 0, 0, 33, 24, 0, 0, 0, 1),
(17, 2, 2, 0, 145, 0, 0, 1, 0, 0, 0, 0, 19, 0, 0, 0),
(18, 3, 3, 0, 0, 130, 0, 0, 1, 0, 0, 0, 12, 10, 0, 0),
(19, 4, 4, 0, 0, 95, 0, 0, 1, 0, 0, 0, 6, 5, 0, 0),
(20, 5, 5, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0);


-- SELECT 
--     ps.player_id,
--     CONCAT(ta.name, ' vs ', th.name, ' (', g.year, ')') AS game_description,
--     t.name AS team_name,
--     ps.passing_yds,
--     ps.rushing_yds,
--     ps.receiving_yds,
--     ps.passing_tds,
--     ps.rushing_tds,
--     ps.receiving_tds,
--     ps.misc_tds,
--     ps.pass_attempts,
--     ps.completions,
--     ps.rush_attempts,
--     ps.targets,
--     ps.receptions,
--     ps.turnovers
-- FROM 
--     football_data.player_stats ps
-- JOIN 
--     football_data.game g ON ps.game_id = g.game_id
-- JOIN 
--     football_data.team t ON ps.team_id = t.team_id
-- JOIN 
--     football_data.team ta ON g.team_away = ta.team_id
-- JOIN 
--     football_data.team th ON g.team_home = th.team_id
-- WHERE 
--     ps.player_id = 1;


