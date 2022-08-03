const fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();

const PORT = 3000;

app.use(helmet());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.get("/secret", (req, res) => {
  res.send("Hey My value is 42 is this secure ?");
});

//app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"), // file system required for access file
      cert: fs.readFileSync("cert.pem"), // file system required for access file
    },
    app // our express middleware
  )
  .listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
