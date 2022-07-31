const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    required: true,
  },
  koi_disposition: String,
  koi_insol: Number,
  koi_prad: Number,
});

// Connects planetsSchema with the "planet" collection
module.exports = mongoose.model("Planet", planetsSchema);
