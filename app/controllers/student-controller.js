'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var errorHandler = require('./error-controller');
require('../models/student');
var Student = mongoose.model('Student');
var _ = require('underscore');


exports.create = function(req, res) {
  console.log(req.body);
  var student = new Student(req.body);

  student.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(student);
    }
  });
};

exports.read = function(req, res) {
  res.jsonp(req.student);
};


exports.update = function(req, res) {
  var student = req.student ;

  student = _.extend(student , req.body);

  student.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(student);
    }
  });
};

exports.delete = function(req, res) {
  var student = req.student ;

  student.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(student);
    }
  });
};


exports.list = function(req, res) {
  Student.find(function(err, students) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(students);
    }
  });
};


exports.studentById = function(req, res, next, id) {
  Student.findById(id, function(err, student) {
    if (err)
      return next(err);
    if (! student)
      return next(new Error('Failed to load Student ' + id));
    req.student = student ;
    next();
  });
};

