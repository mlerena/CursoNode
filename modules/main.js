'use strict'

var Student = require('./student');
var Teacher = require('./teacher');
var Course = require('./course');
var Collection = require('./collection');
var AddPersonMenu = require('./add-person-menu');
var PersonCourseMenu = require ('./person-course-menu');
var CourseCollection = require('./course-collection');
var logger = require('./logger');
var when = require('when');

var Main = function() {

  logger.info("Start application");
  var stdin = process.openStdin();
  var students = new Collection({'fileName':'students', 'itemConstructor': Student});
  var teachers = new Collection({'fileName':'teachers', 'itemConstructor': Teacher});
  var courses = new CourseCollection({'fileName':'courses', 'itemConstructor': Course});


  function init() {
    var promises = [];
    promises.push(students.setUp());
    promises.push(teachers.setUp());
    promises.push(courses.setUp());

    when.all(promises).then(function(){

      if (courses.count() === 0) {

        courses.addItem(new Course({_name: 'Math', _minAvgGrade: 10}));
        courses.addItem(new Course({_name: 'Art', _minAvgGrade: 5}));
        courses.addItem(new Course({_name: 'Fut', _minAvgGrade: 7}));
        courses.addItem(new Course({_name: 'Bask', _minAvgGrade: 8}));
        courses.addItem(new Course({_name: 'Bol', _minAvgGrade: 3}));
      }

     mainMenu();
    });
  }
  function processNewPerson (newPerson) {

    if (newPerson) {
      if (newPerson.type === 'student') {
        logger.info('Create new Student: ' +  newPerson._name);
        students.addItem(new Student(newPerson));
      } else if (newPerson.type === 'teacher') {
        logger.info('Create new Teacher: ' + newPerson._name);
        teachers.addItem(new Teacher(newPerson));
      }
    }
    mainMenu();
  }

  function assignPersonToCourse (personCourse) {
    if (personCourse) {

      if (personCourse.personType.toLowerCase() === 'student') {
        logger.info('Add student '+personCourse.person.getName()+ ' to course: '+ personCourse.course.getName());
        personCourse.course.addStudent(personCourse.person);
      } else {
        logger.info('Set teacher: ' +personCourse.person.getName()+ ' to course:'+ personCourse.course.getName());
        personCourse.course.setTeacher(personCourse.person);
      }
    }
    mainMenu();
  }

  function testTeacherGradeStudent() {

   var teacher = teachers.getItemById(1);
   var student = students.getItemById(2);
   var course = courses.getItemById(1);
    if (teacher && student && course) {
      course.setTeacher(teacher);
      teacher.gradeStudent(student, course, 20);
    }
  }

  function processUserInput (userInput) {

    var userOption = parseInt(userInput.toString().substring(0, userInput.length - 1));
    var menu = {};

    if (userOption === 1) {

      menu = new AddPersonMenu('student');
      menu.on('finish', processNewPerson);
      stdin.removeListener("data", processUserInput);
    } else if (userOption === 2) {

      menu = new AddPersonMenu('teacher');
      menu.on('finish', processNewPerson);
      stdin.removeListener("data", processUserInput);
    } else if (userOption === 3 || userOption === 4) {

      if (userOption === 4) {
        menu = new PersonCourseMenu(teachers, courses, 'Teacher');
      } else {
        menu = new PersonCourseMenu(students, courses, 'Student');
      }
      menu.on('finish', assignPersonToCourse);
      stdin.removeListener("data", processUserInput);
    }else if(userOption === 5){

      courses.fullPrint();
      stdin.removeListener("data", processUserInput);
      mainMenu();
    } else if(userOption === 6){

      testTeacherGradeStudent();
      mainMenu();
    } else if (userOption === 7) {

      var promises = [];
      promises.push(students.save());
      promises.push(teachers.save());
      promises.push(courses.save());
      when.all(promises).then(function(){
        process.exit();
      });
    }
  }

  function mainMenu() {

    console.log('***********************************');
    console.log('1. Create Studet');
    console.log('2. Create Teacher');
    console.log('3. Enroll student to a course');
    console.log('4. Get teacher to teach a course');
    console.log('5. List all courses');
    console.log('6. Test teacher grade a student');
    console.log('7. exit');
    console.log('***********************************');

    stdin.addListener("data", processUserInput);
  }

  return function() {
    return {
      run: init
    }
  }
}

module.exports = Main();
