const { Router } = require("express");
const { joinClubGet, joinClubPost } = require("../controllers/joinClubController");
const joinClubRouter = Router();

joinClubRouter.get("/", joinClubGet);
joinClubRouter.post("/", joinClubPost);

module.exports = joinClubRouter;
