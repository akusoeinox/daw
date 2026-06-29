CREATE TABLE IF NOT EXISTS matches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  map_name TEXT,
  tournament_stage TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id INTEGER,
  team_name TEXT,
  captain TEXT
);

CREATE TABLE IF NOT EXISTS heroes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER,
  hero_name TEXT,
  role TEXT,
  kills INTEGER,
  deaths INTEGER,
  assists INTEGER,
  last_hits INTEGER,
  gpm INTEGER,
  xpm INTEGER,
  won BOOLEAN
);

CREATE TABLE IF NOT EXISTS match_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id INTEGER,
  radiant_win BOOLEAN,
  duration INTEGER,
  notes TEXT
);