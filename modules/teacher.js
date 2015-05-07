'use strict'

var Person = require('./person');
var util = require('util');
var logger = require('./logger');
function Teacher(options) {

  Person.call(this, options);
}
util.inherits(Teacher, Person);

Teacher.prototype.teachCourse = function(course) {
  if (course instanceof Course) {
    course.setTeacher(course);
  }
}

Teacher.prototype.stopTeachingCourse = function(course) {
  if (course instanceof Course) {
    course.setTeacher(null);
  }
}

Teacher.prototype.gradeStudent = function(student, course, grade) {
  student.setCourseGrade(course, grade);
  logger.info('Teacher grade:' + student.getName() + '. Grade:' + grade);
  this.emit('teacher:grade-student:' + student.getId(), student, course, grade);
}

module.exports = Teacher;