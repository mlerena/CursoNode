var express = require('express');

var app = express();


require('./app/routes/student-routes')(app);

module.exports = app;
