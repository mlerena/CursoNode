'use strict'

var util = require("util");
var events = require('events');

var Person = function(options) {

  this._name = options.name || '';
  this._address = options.address || '';
  this._birthDate = new Date(options.birthDate);
  this.friends = options.friends || [];
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
module.exports = Person;
