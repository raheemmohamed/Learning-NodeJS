const launches = new Map();

const launch = {
  flightNumber: "100",
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("July 30, 2022"),
  target: "Kepler-442 b",
  customer: ["NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewlaunches(launch) {
  const randomNumber = Math.round(Math.random() * 100);

  const newLaunch = {
    flightNumber: randomNumber.toString(),
    ...launch,
    customer: ["NASA"],
    upcoming: true,
    success: true,
  };

  launches.set(newLaunch.flightNumber, newLaunch);
}

function checkExistLaunchById(id) {
  return launches.has(id);
}

function abortLaunchById(id) {
  const abort = launches.get(id);
  abort.upcoming = false;
  abort.success = false;

  console.log("Check my abort", abort);
  return abort;
}

module.exports = {
  launches,
  getAllLaunches,
  addNewlaunches,
  checkExistLaunchById,
  abortLaunchById,
};
