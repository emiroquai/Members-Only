require('dotenv').config()
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(40) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN
  );

CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    message_text TEXT
  );

INSERT INTO users (user_name, user_password, isAdmin) VALUES
('emiroquai', 'admin', TRUE)
;

INSERT INTO messages ( user_id, message_text ) VALUES
( 1, 'Hello?' ),
( 1, 'Is there anybody out there?' )
;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_PUBLIC_URL,
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

main();