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
