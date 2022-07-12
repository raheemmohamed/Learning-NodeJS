//import express module
const express = require("express");
// call express function and assign to variable
const app = express();
// specified port for run server
const PORT = 3000;

const plannets = [
  { id: 0, name: "plannet 1" },
  { id: 1, name: "plannet 2" },
  { id: 2, name: "plannet 3" },
  { id: 3, name: "plannet 4" },
];

// Simple ExpressJS middleware
app.use((req, res, next) => {
  console.log(`Method ${req.method}, request URL: ${req.url}`);
  next();
});

// Way of configure the route in Express.JS - Rout handler
app.get("/", (req, res) => {
  res.send("Hello Im From Express Route");
});

app.get("/message", (req, res) => {
  res.send("<h2>Message Route</h2>");
});

app.get("/plannets", (req, res) => {
  // one way of return response as a JSON
  //res.json(plannets);

  // second way of update status and return response as a JSON
  res.status(200).json(plannets);
});

// send URL with router parameters in EXPRESS.js
app.get("/getPlannet/:plannetIndex", (req, res) => {
  // taking a url param and assign in to local variable
  const plannetId = req.params.plannetIndex;
  const plannet = plannets[plannetId];

  // check `plannet` is true..
  if (plannet) {
    res.status(200).json(plannet);
  } else {
    // if it is false them set status message and send message..
    res.status(404).json({
      error: "Plannet Not found",
    });
  }
});

// Listening Server
app.listen(PORT, () => {
  console.log(`Listening PORT ${PORT}`);
});
