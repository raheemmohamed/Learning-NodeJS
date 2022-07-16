const express = require("express");
// import message controller
const messageController = require("../controllers/messages.controller");
// import express router
const messageRouter = express.Router();

/**
 * Writing custom middleware only for specific router so this will not apply to others
 * and this middleware only specific to this route
 */
messageRouter.use((req, res, next) => {
  console.log("check the IP Address", req.ip);
  next();
});

messageRouter.get("/message", messageController);

// exporting the module
module.exports = messageRouter;
