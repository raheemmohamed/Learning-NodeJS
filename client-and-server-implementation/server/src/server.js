const http = require("http");
const app = require("./app");
// process.env.PORT setting envrionment variable to run application on different port
/**
 * and this is how you should set your environment variable
 * for specified the PORTS
 * package.JSON: start: "PORT=5000 node src/server.js"
 *
 */
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Node server is running", PORT);
});
