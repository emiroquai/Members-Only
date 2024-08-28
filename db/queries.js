const pool = require("./pool");

async function getAllMessages() {
  const SQL = `
    SELECT 
      messages.message_id, 
      users.user_name, 
      messages.message_text 
    FROM
      messages
    INNER JOIN 
      users 
    ON 
      messages.user_id = users.user_id
    ORDER BY 
      messages.message_id ASC;
  `;
  const result = await pool.query(SQL);
  const messages = result.rows;
  return messages;
};

async function insertNewUser(user_name, hashedPassword, isAdmin) {
  await pool.query("INSERT INTO users (user_name, user_password, isAdmin) VALUES ($1, $2, $3)", [user_name, hashedPassword, isAdmin]);
}

module.exports = {
  getAllMessages,
  insertNewUser
};
