// Import Plannet Models
const plannetModel = require("../models/plannets.model");

function getAllPlannets(req, res) {
  // one way of return response as a JSON
  //res.json(plannets);

  // second way of update status and return response as a JSON
  res.status(200).json(plannetModel);
}

function getPlannetDetailsById(req, res) {
  // taking a url param and assign in to local variable
  const plannetId = req.params.plannetIndex;
  const plannet = plannetModel[plannetId];

  // check `plannet` is true..
  if (plannet) {
    res.status(200).json(plannet);
  } else {
    // if it is false them set status message and send message..
    res.status(404).json({
      error: "Plannet Not found",
    });
  }
}

function addNewPlannet(req, res) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Plannet name is missed" });
  }

  const newPlannetData = { id: plannetModel.length, name: req.body.name };
  plannetModel.push(newPlannetData);

  res.json(newPlannetData);
}

module.exports = {
  getAllPlannets,
  getPlannetDetailsById,
  addNewPlannet,
};
