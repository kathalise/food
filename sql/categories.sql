DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- INSERT INTO categories (id, name) VALUES (1, 'Beverage');
-- INSERT INTO categories (id, name) VALUES (2, 'Dairy');
-- INSERT INTO categories (id, name) VALUES (3, 'Grains');
-- INSERT INTO categories (id, name) VALUES (4, 'Guilty Pleasures');
-- INSERT INTO categories (id, name) VALUES (5, 'Fruit');
-- INSERT INTO categories (id, name) VALUES (6, 'Fish');
-- INSERT INTO categories (id, name) VALUES (7, 'Meat');
-- INSERT INTO categories (id, name) VALUES (8, 'Vegetables');
