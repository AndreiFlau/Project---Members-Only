const { Router } = require("express");
const { registerGet } = require("../controllers/registerController");
const registerRouter = Router();

registerRouter.get("/", registerGet);

module.exports = registerRouter;
