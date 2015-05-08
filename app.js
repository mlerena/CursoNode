'use strict'

var fs = require('fs');
var config =require('./config');
var logger = require('./app/logger');

fs.exists(config.dataDirectory, function(exist){

  if (exist) {
    fs.access(config.dataDirectory, fs.W_OK,  function(err){

      if (!err) {
        var app = require('./app/controllers/main');
        app().run();
      } else {
        logger.error('Cant write on: ' + config.dataDirectory);
      }
    })

  } else {
    logger.error('Please create directory: ' + config.dataDirectory);
  }
});


