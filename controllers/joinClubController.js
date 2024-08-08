const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { joinClubQuery } = require("../db/queries");
require("dotenv").config();

const validatePass = [
  body("secretpass")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== process.env.SECRETPASS) {
        throw new Error("Incorrect Password");
      }
      return true;
    }),
];

exports.joinClubGet = asyncHandler(async (req, res) => {
  res.render("join-club", { user: req.user });
});

exports.joinClubPost = [
  validatePass,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const id = req.user.id;
    if (!errors.isEmpty()) {
      return res.status(400).render("join-club", { errors: errors.array() });
    }
    await joinClubQuery(id);
    res.redirect("/");
  }),
];
