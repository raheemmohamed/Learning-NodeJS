// Importing http module
const http = require("http");

//Using `request` method to get data
const req = http.request("http://www.google.com", function (response) {
  console.log("res", response);
  // listener for `response` event
  response.on("data", function (chunk) {
    console.log(`Successfully Load the chunk ${chunk}`);
  });

  // listener for `end` once the request is complete listen this
  response.on("end", function () {
    console.log("No Data for Load");
  });
});

// if any error occured while request server then throw the error message
req.on("error", function (error) {
  console.log(`Problem with request ${error}`);
});

// everythings are done then `end` it. becuase this `req.end()` require becuase we are using `http.request`
req.end();
