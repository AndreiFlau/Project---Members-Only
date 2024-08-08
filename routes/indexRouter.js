const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  const messages = req.allMessages;
  console.log(messages);

  res.render("index", { user: req.user, messages: messages });
});

indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = indexRouter;
