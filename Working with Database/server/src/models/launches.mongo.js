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
