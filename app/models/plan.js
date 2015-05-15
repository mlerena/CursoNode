'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgendaRow = new Schema({

  dayOfWeek:{
    type: Number,
    required: 'Day of week required',
    min: 1, max: 7
  },
  course:{
    type:Schema.ObjectId,
    ref:'Course'
  },
  timeFrom: {
    type: String,
    required: 'Time from required'
  },
  duration: {
    type: Number,
    required: 'Duration required'
  }
});
var Plan = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Plan name required',
    trim: true
  },
  courses:[
    {type: Schema.ObjectId,
      ref: 'Course'}
  ],
  agenda:[AgendaRow]
});

mongoose.model('Plan', Plan);
