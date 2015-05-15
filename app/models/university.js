'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var University = new Schema({
  name: {
    type: String,
    default: '',
    required: 'University name required',
    trim: true
  },
  courses:[
    {type: Schema.ObjectId,
      ref: 'Course'}
  ],
  teachers:[
    {type: Schema.ObjectId,
      ref: 'Teacher'}
  ],
  students:[
            {type: Schema.ObjectId,
            ref: 'Student'}
  ],
  plans:[
    {type: Schema.ObjectId,
      ref: 'Plan'}
  ]
});

mongoose.model('University', University);
