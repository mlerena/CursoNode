'use strict'

var events = require('events');
var utils = require('util');

var PersonCourseMenu = function (personCollection, coursesCollection, personType) {

  var stdin = process.openStdin();
  var personCourse = {};
  personCourse.personType = personType;
  var self = this || {};

  events.EventEmitter.call(this);

  display();

  stdin.addListener("data", readUserInput);

  function print (attribute) {

    console.log('Select ' + attribute + ' from the list, or "exit" to return');
  }
  function display() {

    if (!personCourse.person) {
      print(personCourse.personType);
      personCollection.print();
    } else if (!personCourse.course) {
      print('Course');
      coursesCollection.print();
    }
  }

  function readUserInput(userInput) {

    var finish = false;
    var userInput = userInput.toString().substring(0, userInput.length - 1);

    if (userInput === 'exit') {
      personCourse = {};
      self.emit('finish', false);
      stdin.removeListener("data", readUserInput);
    } else {

      if (!personCourse.person) {
        personCourse.person = personCollection.getItemById(userInput);
      } else if (!personCourse.course) {
        personCourse.course = coursesCollection.getItemById(userInput);
        if (personCourse.course) {

          self.emit('finish', personCourse);
          personCourse = {};
          stdin.removeListener("data", readUserInput);
          finish = true;
        }
      }
      if (!finish) {
        display();
      }
    }
  }
}
utils.inherits(PersonCourseMenu, events.EventEmitter);
module.exports = PersonCourseMenu;