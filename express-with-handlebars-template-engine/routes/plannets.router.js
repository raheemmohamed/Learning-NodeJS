//import express module
const express = require("express");

// import express router
const plannetRouter = express.Router();

// import plannet controller
const plannetController = require("../controllers/plannets.controller");

plannetRouter.get("/plannets", plannetController.getAllPlannets);

// send URL with router parameters in EXPRESS.js
plannetRouter.get(
  "/getPlannet/:plannetIndex",
  plannetController.getPlannetDetailsById
);

// Route for POST method to add data in to plannet collection
plannetRouter.post("/plannetCollection", plannetController.addNewPlannet);

plannetRouter.get("/renderPlannets", plannetController.renderPlannets);

module.exports = plannetRouter;
