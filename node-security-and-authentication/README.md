# Node Security + Authentication

Normally for Data Encryption we need Digital Certificates such as `SSL`, `TLS`.

> SSL Stand for (Secure Socket Layer)
> TLS stand for (Transport Layer Security)

## Why we need Digital certificate like SSL TLS ?

This is used to verify the server's ownership prior to sending encrypted data. these `Digital Certificates` are those are signed by `Certificate Authority`

> `Digital Certificate` : verify the server's ownership prior to sending encrypted data
> `Certificate Authority` : A trusted Organization that issue `Digital Certificates`

For Developed purpose to make secure we need certificate call `Self-Signed Cerificate`

> `Self-Signed Certificate`: Enable Https but not trusted by others. `useful for development`.

for production we need to use `CA-signed Certificate`

> `CA-Signed Certificate` : Trusted by most clients on the web. `useful for production`

## Free Ceritificate Authority Allow us to sign cerificates free

That is provide by `Let's Encrypt` and it's totally free, many legends companies are backed with this project. more information refer following documentation https://letsencrypt.org/

> Let’s Encrypt is a free, automated, and open certificate authority (CA), run for the public’s benefit. It is a service provided by the Internet Security Research Group (ISRG).

## Create your `Self-Signed Certificate` using following way

Enable Https but not trusted by others. `useful for development`.

Refer OpenSSL Official Documentation for more details https://www.openssl.org/.

> Make sure you have installed `GIT` in your PC

After that use following command for `Create Private Key` and `Certificate` using `OpenSSL`

> openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 5000

```
req               //requesting
-x509             // code for create `Self-Signed Certificate`
-newkey           // create new key
rsa:4096          // is algorith to create type of format of private key
-nodes            // allow us to access private key without asking any credintials
-keyout key.pem   // key should generate on this name `key.pem`
-out cert.pem     // specify out cerificate output file, certificate is public
-days 365         // how long certificate valid for defualt is 30 days but you can specify the days
```

Following is the codesnippet for make our local development environment encrypted with SSL `server.js`

```javascript
const fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.get("/secret", (req, res) => {
  res.send("Hey My value is 42 is this secure ?");
});

//app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// using inbuild http method for creating server
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"), // file system required for access file
      cert: fs.readFileSync("cert.pem"), // file system required for access file
    },
    app // our express middleware
  )
  .listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
```

## Securing a Node servers from common issues using `HELMET` library

helmet is widely used npm package that contain collections of middleware, that help us to secure server. refer official documentation using following link https://helmetjs.github.io/

> Helmet helps you secure your Express apps by setting various HTTP headers. `It's not a silver bullet, but it can help!`

### Quick start

First, run `npm install helmet --save` for your app. Then, in an Express app:

```javascript
const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());
```

## What is JWT (JSON WEB TOCKEN) ?

JSON web tocken in know `JWT`, it a type of `access token`. access token much like `API keys`. they uniquely identified specific user of the application. more than that they act as a set of credinitials for users. grant access to API.

> more information refer `JWT` official documentation using following link https://jwt.io/

## Google Oauth2

Secure way to implement Sign on is keeping everything on giants servers such as Google OAuth2, for more details refer following below link

> https://developers.google.com/identity/protocols/oauth2

## Passport

`Passport is authentication middleware for Node.js`. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support `authentication` using a `username and password`, `Facebook`, `Twitter`, and more.

> https://www.passportjs.org/

you can see bunch of libraries passport will provide us for implement simple logins. `check it out package for impplement google oauth2`

> https://www.passportjs.org/packages/passport-google-oauth20/

install using following command

> `npm install passport-google-oauth20`

and also you want to install following passport package

> `npm install passport`  
> `npm install passport-local` // for local username and password implementation from your application side

more details refer following link https://www.passportjs.org/tutorials/password/verify/

## dotenv package for secure our application API key and secret codes

Load environment variable .env file into process.env in nodeJS application. so this will keep our code API and secret key code secure and without exposure to outside.

refer more details using official dotenv documentation `https://www.npmjs.com/package/dotenv`, anyway install this package using following command

> npm install dotenv --save

## Passport Authentication implementation with Google OAuth2

in your server.js code snippet

```javascript
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

// Google Authentication config
const config = {
  GOOGLE_CLIENT_ID: process.env.CLIENT_ID, // this is coming from environment/.env and its google clientID
  GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET, // this is coming from environment/.env and its google CLIENT_SECRET
};

// Passport auth options
const AUTH_OPTIONS = {
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

function verifyCallBack(accessToken, refreshToken, profile, done) {
  console.log("profile", profile);
  // first param for error and second for success
  done(null, profile);
}

//passport use google strategy
passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallBack));

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
```

please note following is use for auth verification, this should pass in to your router, then when user access this router path then this will automatically check and redirect to google sign in page if user not logged in

```javascript
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
  (req, res) => {
    res.send("Google Login Page");
  }
);
```

## Session implementation in NodeJS Express

### express-session for server side session

for remember our user is logged in to our server then we need to use another middleware name called `express-session` for more details about this middleware refer this link https://www.npmjs.com/package/express-session

> npm install express-session

along with this we are going to use `cookie-session`

Simple cookie-based session middleware.

## What is Cookie-session ?

Cookie is for client side session

> Refer official Github repo:- https://github.com/expressjs/cookie-session

A user session can be stored in two main ways with cookies: on the server or on the client. This module stores the session data on the client within a cookie, while a module like `express-session` stores only a session identifier on the client within a cookie and stores the session data on the server, typically in a database.

The following points can help you choose which to use:

> `cookie-session` does not require any database / resources on the server side, though the total session data cannot exceed the browser's max cookie size.
> `cookie-session` can simplify certain load-balanced scenarios.
> `cookie-session` can be used to store a "light" session and include an identifier to look up a database-backed secondary store to reduce database lookups.

install using following command

> npm install cookie-session

## Session Implementation in this application

For implment session we used `passport js` and `cookie-session`. please note cookie-session is keep session in client and send it to server. then based on cookie `passport` will serializeUser and deserializeUser to set and read the cookie data. anyway for this we have to do some configuration.

> `passport js session configuration`: https://www.passportjs.org/concepts/authentication/sessions/
> `cookie-session` : http://expressjs.com/en/resources/middleware/cookie-session.html

As per the passport we implement using following way with the help of `cookie-session` package. more details refer above mentioned links

```javascript
const cookieSession = require("cookie-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log("Check passport serializeUser", user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("Check passport DeserializeUser", user);
  done(null, user);
});
```
