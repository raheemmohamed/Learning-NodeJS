const http = require("http");

const PORT = 3000;

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  res.end(JSON.stringify({ data: "Hello You are in Node JS world" }));
});

server.listen(PORT, () => {
  console.log(`Server is up and Listening ${PORT}...`);
});
