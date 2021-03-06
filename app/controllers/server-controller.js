'use strict'

var hal = require('nor-hal/src/hal.js');
var Collection = require('../models/collection');
var config = require('../../config');
var Teacher = require('../models/teacher');
var Student = require('../models/student');
var Course = require('../models/course');
var User = require('../models/user');
var when = require('when');

var serverController = function(){

  function collectionFactory(collectionName) {

    var collection = new Collection();
    if (collectionName === config.resources.teachers) {
      collection = new Collection({'fileName': config.resources.teachers, 'itemConstructor': Teacher});
    }
    if (collectionName === config.resources.students) {
      collection = new Collection({'fileName': config.resources.students, 'itemConstructor': Student});
    }
    if (collectionName === config.resources.courses) {
      collection = new Collection({'fileName': config.resources.courses, 'itemConstructor': Course});
    }
    if (collectionName === config.resources.users) {
      collection = new Collection({'fileName': config.resources.users, 'itemConstructor': User});
    }

    return collection;
  }

  return {

    getCollection: function(collectionName) {

      var deferred = when.defer();
      var collection = collectionFactory(collectionName);
      collection.setUp().then(function(){
        deferred.resolve(collection)
      }, function(err){
        deferred.reject(err)
      });
      return deferred.promise;
    },
    deleteItemById: function(collectionName, id) {

      var deferred = when.defer();
      var collection = collectionFactory(collectionName);
      collection.setUp().then(function(){
         collection.deleteItemById(id).then(function(){
           deferred.resolve(true)
         }, function(err){
           deferred.reject(err)
         });
      }, function(err) {
        deferred.reject(err)
      })
     return deferred.promise;
    },
    addItem: function(collectionName, item) {

      var deferred = when.defer();
      var collection = collectionFactory(collectionName);
      collection.setUp().then(function(){
        collection.addItem(item);
        collection.save().then(function(){
          deferred.resolve(true)
        }, function(err){
          deferred.reject(err)
        });
      }, function(err) {
        deferred.reject(err)
      });
      return deferred.promise;
    },
    getItemById: function(collectionName, id) {
      var deferred = when.defer();
      var collection = collectionFactory(collectionName);
      collection.setUp().then(function(){
        var item = collection.getItemById(id);

        deferred.resolve(item);
      }, function(err) {
        deferred.reject(err)
      });
      return deferred.promise;
    },
    getNoCollectionResponse: function () {

      var halResource = new hal.Resource({}, '/');
      halResource.link(config.resources.students, '/' + config.resources.students);
      halResource.link(config.resources.teachers, '/' + config.resources.teachers);
      halResource.link(config.resources.courses, '/' + config.resources.courses);
      halResource.link(config.resources.users, '/' + config.resources.users);
      return halResource;
    }
  }
}

module.exports = serverController;