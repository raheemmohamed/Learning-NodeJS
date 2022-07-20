const express = require("express");

const plannetRouter = require("./routes/planets/planets.router");

const app = express();
app.use(express.json()); // parse body as JSON

app.use(plannetRouter);

module.exports = app;
