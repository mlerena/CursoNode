'use strict'
var fs = require('fs');
var logger = require('./logger');

var Collection = function(opt) {

  if (!opt) {
    var opt = {};
  }
  if (opt.fileName) {
    this._filename = '/tmp/' + opt.fileName;
  }
  if (opt.itemConstructor) {
    this._itemConstructor = opt.itemConstructor;
  }

  this._collection = [];



  var self = this;
  if (this._filename) {
    getFromFile();
  }

  function getFromFile() {

    if (fs.existsSync(self._filename) ) {
      try {
        var data = fs.readFileSync(self._filename, 'utf8');
        JSON.parse(data).forEach(function (item) {
          self._collection.push(new self._itemConstructor(item));
        });
        logger.info('Read data from file: ' + self._filename + ' Items loaded: ' + JSON.parse(data).length);
      } catch (e) {

        logger.error(e.toString());
      }
    } else {
      logger.info('No file loaded: ' + self._filename);
    }
  }
}
Collection.prototype.save = function() {


    try {
      fs.writeFileSync(this._filename, JSON.stringify(this._collection));
      logger.info('Save data to file: ' + '/tmp/' + this._filename + ' Items saved: ' + this._collection.length);
    } catch (e) {

      logger.error(e.toString());
    }

}

Collection.prototype.addItem = function(item) {
  item.setId(this.count() + 1);
  this._collection.push(item);
}

Collection.prototype.getItemById = function (id) {
  return this._collection[parseInt(id) - 1];
}

Collection.prototype.print = function () {

  this._collection.forEach(function (item, index) {
    var id =  parseInt(index) + 1;
    console.log('(' + id + '). ' + item.getName() + '\n');
  });
}

Collection.prototype.count = function() {
  return this._collection.length;
}

module.exports = Collection;