# Client and Server Implmentation with NodeJS + MongoDB Integration

In this implmentation, developing server API for frontend project. for frontend we using `React` framework and for server side we using `NodeJS` and `Express JS` for middlware.

under this i will learn,

> how to develop both Client and Server
> How to handle CORS while integrating the API to client side.
> How to Modify Header with allowing `Access-Control-Allow-Origin` to `*` or single origin
> How to use `CORS` package in `ExpressJS`

For handle `CORS` we are using following NPM package, https://www.npmjs.com/package/cors

Install Concurrently library for run both `client` and `server` together peralley. https://www.npmjs.com/package/concurrently

## Following steps you can build your frontend and serve those with NodeJS

Root `pacakge.json` following is the snippet for build production frontend code and serve from `NODEJS`

> "deploy": "npm run build --prefix client && npm run start --prefix server"

in frontend `package.json` script build script is look like following `client` directory package.json

> "build": "set BUILD_PATH=../server/public&& react-scripts build",

## For Capture LOGS of requests you can use `moran`

For more details about Morgan refer following link https://www.npmjs.com/package/morgan

## Serving Apps with Client-Side Routing

If you refresh the frontend UI then due to route different router path string `NodeJS` not going to understand so its check if any endpoint name is there then return otherwise its showing `Cannot GET /welcome`

for resolving this you need to add following to expressJS, refer React framework serving routes https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing

```
-app.get('/', function (req, res) {
+app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

```

## JEST for API testing

Jest is a delightful JavaScript Testing Framework with a focus on simplicity. do following command and install package, refer more detail about `jest` using this link https://jestjs.io/

> npm install jest --save-dev

along with this we are going to use `SuperTest` for test HTTP request, using this library we can test our HTTP requests, for more details about the library check it out this link https://www.npmjs.com/package/supertest.

Install the dependency using following command

> npm install supertest --save-dev

## MongoDB Databse usage and integration

`MongoDB` is `Document` database or we can call `NOSQL`. use this link for get to know more details about `mongoDB` https://www.mongodb.com/

> refer this link for writing script for the mongoDB https://www.mongodb.com/docs/manual/tutorial/write-scripts-for-the-mongo-shell/

> JSON vs BSON https://www.mongodb.com/json-and-bson

there are 2 ways to work with `MongoDB`, such as

> Installing Community Server and install locally and work with mongoDB, more details https://www.mongodb.com/try/download/community

> You can use `MongoDB Atlas Cloud` free tear, more details https://www.mongodb.com/atlas

## Connecting MongoDB Database to NodeJS

For this we are going to use library called `mongoose`, refer more details here https://mongoosejs.com/

> Install Mongoose package using this command `npm install mongoose --save`

and write connection in NodeJS `server.js` where your server getting listen

```
const http = require("http");
const app = require("./app");

//Mongoose package
const mongoose = require("mongoose");

const { loadPlannetData } = require("./models/planets.model");
// process.env.PORT setting envrionment variable to run application on different port
/**
 * and this is how you should set your environment variable
 * for specified the PORTS
 * package.JSON: start: "PORT=5000 node src/server.js"
 *
 */
const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://node-api-user:node-api-user@node-api-cluster.94js3yl.mongodb.net/?retryWrites=true&w=majority";
const server = http.createServer(app);

// Check MongoDB atlas connection establish using following
mongoose.connection.once("open", () => {
  console.log("MongoDB Atlas connection is ready!");
});

// Check MongoDB atlas connection failed
mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function runTheServer() {
  //connect mongodb atlas
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // LOAD THE PLANNET DATA BEFORE SERVER GET START
  await loadPlannetData();

  server.listen(PORT, () => {
    console.log("Node server is running", PORT);
  });
}

runTheServer();

```

> For writing schema in follow below URl for more details `https://mongoosejs.com/docs/guide.html`

Example of `MongoDB schema writing`

```
const mongoose = require("mongoose");

// This is how implement schema in monogdb
const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
  },
  mission: String,
  rocket: String,
  launchDate: Date,
  target: {
    type: String,
    required: true,
  },
  customer: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = {
  launchesSchema,
};

```

Follow mongoDB official documentation for `Query` documents

> https://www.mongodb.com/docs/manual/crud/
