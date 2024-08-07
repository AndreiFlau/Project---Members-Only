const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.registerGet = asyncHandler(async (req, res, next) => {
  res.render("registerUser");
});
