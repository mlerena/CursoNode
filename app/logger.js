'use strict';

var winston = require('winston');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({level: 'debug'}),
    new (winston.transports.File)({ filename: '/tmp/curso-node.log', level: 'debug' })
  ]
});

module.exports = logger;

