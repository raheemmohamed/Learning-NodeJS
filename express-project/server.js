//import express module
const express = require("express");
// call express function and assign to variable
const app = express();
// specified port for run server
const PORT = 3000;

//way of configure the route in Express.JS
app.get("/", (req, res) => {
  res.send("Hello Im From Express Route");
});

app.get("/message", (req, res) => {
  res.send("<h2>Message Route</h2>");
});

// Listening Server
app.listen(PORT, () => {
  console.log(`Listening PORT ${PORT}`);
});
