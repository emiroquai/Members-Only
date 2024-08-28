const db = require("../db/queries");
const bcrypt = require("bcryptjs")

async function getHome (req, res) {
  const messages = await db.getAllMessages();
  res.render('home', { user: req.user , messages: messages });
}

async function getSignUp (req, res) {
  res.render("sign-up-form");
};

async function postSignUp (req, res) {
  const isAdmin = req.body.isAdmin === 'true';
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {
      await db.insertNewUser( req.body.user_name, hashedPassword, isAdmin);
      res.redirect("/");
    } catch(err) {
      console.log(err);
      // return next(err);
    }
  });
};



module.exports = {
  getHome,
  getSignUp,
  postSignUp,
}