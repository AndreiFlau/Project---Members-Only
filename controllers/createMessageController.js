const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { createMessageQuery } = require("../db/queries");
require("dotenv").config();

const validateMessage = [
  body("title").escape().isLength({ min: 1, max: 40 }).withMessage("Title either too short or too long."),
  body("userMessage").escape().isLength({ min: 10, max: 500 }).withMessage("Message either too short or too long."),
];

exports.createMessageGet = asyncHandler(async (req, res) => {
  res.render("create-message", { user: req.user });
});

exports.createMessagePost = [
  validateMessage,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("create-message", { user: req.user, errors: errors.array() });
    }
    const id = req.user.id;
    const message = req.body.userMessage;
    const title = req.body.title;
    //timestamp is handled by the sql
    await createMessageQuery(title, message, id);
    res.redirect("/");
  }),
];
