DROP TABLE IF EXISTS offers CASCADE;

CREATE TABLE offers(
  id SERIAL PRIMARY KEY,
  offerer_id INT REFERENCES users(id) NOT NULL,
  title VARCHAR(255) DEFAULT NULL,
  category VARCHAR(255) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  imgurl_offer VARCHAR(255) DEFAULT NULL,
  address VARCHAR(255) DEFAULT NULL,
  available BOOLEAN DEFAULT true,
  created_at_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);