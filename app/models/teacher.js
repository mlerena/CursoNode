'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Teacher = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Teacher name required',
    trim: true
  },
  birthDate: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Teacher', Teacher);
