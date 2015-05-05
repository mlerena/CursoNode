'use strict'

var Person = require('./person');
function Teacher(options) {

  Person.call(this, options);
}
Teacher.prototype = Object.create(Teacher.prototype);

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
}

module.exports = Teacher;
