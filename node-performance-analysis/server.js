const express = require("express");
const cluster = require("cluster");

const os = require("os");

const app = express();

const PORT = 3000;

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {}
}

app.get("/", (req, res) => {
  res.send(`Performance Test ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Im late little bit ${process.pid}`);
});

// if we are use PM2 process manager 2 then we can get rid this 'if and else' statement coz PM2 will automate these.
if (cluster.isMaster) {
  console.log("Im master cluster");

  /**
   * Simple Way to create worker process manually using following way
   */
  // cluster.fork(); // creating 1st new worker process
  // cluster.fork(); // creating 2nd new wroker process

  // for create worker process based on your operative system - OS then you need to write this
  // for get maximum benefit of performance of the node App
  // Get a length of CPU cores
  const NUM_CPU = os.cpus().length;

  for (let i = 0; i < NUM_CPU; i++) {
    cluster.fork(); // creating new work process based on number of CPU
  }
} else {
  console.log("Im worker process");
  // Once master process get created listen to the server
  app.listen(PORT, () => {
    console.log("Server is running on", PORT);
  });
}

// app.listen(PORT, () => {
//   console.log("Server is running on", PORT);
// });
