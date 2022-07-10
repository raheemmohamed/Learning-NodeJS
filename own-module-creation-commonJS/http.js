const request = require("./request");
const response = require("./response");

function get(url, data) {
  request.send(url, data);
  return response.read();
}

const URL = "http://jsonplaceholder.typicode.com/posts";
const latestResponse = get(URL, "customerData");
console.log("Latest response", latestResponse);
