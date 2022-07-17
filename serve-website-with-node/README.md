# Express JS serve static file with NodeJS

In this code you can see `public` folder which is contain static files for serve with nodeJS. use following way to server static file through NodeJS.

> FileName: server.js

```

//import express module
const express = require("express");
const path = require("path");

// call express function and assign to variable
const app = express();

/**
 * Load static website pages *path.join(__dirname, "public")
 */
app.use("/static", express.static(path.join(__dirname, "public")));

```

Then you can call this via below mentioned URL

```
http://localhost:3000/static/index.html
```
