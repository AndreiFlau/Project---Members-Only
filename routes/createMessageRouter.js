const { Router } = require("express");
const { createMessageGet, createMessagePost } = require("../controllers/createMessageController");
const createMessageRouter = Router();

createMessageRouter.get("/", createMessageGet);
createMessageRouter.post("/", createMessagePost);

module.exports = createMessageRouter;
