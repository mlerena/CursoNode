
var http = require('http');
var config = require('./config');
var controller = require('./app/controllers/server-controller');
var url = require ('url');


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (req, res) {

  var queryString = url.parse(req.url, true).query;
  var collectionName = url.parse(req.url, true).pathname.replace('/', '');

  var availableCollections = [config.resources.teachers,
    config.resources.students,
    config.resources.courses,
    config.resources.users];
  if(collectionName === ''){

    var body = controller().getNoCollectionResponse();
    res.writeHead(200, {"Content-Type": "application/hal+json"});
    res.end(JSON.stringify(body));

  }else  if (availableCollections.indexOf(collectionName) !== -1 ) {

    if (req.method === 'GET') {

      if (queryString.id) {
        controller().getItemById(collectionName, queryString.id).then(function (item) {
          res.writeHead(200, {"Content-Type": "application/hal+json"});
          res.end(item.getHalResource().toString());
        }, function (err) {
          res.writeHead(500, {"Content-Type": "application/hal+json"});
          res.end();
        });
      } else {
        controller().getCollection(collectionName).then(function (collection) {
          res.writeHead(200, {"Content-Type": "application/hal+json"});
          res.end(collection.getHalResource().toString());
        }, function (err) {
          res.writeHead(500, {"Content-Type": "application/hal+json"});
          res.end();
        });
      }
    } else if (req.method === 'DELETE') {

      controller().deleteItemById(collectionName, queryString.id).then(function(){
        res.writeHead(200, {"Content-Type": "application/hal+json"});
        res.end('item deleted');
      }, function(err){
        res.writeHead(500, {"Content-Type": "application/hal+json"});
         res.end(err);
      })
    } else if (req.method === 'POST') {1

      controller().addItem(collectionName, queryString).then(function(){
        res.writeHead(200, {"Content-Type": "application/hal+json"});
        res.end('item added');
      }, function(err){
        res.writeHead(500, {"Content-Type": "application/hal+json"});
        res.end(err);
      })

    }
  } else {
    res.writeHead(404, {"Content-Type": "application/hal+json"});
    res.end();
  }
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(config.serverPORT);
