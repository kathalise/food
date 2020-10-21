DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages(
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) NOT NULL,
  product_id INT REFERENCES offers(id) NOT NULL,
  recipient_id  INT REFERENCES users(id) NOT NULL,
  message_text VARCHAR NOT NULL,
  msg_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);