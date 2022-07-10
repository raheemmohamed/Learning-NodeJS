import { send } from "./request.mjs";
import { read } from "./response.mjs";

function get(url, data) {
  send(url, data);
  return read();
}

const URL = "http://jsonplaceholder.typicode.com/posts";
const latestResponse = get(URL, "customerData");
console.log("Latest response", latestResponse);
