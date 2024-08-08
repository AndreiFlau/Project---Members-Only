const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  email VARCHAR (255) NOT NULL UNIQUE,
  password VARCHAR (255) NOT NULL,
  membership BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (255) NOT NULL,
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  message_content TEXT NOT NULL,
  author_id INTEGER,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_author_id ON messages(author_id);

INSERT INTO users (first_name, last_name, email, password, membership) 
VALUES
  ('MEMBER', 'Test', 'member@email.com', '123', TRUE),
  ('NONMEMBER', 'Test', 'nonmember@email.com', '123', FALSE);

INSERT INTO messages (title, message_content, author_id)
VALUES
  ('MEMBER MESSAGE', 'Hello!!! I''m a member!', 1),
  ('NONMEMBER MESSAGE', 'Hello!!! I''m NOT a member!', 2);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
