const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

const planets = require("./planets.mongo");

const plannets = [];

const dataPath = path.join(__dirname, "..", "data", "kepler_data.csv");

function pullOnlyHabitablePlannets(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
/*filesystem having `createReadStream` for read csv file nodeJS 
and using pipe combine all the stram to one and use `parse` to write stramable and convert in to objects */

function loadPlannetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(dataPath)
      .pipe(
        //calling
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (pullOnlyHabitablePlannets(data)) {
          savePlanets(data);
          // plannets.push(data);
        }
      })
      .on("error", (err) => {
        console.error(err.message);
        reject(err.message);
      })
      .on("end", async () => {
        const countPlanets = (await getAllPlannets()).length;
        console.log(`${countPlanets} found in database`);
        resolve();
      });
  });
}

async function savePlanets(planet) {
  try {
    // insert + update = upsert, otherwise alway document get create, when server restart each time
    // for resolving using  (upsert)
    await planets.updateOne(
      {
        kepler_name: planet.kepler_name,
        koi_disposition: planet.koi_disposition,
        koi_insol: planet.koi_insol,
        koi_prad: planet.koi_prad,
      },
      {
        // if first object saying if data is not exist updated whatever coming from CSV
        kepler_name: planet.kepler_name,
        koi_disposition: planet.koi_disposition,
        koi_insol: planet.koi_insol,
        koi_prad: planet.koi_prad,
      },
      {
        upsert: true, // this will help to add plannets data if that is doesnt already exist
      }
    );
  } catch (error) {
    console.error(`Could not save plannet ${error}`);
  }
}

async function getAllPlannets() {
  //second object is [projection] passing some properties we can not to show in the response
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

module.exports = {
  loadPlannetData,
  getAllPlannets,
  plannets: plannets,
};
