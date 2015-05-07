'use strict'
var Teacher = require('./teacher');
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
Course.prototype.getId = function(id) {
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

Course.prototype.removeStudent = function(student) {}
module.exports = Course;