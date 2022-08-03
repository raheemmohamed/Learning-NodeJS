# NodeJS performance Analysis - Clustering and PM2(Process Manager 2) configuration

## Problem statement of single thread

NodeJS is `single thread` and if you have blocking code in server then until that task get complete rest of the task are not get execute. so this is big issue and server will not respond those previous task are get complete.

For resolving this issue we need to change behavior to `multi-thread` basically want to run multiple instance of the node. here is the place `cluster` is coming to picture.

![Single Thread vs Multi-thrad via clustering](https://i.imgur.com/kTAowsL.png)

for more details refer below details for `NodeJS Cluster` official documentation https://nodejs.org/docs/latest-v17.x/api/cluster.html.

for create multiple worker process then manually in your NodeJS application you need to write like this

```Javascript
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

```

For automate this we can use tool call `PM2 (Process Manager 2)` this will help us to create maximum process based on CPU. so we can get rid above `cluster.fork()` manual instance creation. more details refer below link

> https://pm2.keymetrics.io/docs/usage/quick-start/

Process Manager 2 Cheetsheet or commands

```ruby
# Fork mode
pm2 start app.js --name my-api # Name process

# Cluster mode
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total

# Listing

pm2 list               # Display all processes status
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

pm2 describe 0         # Display all informations about a specific process

pm2 monit              # Monitor all processes

# Logs

pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # Empty all log files
pm2 reloadLogs         # Reload all logs

# Actions

pm2 stop all           # Stop all processes
pm2 restart all        # Restart all processes

pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0             # Stop specific process id
pm2 restart 0          # Restart specific process id

pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list

# Misc

pm2 reset <process>    # Reset meta data (restarted time...)
pm2 updatePM2          # Update in memory pm2
pm2 ping               # Ensure pm2 daemon has been launched
pm2 sendSignal SIGUSR2 my-app # Send system signal to script
pm2 start app.js --no-daemon
pm2 start app.js --no-vizion
pm2 start app.js --no-autorestart
```
