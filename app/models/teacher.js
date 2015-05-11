'use strict'

var Person = require('./person');
var util = require('util');
var logger = require('./../logger');
var hal = require('nor-hal/src/hal.js');
var config = require('../../config');

function Teacher(options) {

  Person.call(this, options);
}
util.inherits(Teacher, Person);

Teacher.prototype.teachCourse = function(course) {
   course.setTeacher(this);
}

Teacher.prototype.gradeStudent = function(student, course, grade) {
  student.setCourseGrade(course, grade);
  logger.info('Teacher grade:' + student.getName() + '. Grade:' + grade);
  this.emit('teacher:grade-student:' + student.getId(), student, course, grade);
}

Teacher.prototype.getHalResource = function() {
  var link = '/' + config.resources.teachers +'?id=' + this.getId();
  var halResource = new hal.Resource({data:this}, link);
  halResource.link('delete', link)
      .link('read',link)
      .link('update',link);
  return halResource;

}
module.exports = Teacher;