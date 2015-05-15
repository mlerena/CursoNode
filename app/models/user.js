'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
/**
 * User Schema
 */
var UserSchema = new Schema({

  username: {
    type: String,
    unique: 'testing error message',
    required: 'Please fill in a username',
    trim: true
  },
  password: {
    type: String,
    required:''
  },
  salt: {
    type: String
  }
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  } else {
    return password;
  }
};

UserSchema.pre('save', function(next) {
  if (this.password && this.password.length >= 6) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

mongoose.model('User', UserSchema);