'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Course = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Course name required',
    trim: true
  },
  weekHours: {
    type: Number,
    default: 0
  },
  teacher:{
    type:Schema.ObjectId,
    ref:'Teacher',
    index: true
  },
  students:[
            {type: Schema.ObjectId,
            ref: 'Student',
            index: true}
  ]
});

mongoose.model('Course', Course);
