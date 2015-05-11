'use strict'

var Person = require('./person');
var util = require('util');
var _ = require('underscore');
var logger = require('./../logger');
var hal = require('nor-hal/src/hal.js');
var config = require('../../config');

var Student = function(options) {

  Person.call(this, options);
  this._avgGrade = options._avgGrade || 0;
  this._currentGrades = options._currentGrades || {};
}
util.inherits(Student, Person);

Student.prototype.enrollToCourse = function(course) {

  var self = this;
  if (this._avgGrade >= course.getMinAvgGrade) {

    course.addStudent(this);
    if (course.getTeacher() !== null) {
      course.getTeacher().on('teacher:grade-student:' + self.getId(), processGradeEvent);
    }
  } else {
    logger.warn('Unsatisfied minimum average grade. Student: ' + this.getName() + ' course: ' + course.getName());
  }

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
}

Student.prototype.setCourseGrade = function(course, grade) {

  this._currentGrades[course.getName()] = grade;
}

Student.prototype.getHalResource = function() {
  var link = '/' + config.resources.students +'?id=' + this.getId();
  var halResource = new hal.Resource({data:this}, link);
  halResource.link('delete', link)
      .link('read',link)
      .link('update',link);
  return halResource;

}
module.exports = Student;
