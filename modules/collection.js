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

Collection.prototype.print = function () {

  this._collection.forEach(function (item, index) {
    var id =  parseInt(index) + 1;
    process.stdout.write('(' + id + '). ' + item.getName() + '\n');
  });
}

module.exports = Collection;