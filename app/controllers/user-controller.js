var redis = require("redis");
var redisClient = redis.createClient();
//var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
//var User = mongoose.model('User', require('../models/user'));

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

exports.requireAuthentication = function(req, resp, next) {
  next();
}
exports.requireAuthorization = function(req, resp, next) {
  next();
}
redisClient.set("string key", "string val", redis.print);
redisClient.hset("hash key", "hashtest 1", "some value", redis.print);
redisClient.hset(["hash key", "hashtest 2", "some other value"], redis.print);
redisClient.hkeys("hash key", function (err, replies) {
  console.log(replies.length + " replies:");
  replies.forEach(function (reply, i) {
    console.log("    " + i + ": " + reply);
  });
  redisClient.quit();
});
