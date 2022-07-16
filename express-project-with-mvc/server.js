//import express module
const express = require("express");

//import  controllers
const commonController = require("./controllers/common..controller");
const messageController = require("./controllers/messages.controller");
const plannetController = require("./controllers/plannets.controller");

// call express function and assign to variable
const app = express();
// specified port for run server
const PORT = 3000;

// Simple ExpressJS middleware -1
app.use((req, res, next) => {
  console.log(`I am from 1st Method ${req.method}, request URL: ${req.url}`);
  next();
});

//simple ExpressJS middleware - 2
app.use((req, res, next) => {
  console.log(`I am from 2nd Method ${req.method}, request URL: ${req.url}`);
  next();
});

//simple ExpressJS middleware - 3 for check how many millisecond for complete the request
app.use((req, res, next) => {
  const start = Date.now();

  next(); //After call Next()

  // here the place where need to do some action
  const delta = Date.now() - start;
  console.log(
    `I am from 3rd Method ${req.method}, request URL: ${req.url}, completion time: ${delta}Ms`
  );
});

// ExpressJs middleware for check and parses incoming requests with JSON payloads
app.use(express.json());

// Way of configure the route in Express.JS - Rout handler
app.get("/", commonController);

app.get("/message", messageController);

app.get("/plannets", plannetController.getAllPlannets);

// send URL with router parameters in EXPRESS.js
app.get("/getPlannet/:plannetIndex", plannetController.getPlannetDetailsById);

// Route for POST method to add data in to plannet collection
app.post("/plannetCollection", plannetController.addNewPlannet);

// Listening Server
app.listen(PORT, () => {
  console.log(`Listening PORT ${PORT}`);
});
