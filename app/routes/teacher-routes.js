'use strict';

module.exports = function(app) {
  var teachers = require('../../app/controllers/teacher-controller');
  var users = require('../../app/controllers/user-controller');
  var courses = require('../../app/controllers/course-controller');

  app.route('/teachers')
      .get(users.requireAuthentication, teachers.list)
      .post(users.requireAuthentication, users.requireAuthorization, teachers.create);

  app.route('/teachers/:teacherId')
      .get(teachers.read)
      .put(teachers.update)
      .delete(courses.unsetTeacherById, teachers.delete);

  app.param('teacherId', teachers.teacherById);
};
