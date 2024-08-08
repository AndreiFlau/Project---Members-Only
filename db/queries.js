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

module.exports = {
  registerUserQuery,
  joinClubQuery,
};
