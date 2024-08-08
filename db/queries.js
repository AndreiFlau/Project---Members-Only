const pool = require("./pool");

async function registerUserQuery(firstName, lastName, email, password) {
  await pool.query(
    `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1,$2,$3,$4)`,
    [firstName, lastName, email, password]
  );
}

async function joinClubQuery(id) {
  await pool.query(
    `
    UPDATE users
    SET membership = true
    WHERE users.id = ($1)  
    `,
    [id]
  );
}

async function createMessageQuery(title, message, id) {
  await pool.query(
    `
    INSERT INTO messages(title, message_content, author_id)
    VALUES ($1, $2, $3);
    `,
    [title, message, id]
  );
}

async function getAllMessages() {
  const { rows } = await pool.query(
    `
    SELECT * FROM messages
    JOIN users ON author_id = users.id;
    `
  );
  return rows.map((message) => ({
    title: message.title,
    message: message.message_content,
    timestamp: message.time,
    author: message.first_name + " " + message.last_name,
  }));
}

module.exports = {
  registerUserQuery,
  joinClubQuery,
  createMessageQuery,
  getAllMessages,
};
