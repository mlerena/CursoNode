'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Student = mongoose.model('Student'),
    agent = request.agent(app);

/**
 * Globals
 */
var user, student;

var credentials = {
  username:'username',
  password: 'password'
}

var credentialsAdmin = {
  username:'username',
  password: 'password'
}
var student = {
  'name' : 'Student Name'
}
// create admin and satandar user
function createUsers(done) {
  // Create a new user
  user = new User({
    username: credentials.username,
    password: credentials.password,
    rol: 'local'
  });

   user.save(function() {

    var userAdmin = new User({
      username: credentialsAdmin.username,
      password: credentialsAdmin.password,
      rol: 'admin'
    });
    userAdmin.save(function(){
      done();
    });

  });
}
describe('Student CRUD tests', function() {
  beforeEach(function(done) {

      createUsers(done);
  });

  it('should be able to save Student instance if logged in as admin', function(done) {
    var token = '';
    request(app).post('/login')
        .send(credentialsAdmin)
        .expect(200)
        .end(function(signinErr, signinRes) {
          // Handle signin error
          //console.log(signinRes.res.body.token);
          if (signinErr) done(signinErr);

          token = signinRes.res.body.token;
          // Get the userId
          var userId = user.id;

          // Save a new Student
          request(app).post('/students')
              .set('Accept', 'application/json')
              .set('Authorization', 'bearer ' + token)
              .send(student)
              .expect(200)
              .end(function(saveError, saveResult) {

                if (saveError) {
                  done(saveError);
                }

                // Get a list of Students
                request(app).get('/students')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'bearer ' + token)
                    .end(function(getStudentsError, getStudentsResult) {


                      if (getStudentsError) {
                       // console.log(token);
                        done(getStudentsError);
                      }

                      // Get Tipoproductos list
                      var students = getStudentsResult.body;
                      // Set assertions
                      (students[0].name).should.match('Student Name');

                      // Call the assertion callback
                      done();
                    });
              });
        });
    done();
  });
/*
  it('should not be able to save Student instance if not logged in', function(done) {
    agent.post('/students')
        .send(tipoproducto)
        .expect(401)
        .end(function(tipoproductoSaveErr, tipoproductoSaveRes) {
          // Call the assertion callback
          done(tipoproductoSaveErr);
        });
  });

  it('should not be able to save Tipoproducto instance if no name is provided', function(done) {
    // Invalidate name field
    tipoproducto.name = '';

    agent.post('/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function(signinErr, signinRes) {
          // Handle signin error
          if (signinErr) done(signinErr);

          // Get the userId
          var userId = user.id;

          // Save a new Tipoproducto
          agent.post('/tipoproductos')
              .send(tipoproducto)
              .expect(400)
              .end(function(tipoproductoSaveErr, tipoproductoSaveRes) {
                // Set message assertion
                (tipoproductoSaveRes.body.message).should.match('Please fill Tipoproducto name');

                // Handle Tipoproducto save error
                done(tipoproductoSaveErr);
              });
        });
  });

  it('should be able to update Tipoproducto instance if signed in', function(done) {
    agent.post('/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function(signinErr, signinRes) {
          // Handle signin error
          if (signinErr) done(signinErr);

          // Get the userId
          var userId = user.id;

          // Save a new Tipoproducto
          agent.post('/tipoproductos')
              .send(tipoproducto)
              .expect(200)
              .end(function(tipoproductoSaveErr, tipoproductoSaveRes) {
                // Handle Tipoproducto save error
                if (tipoproductoSaveErr) done(tipoproductoSaveErr);

                // Update Tipoproducto name
                tipoproducto.name = 'WHY YOU GOTTA BE SO MEAN?';

                // Update existing Tipoproducto
                agent.put('/tipoproductos/' + tipoproductoSaveRes.body._id)
                    .send(tipoproducto)
                    .expect(200)
                    .end(function(tipoproductoUpdateErr, tipoproductoUpdateRes) {
                      // Handle Tipoproducto update error
                      if (tipoproductoUpdateErr) done(tipoproductoUpdateErr);

                      // Set assertions
                      (tipoproductoUpdateRes.body._id).should.equal(tipoproductoSaveRes.body._id);
                      (tipoproductoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                      // Call the assertion callback
                      done();
                    });
              });
        });
  });

  it('should be able to get a list of Tipoproductos if not signed in', function(done) {
    // Create new Tipoproducto model instance
    var tipoproductoObj = new Tipoproducto(tipoproducto);

    // Save the Tipoproducto
    tipoproductoObj.save(function() {
      // Request Tipoproductos
      request(app).get('/tipoproductos')
          .end(function(req, res) {
            // Set assertion
            res.body.should.be.an.Array.with.lengthOf(1);

            // Call the assertion callback
            done();
          });

    });
  });


  it('should be able to get a single Tipoproducto if not signed in', function(done) {
    // Create new Tipoproducto model instance
    var tipoproductoObj = new Tipoproducto(tipoproducto);

    // Save the Tipoproducto
    tipoproductoObj.save(function() {
      request(app).get('/tipoproductos/' + tipoproductoObj._id)
          .end(function(req, res) {
            // Set assertion
            res.body.should.be.an.Object.with.property('name', tipoproducto.name);

            // Call the assertion callback
            done();
          });
    });
  });

  it('should be able to delete Tipoproducto instance if signed in', function(done) {
    agent.post('/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function(signinErr, signinRes) {
          // Handle signin error
          if (signinErr) done(signinErr);

          // Get the userId
          var userId = user.id;

          // Save a new Tipoproducto
          agent.post('/tipoproductos')
              .send(tipoproducto)
              .expect(200)
              .end(function(tipoproductoSaveErr, tipoproductoSaveRes) {
                // Handle Tipoproducto save error
                if (tipoproductoSaveErr) done(tipoproductoSaveErr);

                // Delete existing Tipoproducto
                agent.delete('/tipoproductos/' + tipoproductoSaveRes.body._id)
                    .send(tipoproducto)
                    .expect(200)
                    .end(function(tipoproductoDeleteErr, tipoproductoDeleteRes) {
                      // Handle Tipoproducto error error
                      if (tipoproductoDeleteErr) done(tipoproductoDeleteErr);

                      // Set assertions
                      (tipoproductoDeleteRes.body._id).should.equal(tipoproductoSaveRes.body._id);

                      // Call the assertion callback
                      done();
                    });
              });
        });
  });

  it('should not be able to delete Tipoproducto instance if not signed in', function(done) {
    // Set Tipoproducto user
    tipoproducto.user = user;

    // Create new Tipoproducto model instance
    var tipoproductoObj = new Tipoproducto(tipoproducto);

    // Save the Tipoproducto
    tipoproductoObj.save(function() {
      // Try deleting Tipoproducto
      request(app).delete('/tipoproductos/' + tipoproductoObj._id)
          .expect(401)
          .end(function(tipoproductoDeleteErr, tipoproductoDeleteRes) {
            // Set message assertion
            (tipoproductoDeleteRes.body.message).should.match('User is not logged in');

            // Handle Tipoproducto error error
            done(tipoproductoDeleteErr);
          });

    });
  });
*/
  afterEach(function(done) {
    User.remove().exec();
    Student.remove().exec();
    done();
  });
});