const express = require("express");
const plannetController = require("./planets.controller");

// Express router middleware
const plannetRouter = express.Router();

// router http method Argument("PATH", controllerName);
plannetRouter.get("/plannets", plannetController.getAllPlannets);

// export then its available to use of outside modules
module.exports = plannetRouter;
