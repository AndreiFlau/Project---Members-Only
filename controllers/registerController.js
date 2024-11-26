const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { registerUserQuery } = require("../db/queries");
require("dotenv").config();

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email").trim().isEmail().withMessage("Must be a proper email."),
  body("password").trim().isLength({ min: 6, max: 30 }).withMessage("Password must be have at least 6 characters."),
  body("confirmpassword")
    .trim()
    .isLength({ min: 6, max: 30 })
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords don't match."),
  body("admin")
    .customSanitizer((value) => {
      return value === "" ? undefined : value;
    })
    .optional()
    .custom((value, { req }) => {
      if (value !== process.env.ADMINPASS) {
        throw new Error("Wrong ADMIN password.");
      }
      return true;
    }),
];

exports.registerGet = asyncHandler(async (req, res) => {
  res.render("registerUser");
});

exports.registerPost = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("registerUser", {
        errors: errors.array(),
      });
    }
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          console.log(err.message);
        }
        // otherwise, store hashedPassword in DB
        const { firstName, lastName, email } = req.body;
        let admin = false;
        if (req.body.admin === process.env.ADMINPASS) {
          admin = true;
        }
        await registerUserQuery(firstName, lastName, email, hashedPassword, admin);
      });
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  }),
];
