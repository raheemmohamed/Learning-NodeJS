//import express module
const express = require("express");
const path = require("path");

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
 * Load static website pages *path.join(__dirname, "public")
 */
app.use("/site", express.static(path.join(__dirname, "public")));

/** Set View Engine to NodeJS*/
app.set("view engine", "hbs");
// Set where all view files are includes
app.set("views", "views");

// serve the index.hbs once hit localhost:3000
app.get("/", (req, res) => {
  //using res.render and pass index and in the object in second Arg setting {title: "title", caption: "caption name"}
  res.render("index", {
    title: "Welcome to NodeJS",
    caption: "Hello Everyone, Welcome to NodeJS World",
  });
});

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
