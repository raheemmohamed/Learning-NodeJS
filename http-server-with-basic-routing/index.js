const http = require("http");

//Default ports
const PORT = 3000;

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  if (req.url == "/" || req.url == "/plannets") {
    res.statusCode = 200; //simple way to set status code
    res.setHeader("Content-Type", "application/json"); //simple way to set header
    res.end(JSON.stringify({ data: "Hello You are in Node JS world" }));
  } else if (req.url == "/stars") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Star 1</li>");
    res.write("<li>Star 2</li>");
    res.write("<li>Star 3</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is up and Listening ${PORT}...`);
});
