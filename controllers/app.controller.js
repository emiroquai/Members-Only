const db = require("../db/queries");
const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator");
const passport = require('../configs/passport.config');
const asyncHandler = require('express-async-handler');

async function getHome (req, res) {
  const messages = await db.getAllMessages();
  res.render('home', { user: req.user , messages: messages });
}

async function getSignUp (req, res) {
  res.render("sign-up-form");
};

// Validators
const confirmPassword = [
  body('password').isLength({ min:5 }).withMessage('Password must have minimum 5 characters.'),
  body('confirmPassword').custom((value, { req }) => {
    return value === req.body.password;
  }).withMessage('Passwords must be identical')
];

async function postSignUp (req, res, next) {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up-form", {
      errors: errors.array()
    });
  }
  // Continue with the sign-up logic
  const isAdmin = req.body.isAdmin === 'true';
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {
      await db.insertNewUser( req.body.user_name, hashedPassword, isAdmin);
      res.redirect("/");
    } catch(err) {
      console.log(err);
      return next(err);
    }
  });
};

// Authenticate user
const logInUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
});

const logOutUser = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if(err)
      return next(err);
    res.redirect('/');
  });
});

module.exports = {
  getHome,
  getSignUp,
  confirmPassword,
  postSignUp,
  logInUser,
  logOutUser
}