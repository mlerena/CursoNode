var assert = require("assert");
var should = require("should");
var sinon = require("sinon");


describe('Student', function(){

  var Student = require("../modules/student.js");
  var Person = require('../modules/person.js');
  var Course  = require('../modules/course');
  var Teacher = require('../modules/teacher');

  it('Should be an instance of Person', function(){

    var opt ={}
    var student = new Student(opt);

    student.should.be.an.instanceOf(Person);
  });

  it('Should be initialized WITH options', function(){

    var opt = {
      '_avgGrade': 10,
      '_currentGrades':{'cso':10}
    }
    var student = new Student(opt);

    student.should.have.property('_avgGrade', 10);
    student.should.have.property('_currentGrades', {'cso':10});
  });
  it('Should be initialized WITHOUT options', function(){

    var opt = {}
    var student = new Student(opt);

    student.should.have.property('_avgGrade', 0);
    student.should.have.property('_currentGrades', {});
  });

  it('Should be enroll to course', function(){

    var opt = {_id: 30, '_avgGrade': 10};
    var student = new Student(opt);
    var teacher = sinon.stub(new Teacher({}));
    var course = sinon.stub(new Course({_name: 'course'}));
    course.setTeacher(teacher);
    student.enrollToCourse(course);

  });
});