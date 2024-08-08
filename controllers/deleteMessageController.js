const asyncHandler = require("express-async-handler");
const { createMessageQuery, deleteMessageQuery } = require("../db/queries");
require("dotenv").config();

exports.deleteMessagePost = asyncHandler(async (req, res) => {
  const user = req.user;
  const messageId = req.params.id;
  if (user.admin) {
    await deleteMessageQuery(messageId);
    res.redirect("/");
  }
});
