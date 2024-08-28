require('dotenv').config()
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs")
const app = express();
const path = require("path");
const indexRouter = require('./routes/indexRouter');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log(`Inventory Application - listening on port ${port}!`));