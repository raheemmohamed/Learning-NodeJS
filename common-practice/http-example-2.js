// Importing http module and destructor get http.get();
const { get } = require("http");

const req = get("http://jsonplaceholder.typicode.com/posts", (response) => {
  response.on("data", (chunk) => {
    console.log("Data ", chunk.toString());
  });

  response.on("end", () => {
    console.log("Nothing to load");
  });
});

req.on("error", (error) => {
  console.error(`Problem with request: ${error.message}`);
});
