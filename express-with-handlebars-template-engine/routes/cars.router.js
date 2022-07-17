const express = require("express");

const carController = require("../controllers/cars.controller");

// express router collection grouping for specific router path
const carRoutes = express.Router();

// All the routes specific to car
carRoutes.post("/addCars", carController.addNewCars);
carRoutes.get("/getAllCars", carController.getAllCars);

module.exports = carRoutes;
