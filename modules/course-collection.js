'use strict'

var Collection = require('./collection');
var util = require("util");
function CourseCollection(options) {

  Collection.call(this, options);
}
util.inherits(CourseCollection, Collection);

CourseCollection.prototype.fullPrint = function() {

  this._collection.forEach(function (item, index) {
    var teacherName = item.getTeacher() ? item.getTeacher().getName() : 'N/A';
    console.log( item.getName() + ' - ' + teacherName + ' - '+ item.getStudentsCount());
  });
}
module.exports = CourseCollection;
