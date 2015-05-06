'use strict'

var Student = require('./student');
var Teacher = require('./teacher');
var Course = require('./course');
var Collection = require('./collection');
var AddPersonMenu = require('./add-person-menu');
var PersonCourseMenu = require ('./person-course-menu');
var CourseCollection = require('./course-collection');


var Main = function() {

  var stdin = process.openStdin();
  var students = new Collection({'fileName':'students', 'itemConstructor': Student});
  var teachers = new Collection({'fileName':'teachers', 'itemConstructor': Teacher});
  var courses = new CourseCollection({'fileName':'courses', 'itemConstructor': Course});
  courses.addItem(new Course({_name: 'Math', _minAvgGrade: 10}));
  courses.addItem(new Course({_name: 'Art', _minAvgGrade: 5}));

  function processNewPerson (newPerson) {

    if (newPerson) {
      if (newPerson.type === 'student') {
        students.addItem(new Student(newPerson));
      } else if (newPerson.type === 'teacher') {
        teachers.addItem(new Teacher(newPerson));
      }
    }
    mainMenu();
  }

  function assignPersonToCourse (personCourse) {
    if (personCourse) {

      if (personCourse.type === 'Student') {
        personCourse.course.addStudent(personCourse.person);
      } else {
        personCourse.course.setTeacher(personCourse.person);
      }
    }
    mainMenu();
  }

  function testTeacherGradeStudent() {
/*
    var teach = new Teacher({'name':'adfs', 'address':'asdf'});
    var stud = new Student({'name':'stud', 'address':'asdf'});
    var cour = new Course({name: 'Art', minAvgGrade: 0});
    var cour2 = new Course({name: 'Math', minAvgGrade: 0});
    var cour3 = new Course({name: 'Fut', minAvgGrade: 0});

    cour.setTeacher(teach);
    stud.enrollToCourse(cour);
    teach.gradeStudent(stud, cour, 10);

    cour2.setTeacher(teach);
    stud.enrollToCourse(cour2);
    teach.gradeStudent(stud, cour2, 9);

    cour3.setTeacher(teach);
    stud.enrollToCourse(cour3);
    teach.gradeStudent(stud, cour3, 4);

    console.log('***********************************');
    var courseCollection = new CourseCollection();
    courseCollection.addItem(cour);
    courseCollection.addItem(cour2);
    courseCollection.addItem(cour3);
    courseCollection.fullPrint();
    */
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
      mainMenu();
    } else if(userOption === 6){

      testTeacherGradeStudent();
      mainMenu();
    } else if (userOption === 7) {

      students.save();
      teachers.save();
      courses.save();
      process.exit();
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
      run: mainMenu
    }
  }
}

module.exports = Main();
