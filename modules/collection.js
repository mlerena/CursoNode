'use strict'

var Collection = function() {

  this._collection = []
}

Collection.prototype.addItem = function(item) {
  this._collection.push(item);
}

Collection.prototype.getItemById = function (id) {
  return this._collection[parseInt(id) - 1];
}

Collection.prototype.printMenu = function () {

  courses.forEach(function (course, index) {
    process.stdout.write('('. index + 1 + '). ' + course.getName() + '\n');
  });
  process.stdout.write('"exit" to return \n');

}

module.exports = Collection;