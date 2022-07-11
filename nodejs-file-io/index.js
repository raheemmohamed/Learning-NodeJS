const fs = require("fs");
const { parse } = require("csv-parse");

const result = [];
/*filesystem having `createReadStream` for read csv file nodeJS 
and using pipe combine all the stram to one and use `parse` to write stramable and convert in to objects */
fs.createReadStream("kepler_data.csv")
  .pipe(
    //calling
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    result.push(data);
  })
  .on("error", (err) => {
    console.error(err.message);
  })
  .on("end", () => {
    console.log("File Data", result);
  });
