'use strict'

var Student = require('./student');
var Teacher = require('./teacher');
var Course = require('./course');
var Collection = require('./collection');
var AddPersonMenu = require('./add-person-menu');
var PersonCourseMenu = require ('./person-course-menu')

var Main = function() {

  var stdin = process.openStdin();
  var students = new Collection();
  var teachers = new Collection();
  var courses = new Collection();
  courses.addItem(new Course({name: 'Math', minAvgGrade: 10}));
  courses.addItem(new Course({name: 'Art', minAvgGrade: 5}));

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
    process.stdout.write('*********************************** \n');

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
    } else if(userOption === 5){

      testTeacherGradeStudent();
      mainMenu();
    } else if (userOption === 6) {
      process.exit();
    }
  }

  function mainMenu() {
    process.stdout.write('*********************************** \n');
    process.stdout.write('1. Create Studet \n');
    process.stdout.write('2. Create Teacher \n');
    process.stdout.write('3. Enroll student to a course \n');
    process.stdout.write('4. Get teacher to teach a course \n');
    process.stdout.write('5. Test teacher grade a student \n');
    process.stdout.write('6. exit\n');
    process.stdout.write('*********************************** \n');

    stdin.addListener("data", processUserInput);
  }

  return function() {
    return {
      run: mainMenu
    }
  }
}

module.exports = Main();
