DROP TABLE IF EXISTS offers CASCADE;

CREATE TABLE offers(
  id SERIAL PRIMARY KEY,
  offerer_id INT REFERENCES users(id) NOT NULL,
  title VARCHAR(255) DEFAULT NULL,
  category_id INT REFERENCES categories(id) NOT NULL,
  description TEXT DEFAULT NULL,
  imgurl_offer VARCHAR(255) DEFAULT NULL,
  address_id INT REFERENCES address(id) NOT NULL,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);