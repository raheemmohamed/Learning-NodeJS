//import express module
const express = require("express");

// import routes
const carRouter = require("./routes/cars.router");
const plannetRouter = require("./routes/plannets.router");
const messageRouter = require("./routes/messages.router");

// call express function and assign to variable
const app = express();
// specified port for run server
const PORT = 3000;

//simple ExpressJS middleware - 3 for check how many millisecond for complete the request
app.use((req, res, next) => {
  const start = Date.now();

  next(); //After call Next()

  // here the place where need to do some action
  const delta = Date.now() - start;
  console.log(
    `${req.method}, request URL: ${req.url}, completion time: ${delta}Ms`
  );
});

// ExpressJs middleware for check and parses incoming requests with JSON payloads
app.use(express.json());

/**
 * load routes to a middleware function following way that will take care
 */
app.use(plannetRouter); // use normal url path as well which is defined in plannet.router.js
app.use("/cars", carRouter); // either you can path relavant path "/cars/getAllCars"
app.use(messageRouter);

// Listening Server
app.listen(PORT, () => {
  console.log(`Listening PORT ${PORT}`);
});
