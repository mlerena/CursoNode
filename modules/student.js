'use strict'

var Person = require('./person');
var util = require('util');
var _ = require('underscore');
var logger = require('./logger');

var Student = function(options) {

  Person.call(this, options);
  this._studentId = options.studentId;
  this._avgGrade = options.avgGrade || 5;
  this._currentGrades = options.currentGrades || {};
}
util.inherits(Student, Person);

Student.prototype.enrollToCourse = function(course) {

  var self = this;
  function processGradeEvent(student, course, grade) {

    var actualGrades = _.values(self._currentGrades);
    if (_.isEqual(self, student)) {

       self._avgGrade = _.reduce(actualGrades, function(memo, currentGrade) {

        return memo + currentGrade;
      }, 0) / (actualGrades.length === 0 ? 1 : actualGrades.length);
      logger.info('Student recieve new grade for course: ' + course.getName() + '. Grade: ' + grade + '. From the teacher: ' + course.getTeacher().getName());
      logger.info('Student new avg: ' + self._avgGrade);
    }
  }

  if (this._avgGrade >= course._minAvgGrade) {

    course.addStudent(this);
    if (course.getTeacher() !== null) {
      course.getTeacher().on('teacher:grade-student:' + self.getId(), processGradeEvent);
    }
  }
}

Student.prototype.leaveCourse = function() {
  course.removeStudent(this);
}
Student.prototype.setCourseGrade = function(course, grade) {

  this._currentGrades[course.getName()] = grade;
}
module.exports = Student;
