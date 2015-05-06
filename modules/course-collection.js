'use strict'

var Collection = require('./collection');
var util = require("util");
function CourseCollection(options) {

  Collection.call(this, options);
}
util.inherits(CourseCollection, Collection);

CourseCollection.prototype.fullPrint = function() {

  this._collection.forEach(function (item, index) {
    var id =  parseInt(index) + 1;
    var teacherName = item.getTeacher()? item.getTeacher().getName() : 'N/A';
    process.stdout.write('(' + id + '). ' + item.getName() + '--' + teacherName+' '+ item.getStudentsCount()+ '\n');
  });
}

module.exports = CourseCollection;
