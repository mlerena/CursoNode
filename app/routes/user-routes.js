'use strict';

module.exports = function(app) {
  var teachers = require('../../app/controllers/teacher-controller');
  var users = require('../../app/controllers/user-controller');
  var courses = require('../../app/controllers/course-controller');

  app.route('/login')
      .post(users.login);

  app.route('/signup')
      .post(users.signup);
};
