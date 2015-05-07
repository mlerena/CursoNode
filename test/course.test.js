var assert = require("assert");
var should = require("should");
var sinon = require("sinon");


describe('Course', function(){

  var Course = require("../modules/course.js");
  it('Should initiate as expected with no options', function(){

    var opt ={}
    var course = new Course(opt);
    course.should.have.property('_name', '');
    course.should.have.property('_id', null);
    course.should.have.property('_minAvgGrade', 0);
    course.should.have.property('_students', []);
    course.should.have.property('_teacher', null);
  });

  it('Should initiate as expected without teacher', function(){
    var opt ={
      '_name': 'courseName',
      '_id' : 2,
      '_minAvgGrade': 10,
      '_students': [{'student1':1}]
    }
    var course = new Course(opt);
    course.should.have.property('_name', 'courseName');
    course.should.have.property('_id', 2);
    course.should.have.property('_minAvgGrade', 10);
    course.should.have.property('_students', [{'student1':1}]);
    course.should.have.property('_teacher', null);
  });

  it('Should initiate as expected with teacher', function(){
    var Teacher = require("../modules/teacher.js")
    var opt ={
      '_name': 'courseName',
      '_id' : 2,
      '_minAvgGrade': 10,
      '_students': [],
      '_teacher':{
        '_id':1,
        '_name':'Teacher',
        '_birthDate': '1978-11-28'
      }
    }
    var course = new Course(opt);
    course._teacher.should.be.an.instanceOf(Teacher).and.have.property('_id',1);
    course._teacher.should.be.an.instanceOf(Teacher).and.have.property('_name','Teacher');
    course._teacher.should.be.an.instanceOf(Teacher).and.have.property('_birthDate', new Date('1978-11-28'));
  });
  it('Should set properties as expected', function(){
    var teacher = {};
    var id = 1
    var course = new Course({});
    course.setTeacher(teacher);
    course._teacher.should.be.exactly(teacher);
    course.setId(id);
    course._id.should.be.exactly(id);
  });

  it('Should add student', function(){
    var student = {'student1':1};
    var student2 = {'student1':2};
    var course = new Course({});
    course.addStudent(student);
    course.addStudent(student2);
    course._students[0].should.be.exactly(student);
    course._students[1].should.be.exactly(student2);
  });

  it('Should return students quantity', function(){
    var student = {'student1':1};
    var student2 = {'student1':2};
    var course = new Course({});
    course.getStudentsCount().should.be.exactly(0);
    course.addStudent(student);
    course.addStudent(student2);
    course.getStudentsCount().should.be.exactly(2);
    course.addStudent(student2);
    course.getStudentsCount().should.be.exactly(3);
  });

  it('Should return teacher', function(){
    var teacher = {};

    var course = new Course({});
    course.setTeacher(teacher);
    course.getTeacher().should.be.exactly(teacher);
  });

  it('Should return name, id and minAcgGrade ', function(){

    var teacher = {};

    var course = new Course({_name:'theName', _id:10, _minAvgGrade:15});
    course.setTeacher(teacher);
    course.getName().should.be.exactly('theName');
    course.getId().should.be.exactly(10);
    course.getMinAvgGrade().should.be.exactly(15);
  });


});