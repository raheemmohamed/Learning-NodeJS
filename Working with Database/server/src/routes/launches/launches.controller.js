const launchesModel = require("../../models/launches.model");

async function getAllLaunches(req, res) {
  return res.status(200).json(await launchesModel.getAllLaunches());
}

async function createNewLaunch(req, res) {
  const body = req.body;
  console.log("Check my req", req.body);

  await launchesModel.addNewlaunches(body);

  return res.status(201).json(body);
}

async function abortLaunch(req, res) {
  const launchId = req.params.id;
  const existsLaunch = await launchesModel.checkExistLaunchById(launchId);
  console.log("Launch Id", launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      message: "Launch is Not Exist",
      res: launchId,
    });
  }

  const aborted = await launchesModel.abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  getAllLaunches,
  createNewLaunch,
  abortLaunch,
};
