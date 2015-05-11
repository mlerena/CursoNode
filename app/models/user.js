'use strict'

var Person = require('./person');
var util = require('util');
var _ = require('underscore');
var logger = require('./../logger');
var hal = require('nor-hal/src/hal.js');
var config = require('../../config');

var User = function(options) {

  Person.call(this, options);
  this._lastName = options._lastName || '';
  this._age = options._age || {};
}
util.inherits(User, Person);

User.prototype.getHalResource = function() {
  var link = '/' + config.resources.users +'?id=' + this.getId();
  var halResource = new hal.Resource({data:this}, link);
  halResource.link('delete', link)
      .link('read',link)
      .link('update',link);
  return halResource;
}
module.exports = User;
