'use strict'

var Course = function(opt) {

  opt || {};
  this._name = opt._name || '';
  this._minAvgGrade = opt._minAvgGrade || 0;
  this._students = [];
  this._teacher = opt.teacher || null;
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