const db = require("../db/queries");

async function getHome (req, res) {
  const messages = await db.getAllMessages();
  res.render('home', { messages: messages });
}

module.exports = {
  getHome,
}