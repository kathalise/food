DROP TABLE IF EXISTS address CASCADE;

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  city VARCHAR(255) NOT NULL
);