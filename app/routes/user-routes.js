'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/user-controller');
  app.route('/login')
      .post(users.login);

  app.route('/signup')
      .post(users.signup);
};
