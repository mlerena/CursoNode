'use strict'

var events = require('events');
var utils = require('util');
var _ = require('underscore');
var AddPersonMenu = function (personTypeParam) {

  var stdin = process.openStdin();
  var person = {};
  var personType = personTypeParam || '';
  person.type = personType;
  var self = this || {};

  events.EventEmitter.call(this);
  display();

  stdin.addListener("data", readUserInput);

  function printLine (attribute) {
    console.log('Write ' + personType + ' '+ attribute +' or "exit" to return');
  }
  function display() {

    if (!person._name) {
      printLine('name');
    } else if (!person._address) {
      printLine('address');
    } else if (!person._birthDate) {
      printLine('birth date');
    }
  }

  function readUserInput(userInput) {

    console.log('entro aca');
    var finish = false;
    var userInput = userInput.toString().substring(0, userInput.length - 1);

    if (userInput === 'exit') {
      person = {};
      self.emit('finish', false);
      stdin.removeListener("data", readUserInput);
    } else {

      if (!person._name) {
        person._name = userInput;
      } else if (!person._address) {
        person._address = userInput;
      } else if (!person._birthDate) {

        person._birthDate = userInput;
        self.emit('finish', _.clone(person));
        person = {};
        stdin.removeListener("data", readUserInput);
        finish = true;
      }
      if (!finish) {
        display();
      }
    }
  }
}
utils.inherits(AddPersonMenu, events.EventEmitter);
module.exports = AddPersonMenu