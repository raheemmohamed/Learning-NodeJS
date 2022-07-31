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
