'use strict'
var fs = require('fs');
var winston = require('winston');

var Collection = function(opt) {

  opt || {};
  this._filename = opt.fileName || false;
  this._collection = [];
  this._itemConstructor = opt.itemConstructor;


  var self = this;
  if (this._filename) {
    getFromFile();
  }

  function getFromFile() {

    fs.readFile('/tmp/' + self._filename,  'utf8', function(err, data){

      if (err) {
        winston.log(err);
      } else {
        JSON.parse(data).forEach(function(item){
          //console.log(item);
          self._collection.push(new self._itemConstructor(item));
        });

      }
    });
  }
}
Collection.prototype.save = function() {

  fs.writeFileSync('/tmp/' + this._filename, JSON.stringify(this._collection));
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