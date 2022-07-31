const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();

const launch = {
  flightNumber: "100",
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("July 30, 2022"),
  target: "Kepler-296 A f",
  customer: ["NASA"],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);
saveLaunches(launch);

async function saveLaunches(launch) {
  try {
    // check selected save launch plannet have data in plannet collection
    // Maintain referal integrity
    const planet = await planets.findOne({
      kepler_name: launch.target,
    });
    //if the plannet is not exist then throw error
    if (!planet) {
      throw new Error("No matching planet founds");
    }

    await launchesDatabase.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Could not save Launches ${error}`);
  }
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function addNewlaunches(launch) {
  const randomNumber = Number(await getLatestFlightNumber()) + 1;

  const newLaunch = {
    flightNumber: randomNumber.toString(),
    ...launch,
    customer: ["NASA"],
    upcoming: true,
    success: true,
  };

  saveLaunches(newLaunch);
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    const defaultFlightNumber = 100;
    return defaultFlightNumber;
  }

  return latestLaunch.flightNumber;
}

async function checkExistLaunchById(id) {
  return await launchesDatabase.findOne({
    flightNumber: id,
  });
}

async function abortLaunchById(id) {
  const abortLaunch = await launchesDatabase.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return abortLaunch;
}

module.exports = {
  launches,
  getAllLaunches,
  addNewlaunches,
  checkExistLaunchById,
  abortLaunchById,
};
