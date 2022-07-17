const carModel = require("../models/cars.model");

function addNewCars(req, res) {
  if (!req.body.name) {
    return res.status(400).json({ error: "car name is empty" });
  }

  const newCarEnrty = {
    id: carModel.length,
    name: req.body.name,
  };

  carModel.push(newCarEnrty);

  res.json({
    success: `Your New Car ${newCarEnrty.name} is added successfully`,
  });
}

function getAllCars(req, res) {
  res.status(200).json(carModel);
}

module.exports = {
  addNewCars,
  getAllCars,
};
