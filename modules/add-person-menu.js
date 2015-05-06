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
    process.stdout.write('Write ' + personType + ' '+ attribute +' or "exit" to return \n');
  }
  function display() {

    if (!person.name) {
      printLine('name');
    } else if (!person.address) {
      printLine('address');
    } else if (!person.birthDate) {
      printLine('birth date');
    }
  }

  function readUserInput(userInput) {

    var finish = false;
    var userInput = userInput.toString().substring(0, userInput.length - 1);

    if (userInput === 'exit') {
      person = {};
      self.emit('finish', false);
      stdin.removeListener("data", readUserInput);
    } else {

      if (!person.name) {
        person.name = userInput;
      } else if (!person.address) {
        person.address = userInput;
      } else if (!person.birthDate) {

        person.birthDate = userInput;
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