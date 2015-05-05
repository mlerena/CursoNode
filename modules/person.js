'use strict'

var Person = function(options) {

  this._name = options.name || '';
  this._address = options.address || '';
  this._birthDate = new Date(options.birthDate);
  this.friends = options.friends || [];
}

Person.prototype.getName = function() {
  return this._name;
}
Person.prototype.getEdge = function() {

  var ageDifMs = Date.now() - this._birthDate.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
module.exports = Person;
