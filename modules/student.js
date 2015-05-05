'use strict'

var Person = require('./person');
var Student = function(options) {

  Person.call(this, options);
  this._studentId = options.studentId;
  this._avgGrade = options.avgGrade || 0;
  this._currentGrades = options.currentGrades || {};
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.enrollToCourse = function(course) {

  if (this._avgGrade >= course._minimunAvgGrade) {
    course.addStudent(this);
  } else {
    //error
  }
}

Student.prototype.leaveCourse = function() {
  course.removeStudent(this);
}
Student.prototype.setCourseGrade = function(course, grade) {

  this._currentGrades[course.name] = grade;
}
module.exports = Student;
