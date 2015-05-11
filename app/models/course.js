'use strict'
var Teacher = require('./teacher');
var hal = require('nor-hal/src/hal.js');
var config = require('../../config');
var Course = function(opt) {

  this._id = opt._id || null;
  this._name = opt._name || '';
  this._minAvgGrade = opt._minAvgGrade || 0;
  this._students = opt._students || [];
  this._teacher = null;
  if (opt._teacher) {
    this._teacher = new Teacher(opt._teacher);
  }

}
Course.prototype.setId = function(id) {
  this._id = id;
}
Course.prototype.getId = function() {
  return this._id;
}
Course.prototype.setTeacher = function(teacher) {
  this._teacher = teacher;
}

Course.prototype.getTeacher = function() {
  return this._teacher;
}

Course.prototype.addStudent = function (student) {
  this._students.push(student);
}

Course.prototype.getName = function () {
  return this._name;
}

Course.prototype.getStudentsCount = function () {
  return this._students.length;
}

Course.prototype.getMinAvgGrade = function() {
  return this._minAvgGrade;
}
Course.prototype.getHalResource = function(){

  var halResource = new hal.Resource({'data':{_name:this._name, _id:this._id, _minAvgGrade:this._minAvgGrade}},
                                      '/' + config.resources.courses + '?id=' +  this.getId());

  if(this._teacher) {
    halResource.embed('teacher', new hal.Resource(this._teacher, '/' + config.resources.teachers + '?id=' + this._teacher.getId()));
  }
  if (this._students) {
    this._students.forEach(function(student) {
      halResource.embed('students', new hal.Resource(student, '/' + config.resources.students + '?id=' + student._id ));
    });
  }
  return halResource;
}
module.exports = Course;