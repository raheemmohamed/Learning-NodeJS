const model = require("../../models/planets.model");

async function getAllPlannets(req, res) {
  return res.status(200).json(await model.getAllPlannets());
}

module.exports = {
  getAllPlannets,
};
