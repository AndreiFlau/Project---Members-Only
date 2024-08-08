const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const registerRouter = require("./routes/registerRouter");
const flash = require("connect-flash");
const app = express();
const passport = require("passport");
const session = require("express-session");
const auth = require("./middleware/auth");
const loginRouter = require("./routes/loginRouter");
const joinClubRouter = require("./routes/joinclubRouter");
const createMessageRouter = require("./routes/createMessageRouter");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set(("views", path.join(__dirname, "views")));
app.set("view engine", "ejs");
app.use(session({ secret: process.env.COOKIESECRET, resave: false, saveUninitialized: false }));
app.use(flash());
auth(app);

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/log-in", loginRouter);
app.use("/join-club", joinClubRouter);
app.use("/create-message", createMessageRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
