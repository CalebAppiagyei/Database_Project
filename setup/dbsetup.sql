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
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
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
(2019, 16),
(2020, 16),
(2021, 17),
(2022, 17),
(2023, 17);

INSERT INTO football_data.coach (coach_id, first_name, last_name)
VALUES
(1, 'John', 'Doe'),
(2, 'Coach', 'Ryan'),
(3, 'Coach', 'Katelyn'),
(4, 'Coach', 'Johanna'),
(5, 'Coach', 'Caleb');

INSERT INTO football_data.team (team_id, year, coach_id, conference_id, name)
VALUES
(1, 2023, 1, 2, 'Arizona Cardinals'),
(2, 2023, 2, 2, 'Atlanta Falcons'),
(3, 2023, 3, 1, 'Baltimore Ravens'),
(4, 2023, 4, 1, 'Buffalo Bills'),
(5, 2023, 5, 2, 'Carolina Panthers');

INSERT INTO football_data.position (position_id, position_name)
VALUES
(1, 'Quarterback'),
(2, 'Runningback'),
(3, 'Wide Receiver'),
(4, 'Tight end'),
(5, 'Kicker');

INSERT INTO football_data.game (game_id, year, team_home, team_away)
VALUES
(1, 2023, 1, 2),
(2, 2023, 3, 4),
(3, 2023, 5, 1),
(4, 2023, 2, 3),
(5, 2023, 4, 5);

INSERT INTO football_data.game_stats (game_id, team_id, total_yards, total_tds, total_fgs, turnovers)
VALUES
(1, 1, 350, 3, 1, 1),
(1, 2, 280, 2, 0, 2),
(2, 3, 400, 4, 1, 1),
(2, 4, 290, 2, 2, 0),
(3, 5, 310, 3, 0, 1);

-- Sample Data for player --
INSERT INTO football_data.player (player_id, position_id, first_name, last_name)
VALUES
(1, 1, 'Patrick', 'Mahomes'),
(2, 2, 'Derrick', 'Henry'),
(3, 3, 'Tyreek', 'Hill'),
(4, 4, 'Travis', 'Kelce'),
(5, 5, 'Justin', 'Tucker');

-- Sample Data for player_stats --
INSERT INTO football_data.player_stats (player_id, game_id, team_id, passing_yds, rushing_yds, receiving_yds, passing_tds, rushing_tds, receiving_tds, misc_tds, pass_attempts, completions, rush_attempts, targets, receptions, turnovers)
VALUES
(1, 1, 1, 320, 0, 0, 3, 0, 0, 0, 35, 25, 0, 0, 0, 1),
(2, 1, 2, 0, 140, 0, 0, 1, 0, 0, 0, 0, 20, 0, 0, 0),
(3, 2, 3, 0, 0, 160, 0, 0, 2, 0, 0, 0, 0, 8, 6, 1),
(4, 2, 4, 0, 0, 100, 0, 0, 1, 0, 0, 0, 0, 7, 5, 0),
(5, 3, 5, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0);