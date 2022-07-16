# Express JS moduler router configuration

In this coding you can see grouping all different router collections to one groups

## Refer Express JS official documentation for router structoring

http://expressjs.com/en/guide/routing.html

Refer `express.router` section

## express.Router

Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

The following example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.

Create a router file named birds.js in the app directory, with the following content:

#### Folder PATH:- routes/cars.router.js -code is look like below. and export as moduler

```
// import express
const express = require("express");
//controller
const carController = require("../controllers/cars.controller");

// express router collection grouping for specific router path
const carRoutes = express.Router();

// All the routes specific to car
carRoutes.post("/addCars", carController.addNewCars);
carRoutes.get("/getAllCars", carController.getAllCars);

module.exports = carRoutes;

```

#### Folder PATH:-

```
//import express module
const express = require("express");

// call express function and assign to variable
const app = express();

// import routes
const carRouter = require("./routes/cars.router");

// load it to a middleware function
app.use("/cars", carRouter);

```
