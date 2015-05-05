'use strict'

require('_');
var Course = function(opt) {

  opt || {};
  this._name = opt.name || '';
  this._minAvgGrade = opt.minAvgGrade || 0;
  this._students = [];
  this._teacher = opt.teacher || null;
  this._coursesCollection = []

}
Course.prototype.setTeacher = function(teacher) {
  this._teacher = teacher;
}

Course.prototype.addStudent = function (student) {
  this._students.push(student);
}

Course.prototype.getName = function () {
  return this._name;
}
Course.prototype.addCourse= function (course) {
  this._coursesCollection.push(course);
}
Course.prototype.getCourseById  = function(courseId) {
  return this._coursesCollection[courseId];
}
Course.prototype.printCollection = function () {

  process.stdout.write('"Select course number \n');
  courses.forEach(function (course, index) {
    process.stdout.write('('. index + 1 + '). ' + course.getName() + '\n');
  });
  process.stdout.write('"exit" to return \n');

}
Course.prototype.removeStudent = function(student) {}
module.exports = Course;