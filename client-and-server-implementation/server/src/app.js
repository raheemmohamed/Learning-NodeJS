const express = require("express");
// external package for handle CORS
const cors = require("cors");

//PATH
const path = require("path");

const plannetRouter = require("./routes/planets/planets.router");

const app = express();

// Set CORS to allow origin
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json()); // parse body as JSON

// load frontend static build
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(plannetRouter);

// If root path then load the frontend build index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
