CREATE TABLE users (
  net_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  last_login TIMESTAMPTZ DEFAULT now(),
  completed_lessons TEXT[] NOT NULL DEFAULT ARRAY[]::text[],
);