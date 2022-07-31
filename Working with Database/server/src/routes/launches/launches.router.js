const express = require("express");
const launchController = require("./launches.controller");

// Express router middleware
const launchRouter = express.Router();

// router http method Argument("PATH", controllerName);
launchRouter.get("/launches", launchController.getAllLaunches);

launchRouter.post("/createLaunch", launchController.createNewLaunch);

launchRouter.delete("/abortLaunch/:id", launchController.abortLaunch);

// export then its available to use of outside modules
module.exports = launchRouter;
