'use strict';
/**
 * Module dependencies.
 */
var isInTest = typeof global.it === 'function';
if (isInTest) {
  var config = require('./config-test');
} else {
  var config = require('./config');
}
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect(config.mongoDb, function(err) {
  if (err) {
    console.error('Could not connect to MongoDB!');
    console.log(err);
  }
});

var express = require('express');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


require('./app/routes/student-routes')(app);
require('./app/routes/teacher-routes')(app);
require('./app/routes/course-routes')(app);
require('./app/routes/user-routes')(app);

// Start the app by listening on <port>
app.listen(config.serverPORT);

// Expose app
module.exports = app;

// Logging initialization
console.log('Course node started on port ' + config.serverPORT);