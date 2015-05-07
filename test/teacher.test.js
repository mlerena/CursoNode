var assert = require("assert");
var should = require("should");
var sinon = require("sinon");


describe('Teacher', function(){

  var Teacher = require("../modules/teacher.js");
  it('Should be an instance of Person', function(){
    var Person = require('../modules/person.js');
    var opt ={}
    var teacher = new Teacher(opt);

    teacher.should.be.an.instanceOf(Person);
  });

  it('Should teach a course', function(){

    var Course = require('../modules/course.js');
    var course = new Course({});
    var spy = sinon.spy(course, "setTeacher");
    var opt ={}
    var teacher = new Teacher(opt);

    teacher.teachCourse(course);
    spy.calledWith(teacher);
  });

  it('Should call Student when grade a student.', function(){

    var Course = require('../modules/course.js');
    var Student = require('../modules/student.js');

    var course = new Course({});
    var student = new Student({_id:2});
    var spyStudent = sinon.spy(student, "setCourseGrade");
    var opt ={}
    var teacher = new Teacher(opt);
    var spyTeacher = sinon.spy(teacher, "emit");
    teacher.gradeStudent(student, course, 10);

    spyStudent.calledWith(course, 10).should.be.exactly(true);
    spyTeacher.calledWith('teacher:grade-student:2', student, course, 10).should.be.exactly(true);

  });

  it('Should emit event with the student id when grade a student.', function(){

    var Course = require('../modules/course.js');
    var Student = require('../modules/student.js');

    var course = new Course({});
    var student = new Student({_id:2});
    var spyStudent = sinon.spy(student, "setCourseGrade");
    var opt ={}
    var teacher = new Teacher(opt);
    var spyTeacher = sinon.spy(teacher, "emit");
    teacher.gradeStudent(student, course, 10);
    spyTeacher.calledWith('teacher:grade-student:2', student, course, 10).should.be.exactly(true);

  });

  it('Should log information when grade a student.', function(){

    var Course = require('../modules/course.js');
    var Student = require('../modules/student.js');
    var Logger = require('../modules/logger.js');

    var course = new Course({});
    var student = new Student({_id:2});
    student.getName = function(){
      return 'name';
    }
    var spyLogger = sinon.spy(Logger, "info");
    var opt ={}
    var teacher = new Teacher(opt);
    teacher.gradeStudent(student, course, 10);
    //Teacher grade:' + student.getName() + '. Grade:' + grade
    spyLogger.calledWith('Teacher grade:name. Grade:10').should.be.exactly(true);
  });

});