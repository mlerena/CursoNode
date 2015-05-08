'use strict'

var hal = require('nor-hal/src/hal.js');
var Collection = require('../models/collection');
var config = require('../../config');
var Teacher = require('../models/teacher');
var Student = require('../models/student');
var Course = require('../models/course');
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

    return collection;
  }

  function getHalResource(collection, collectionName) {

    var halObject = {};
    if (collection) {

      halObject = new hal.Resource({'items':collection.getItems()}, '/' + collectionName);
    } else {
      halObject = new hal.Resource({}, '/');
    }
    return halObject;
  }

  function addLinks(halObject, collectionName) {

    if (collectionName === config.resources.teachers) {

      halObject.link(config.resources.students, '/' + config.resources.students);
      halObject.link(config.resources.courses, '/' + config.resources.courses);
    } else if (collectionName === config.resources.students) {

      halObject.link(config.resources.teachers, '/' + config.resources.teachers);
      halObject.link(config.resources.courses, '/' + config.resources.courses);
    } else if (collectionName === config.resources.courses) {

      halObject.link(config.resources.students, '/' + config.resources.students);
      halObject.link(config.resources.teachers, '/' + config.resources.teachers);
    } else {

      halObject.link(config.resources.students, '/' + config.resources.students);
      halObject.link(config.resources.teachers, '/' + config.resources.teachers);
      halObject.link(config.resources.courses, '/' + config.resources.courses);
    }
    return halObject;
  }

  return {
    getCollectionResponse: function(collectionName) {

      var deferred = when.defer();
      var collection = collectionFactory(collectionName);
      collection.setUp().then(function(err){

        if (!err) {
          var halResource = getHalResource (collection, collectionName);
          halResource = addLinks(halResource, collectionName);
          deferred.resolve(halResource);
        } else {
          deferred.reject();
        }
      }, function(err) {
        deferred.reject(err);
      });
    return deferred.promise;
    },
    getNoCollectionResponse: function () {

      var halResource = getHalResource();
      addLinks(halResource);
      return halResource;
    }
  }
}

module.exports = serverController;