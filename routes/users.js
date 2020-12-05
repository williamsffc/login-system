const mongoose = require("mongoose");
const User = require("../models/user");
const express = require("express");
const { route } = require(".");
const { render } = require("ejs");
const router = express.Router();

//Login handle
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

//Register handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  console.log(" Name " + name + " email : " + email + " pass : " + password);

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //Check if match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match." });
  }

  // check is password is more than 6 characters
  if (password.length > 6) {
    errors.push({
      msg: "Password should be at least 6 characters, try again.",
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2,
    });
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({ msg: "Email is already registered." });
        render(res, errors, name, email, password, passwords2);
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });
      }
    });
  }
});

router.post("/login", (req, res, next) => {});

//Logout
router.get("/logout", (req, res) => {});

module.exports = router;
