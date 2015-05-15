'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var errorHandler = require('./error-controller');
require('../models/teacher');
var Teacher = mongoose.model('Teacher');
var _ = require('underscore');


exports.create = function(req, res) {
  console.log(req.body);
  var teacher = new Teacher(req.body);

  teacher.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(teacher);
    }
  });
};

/**
 * Show the current
 */
exports.read = function(req, res) {
  res.jsonp(req.teacher);
};

/**
 * Update
 */
exports.update = function(req, res) {
  var teacher = req.teacher ;

  teacher = _.extend(teacher , req.body);

  teacher.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(teacher);
    }
  });
};

/**
 * Delete
 */
exports.delete = function(req, res) {
  var teacher = req.teacher ;

  teacher.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(teacher);
    }
  });
};

/**
 * List
 */
exports.list = function(req, res) {
  Teacher.find(function(err, teachers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(teachers);
    }
  });
};

exports.teacherById = function(req, res, next, id) {
  Teacher.findById(id, function(err, teacher) {
    if (err)
      return next(err);
    if (! teacher)
      return next(new Error('Failed to load Studnet ' + id));
    req.teacher = teacher ;
    next();
  });
};

