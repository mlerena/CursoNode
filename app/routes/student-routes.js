'use strict';

module.exports = function(app) {
  var students = require('../../app/controllers/student-controller');
  var users = require('../../app/controllers/user-controller');
var coures = require('../../app/controllers/course-controller');
  app.route('/:universityId?/students')
      .get(users.requireAuthentication, students.list)
      .post(users.requireAuthentication, students.create);

  app.route('/:universityId?/students/:studentId')
      .get(students.read)
      .put(students.update)
      .delete(coures.unsetStudentById, students.delete);

  app.param('studentId', students.studentById);
};