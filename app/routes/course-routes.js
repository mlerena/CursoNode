'use strict';

module.exports = function(app) {
  var courses = require('../../app/controllers/course-controller');
  var students = require('../../app/controllers/student-controller');
  var teachers = require('../../app/controllers/teacher-controller');
  var users = require('../../app/controllers/user-controller');

  app.route('/courses')
      .get(users.requireAuthentication, courses.list)
      .post(users.requireAuthentication, users.requireAuthorization, courses.create);

  app.route('/courses/:courseId')
      .get(courses.read)
      .put(courses.update)
      .delete(courses.delete);

  app.route('/courses/:courseId/add-student/:studentId')
      .put(courses.addStudent);

  app.route('/courses/:courseId/set-teacher/:teacherId')
      .put(courses.setTeacher);
  app.param('courseId', courses.courseById);
  app.param('studentId', students.studentById);
  app.param('teacherId', teachers.teacherById);
};
/*
course
55550aeed735448b03b1134a
student
5554b3d185c8496e1f810a6b
    */