'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var errorHandler = require('./error-controller');
require('../models/course');
var Course = mongoose.model('Course');
var _ = require('underscore');


exports.create = function(req, res) {
  console.log(req.body);
  var course = new Course(req.body);

  course.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(course);
    }
  });
};

/**
 * Show the current
 */
exports.read = function(req, res) {
  res.jsonp(req.course);
};

/**
 * Update
 */
exports.update = function(req, res) {
  var course = req.course ;

  course = _.extend(course , req.body);

  course.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(course);
    }
  });
};

/**
 * Delete
 */
exports.delete = function(req, res) {
  var course = req.course ;

  course.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(course);
    }
  });
};

/**
 * List
 */
exports.list = function(req, res) {
  Course.find(function(err, courses) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(courses);
    }
  });
};

exports.addStudent = function(req, res) {
  var course = req.course;
  var student = req.student;
  if (course && student) {
    if (course.students.indexOf(req.student._id) === -1) {
      course.students.push(req.student._id);
      course.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp(course);
        }
      });
  } else{
      return res.status(400).send({message:'Student already in the course'});
    }
  } else {
    return res.status(400).send({message:'Unknown student or course'});
  }
};
exports.unsetTeacherById = function(req, res, next) {

  Course.update({teacher:req.teacher._id}, {$set:{teacher:null}}, {}, function(err){
    console.log('Teacher deleted from courses');
    next();
  })
},
exports.unsetStudentById = function(req, res, next) {

  Course.find({students:req.student._id}, function(errr, courses){
   courses.forEach(function(course){
     course.students.remove(req.student._id, function(err){ });
   });
  })
  next();
},
exports.setTeacher = function(req, res) {
  var course = req.course;
  var teacher = req.teacher;
  if(course && teacher) {
    course.teacher = teacher._id;
    course.save(function(err){
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(course);
      }
    });
  } else {
    return res.status(400).send({message:'Unknown teacher or course'});
  }
}

exports.courseById = function(req, res, next, id) {
  Course.findById(id, function(err, course) {
    if (err)
      return next(err);
    if (! course)
      return next(new Error('Failed to load Studnet ' + id));
    req.course = course ;
    next();
  });
};

