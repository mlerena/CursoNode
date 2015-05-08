'use strict'
var fs = require('fs');
var logger = require('../logger');
var when = require('when');
var config = require('../../config');

var Collection = function(opt) {

  if (!opt) {
    var opt = {};
  }
  if (opt.fileName) {
    this._filename = config.dataDirectory + opt.fileName;
  }
  if (opt.itemConstructor) {
    this._itemConstructor = opt.itemConstructor;
  }

  this._collection = [];
}

Collection.prototype.setUp = function () {

  var self = this;
  var deferred = when.defer();
  if (this._filename) {

    fs.exists(this._filename, function(exist) {
      if (!exist) {
        deferred.resolve(true);
      } else {
        fs.readFile(self._filename, {encoding: 'utf-8'}, function (err, data) {

          if (!err) {
            JSON.parse(data).forEach(function (item) {
              self._collection.push(new self._itemConstructor(item));
            });

            logger.info('Read data from file: ' + self._filename + ' Items loaded: ' + JSON.parse(data).length);
            deferred.resolve(false);
          } else {
            deferred.reject(err);
            logger.warn('No file loaded: ' + self._filename);
          }
        });
      }
    });
   } else {
    deferred.resolve(true);
  }
  return deferred.promise;
}

Collection.prototype.save = function() {

  var deferred = when.defer();
  var self = this;

  fs.writeFile(this._filename, JSON.stringify(this._collection), function(error, data) {
    if (!error) {
      logger.info('Save data to file: ' + self._filename + ' Items saved: ' + self._collection.length);
    } else {
      logger.error(error.toString());
    }
    deferred.resolve(true);
  });
  return deferred.promise;
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
    console.log('(' + id + '). ' + item.getName());
  });
}

Collection.prototype.getItems = function() {
  return this._collection;
}

Collection.prototype.count = function() {
  return this._collection.length;
}

module.exports = Collection;