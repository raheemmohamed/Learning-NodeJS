const launchesModel = require("../../models/launches.model");

function getAllLaunches(req, res) {
  return res.status(200).json(launchesModel.getAllLaunches());
}

function createNewLaunch(req, res) {
  const body = req.body;
  console.log("Check my req", req.body);

  launchesModel.addNewlaunches(body);

  return res.status(201).json(body);
}

function abortLaunch(req, res) {
  const launchId = req.params.id;
  console.log("Launch Id", launchId);
  if (!launchesModel.checkExistLaunchById(launchId)) {
    return res.status(404).json({
      message: "Launch is Not Exist",
      res: launchId,
    });
  }

  const aborted = launchesModel.abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  getAllLaunches,
  createNewLaunch,
  abortLaunch,
};
