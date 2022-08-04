const fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");
const helmet = require("helmet");

// we dont need to assign in to constant
require("dotenv").config({ path: "./environment/.env" });

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

const PORT = 3000;

// Google Authentication config
const config = {
  GOOGLE_CLIENT_ID: process.env.CLIENT_ID, // this is coming from environment/.env and its google clientID
  GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET, // this is coming from environment/.env and its google CLIENT_SECRET
};
console.log("Auth Config", config);

const AUTH_OPTIONS = {
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

console.log("AUTH Options", AUTH_OPTIONS);

function verifyCallBack(accessToken, refreshToken, profile, done) {
  console.log("profile", profile);
  // first param for error and second for success
  done(null, profile);
}

//passport use google strategy
passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallBack));

app.use(helmet());

// initialize passport middlware
app.use(passport.initialize());

/**
 * ===================================================
 * Google Social Sign on implementation routes :START
 * ===================================================
 */

// function will check whether user logged
function checkedLoggedIn(req, res, next) {
  const isLogged = true;
  if (!isLogged) {
    return res.status(401).json({
      error: "You must log in!",
    });
  }
  next();
}

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
  (req, res) => {
    res.send("Google Login Page");
  }
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log("Google Called us back");
  }
);

app.get("/auth/logout", (req, res) => {});

/**
 * ===================================================
 * Google Social Sign on implementation routes :END
 * ===================================================
 */
//failure route
app.get("/failure", checkedLoggedIn, (req, res) => {
  return res.send("Failed to log in!");
});

// Checking whether user logged ("Route path", second middleware function, callback)
app.get("/secret", checkedLoggedIn, (req, res) => {
  res.send("Hey My value is 42 is this secure ?");
});
// Root Path
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

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
