const model = require("../../models/planets.model");

function getAllPlannets(req, res) {
  return res.status(200).json(model.plannets);
}

module.exports = {
  getAllPlannets,
};
