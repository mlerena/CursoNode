
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);
