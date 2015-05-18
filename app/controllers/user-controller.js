var redis = require("redis");
var mongoose = require('mongoose');
require('../models/user');
var User = mongoose.model('User');
var jwt = require("jsonwebtoken");

exports.login = function(req, resp, next) {

  User.findOne({'username': req.body.username}, function(err, user){
   var redisClient = null;
   var token = '';
   if(!err) {
    if (user.password === user.hashPassword(req.body.password)) {
      redisClient = redis.createClient();
      token = jwt.sign(user, 'the secret key');
      redisClient.set(token, JSON.stringify(user), function(err, replay){
        redisClient.quit();
        resp.jsonp({'token': token});
      });
    }
   } else {
     resp.status(500).send({message: "System error"});
   }
  });

}
exports.signup = function(req, resp, next) {
  var user = new User({'username':req.body.username,
                      'password':req.body.password,
                      'rol':req.body.rol});
  var token;
  var redisClient;
  user.save(function(err, user){
    if (!err) {
      redisClient = redis.createClient();
      token = jwt.sign(user, 'the secret key');
      redisClient.set(token, JSON.stringify(user), function(err, replay){

        redisClient.quit();
        resp.jsonp({'token': token});
      });
    } else {
      resp.res.status(400).send({message: "Wrong user or password"});
    }
  });
};
exports.requireAuthentication = function(req, resp, next) {

  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  var bearer;
  var redisClient;
  if (typeof bearerHeader !== 'undefined') {
    redisClient = redis.createClient();
    bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];

    var user = redisClient.get(bearerToken, function(err, user){
      if (user) {
        req.user = JSON.parse(user);
        req.token = bearerToken;
        next();
      } else {
        resp.status(400).send({message: "invalid token"});
      }
    });
  } else {
    resp.status(403).send({message: "require authentication"});
  }
}
exports.requireAuthorization = function(req, resp, next) {
  next();
}
