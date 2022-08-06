const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

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
      .on("data", (data) => {
        if (pullOnlyHabitablePlannets(data)) {
          plannets.push(data);
        }
      })
      .on("error", (err) => {
        console.error(err.message);
        reject(err.message);
      })
      .on("end", () => {
        resolve();
      });
  });
}

module.exports = {
  loadPlannetData,
  plannets: plannets,
};
