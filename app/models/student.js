'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Student = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Student name required',
    trim: true
  },
  birthDate: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Student', Student);
