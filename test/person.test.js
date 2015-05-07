var assert = require("assert");
var should = require("should");
var sinon = require("sinon");


describe('Person', function(){

  var Person = require("../modules/person.js");
  it('Should initiate as expected with no options', function(){
    var events = require('events');
    var opt ={}
    var person = new Person(opt);
    person.should.have.property('_name', '');
    person.should.have.property('_id', 0);
    person.should.have.property('_address', '');
    person.should.have.property('_friends', []);
    person.should.have.property('_birthDate', null);
    person.should.be.an.instanceOf(events.EventEmitter);
  });

  it('Should initiate as expected with options', function(){
    var events = require('events');
    var opt ={'_id':1,
              '_name':'name',
              '_address': 'address',
              '_birthDate': '1978-11-28',
              '_friends': [1,2,3]}
    var person = new Person(opt);
    person.should.have.property('_name', 'name');
    person.should.have.property('_id', 1);
    person.should.have.property('_address', 'address');
    person.should.have.property('_friends', [1, 2,3]);
    person.should.have.property('_birthDate', new Date('1978-11-28'));

  });

  it('Should get the properties', function(){
    var events = require('events');
    var opt ={'_id':1,
      '_name':'name',
      '_address': 'address',
      '_birthDate': '1978-11-78',
      '_friends': [1,2,3]}
    var person = new Person(opt);
    person.getName().should.be.exactly('name');
    person.getId().should.be.exactly(1);
   });

  it('Should set the id', function(){
    var events = require('events');
    var opt ={}
    var person = new Person(opt);
    person.setId(40)
    person.should.have.property('_id', 40);
  });
});