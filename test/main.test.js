var assert = require("assert");
var should = require("should");
var sinon = require("sinon");
var main = require("../app/controllers/main.js");

describe('Main', function(){

  it('Should show menu with all options.', function(){

    var spy = sinon.spy(console, "log");
    main().run();
    assert(spy.calledWith('***********************************'));
    assert(spy.calledWith('1. Create Studet'));
    assert(spy.calledWith('2. Create Teacher'));
    assert(spy.calledWith('3. Enroll student to a course'));
    assert(spy.calledWith('4. Get teacher to teach a course'));
    assert(spy.calledWith('5. List all courses'));
    assert(spy.calledWith('6. Test teacher grade a student'));
    assert(spy.calledWith('7. exit'));
    assert(spy.calledWith('***********************************'));
  });

  it('Should subscribe.', function(){

  });
});