'use strict'

var util = require("util");
var events = require('events');

var Person = function(options) {

  this._id = options._id || 0;
  this._name = options._name || '';
  this._address = options._address || '';
  this._birthDate = new Date(options._birthDate);
  this._friends = options._friends || [];
  events.EventEmitter.call(this);
}

util.inherits(Person, events.EventEmitter);

Person.prototype.getName = function() {
  return this._name;
}
Person.prototype.getAge = function() {

  var ageDifMs = Date.now() - this._birthDate.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
Person.prototype.getId = function() {
  return this._id;
}
Person.prototype.setId = function(id) {
  this._id = id;
}
module.exports = Person;
