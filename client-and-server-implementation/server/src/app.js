const express = require("express");
// external package for handle CORS
const cors = require("cors");

const plannetRouter = require("./routes/planets/planets.router");

const app = express();

// Set CORS to allow origin
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json()); // parse body as JSON
app.use(plannetRouter);

module.exports = app;
