var redis = require("redis");
var redisClient = redis.createClient();
var mongoose = require('mongoose');
require('../models/user');
var User = mongoose.model('User');


redisClient.on("error", function (err) {
  console.log("Error " + err);
});

exports.login = function(req, resp, next) {
  console.log(req.body.username);
  console.log(req.body.password);
  var user = new User();
  console.log( user.hashPassword(req.body.password));
  User.find({'username': req.body.username,
                'password': user.hashPassword(req.body.password)}, function(err, user){
    console.log(user);
    console.log(err);
  });

}
exports.signup = function(req, resp, next) {
  console.log(req.body.username);
  console.log(req.body.password);
  var user = new User({'username':req.body.username, 'password':req.body.password});
  user.save(function(err, user){
    console.log(err);
    console.log(user);
    resp.jsonp(user);
  });
};
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
