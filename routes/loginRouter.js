const { Router } = require("express");
const passport = require("passport");
const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  res.render("log-in", { errors: req.flash("error") });
});

loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureFlash: true,
  })
);

module.exports = loginRouter;
