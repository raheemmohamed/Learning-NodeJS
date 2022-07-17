// import nodeJS inbuild path module for load images public directory
const path = require("path");

function getMessage(req, res) {
  const publicPath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "nodejs.png"
  );
  res.sendFile(publicPath);
  // res.send("<h2>Message Route</h2>");
}

module.exports = getMessage;
