
var http = require('http');
var config = require('./config');
var controller = require('./app/controllers/server-controller')


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (req, res) {


  var availableCollections = [config.resources.teachers, config.resources.students, config.resources.courses];
  var collectionName = req.url.replace('/', '');

  if(req.url === '/'){

    var body = controller().getNoCollectionResponse();
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(body));

  }else  if (availableCollections.indexOf(collectionName) !== -1 ) {
    controller().getCollectionResponse(collectionName).then(function (body) {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(body));
    }, function (err) {
      res.writeHead(500, {"Content-Type": "application/json"});
      res.end();
    });

  } else {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end();
  }
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(config.serverPORT);
