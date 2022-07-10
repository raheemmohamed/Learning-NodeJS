const EventEmitter = require("events"); // importing events first
const celebrary = new EventEmitter(); //create instance or reference EventEmitter

//subscribe and checking whether anything getting change
celebrary.on("win race", (event) => {
  console.log("Congratz you win the race");
});

// emitting message
celebrary.emit("win race");
