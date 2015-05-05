'use strict'

var Student = require('./modules/student');
var Teacher = require('./modules/teacher');
var Course = require('./modules/course');
var newPersonState = false;
var enrollStudentState = false;

var students = [];
var teachers = [];
var courses = [new Course('Math', 10), new Course('Art', 5)];
var personObject = {};
var enrollStudentObject = {};
var teacherObject = {};

var Course = new Course('Math', 10);
Course.addCourse(Course);
//ame, address, birthDate, friends, studentId, avgGrade, currentGrades
var student = new Student('manuel', 'Carlos Garde', new Date('1978-11-28'), [], 1);
console.log(student.getEdge());

function displayCoursesList() {

  process.stdout.write('"Select course number \n');
  courses.forEach(function (course, index) {
    process.stdout.write('('. index + 1 + '). ' + course.getName() + '\n');
  });
  process.stdout.write('"exit" to return \n');
}

function getCourseById(id) {
  return courses[id - 1];
}

function newPerson(argv) {

  newPersonState = true;

  function exit() {

    newPersonState = false;
    personObject = {};
    personObject.type = '';
    mainMenu();
  }

  function setUpTypeByMenuOption(menuOption) {

    if (parseInt(menuOption) === 1) {
      personObject.type = 'Student';
    } else if (parseInt(menuOption) === 2) {
      personObject.type = 'Teacher';
    }
  }

  function savePerson() {
    if (personObject.type === 'Student') {

      students.push(new Student(personObject));
    } else {
      teachers.push(new Teacher(personObject));
    }
  }

  if (argv === 'exit') {
    exit();
  } else {
    if (!personObject.name) {
      if (parseInt(argv) !== 1 && parseInt(argv) !== 2) {
        personObject.name = argv;
        process.stdout.write('Write "' + personObject.type + ' address" or "exit" to return \n');
      } else {
        setUpTypeByMenuOption(argv);
        process.stdout.write('Write "' + personObject.type + ' name" or "exit" to return \n');
      }
    } else if (!personObject.address) {
      if (argv) {
        personObject.address = argv;
        process.stdout.write('Write "' + personObject.type + ' birthdate" or "exit" to return \n');
      } else {
        process.stdout.write('Write "' + personObject.type + ' address" or "exit" to return \n');
      }
    } else if (!personObject.birthDate) {
      if (argv) {
        personObject.birthDate = argv;
        savePerson();
        exit();
      } else {
        process.stdout.write('Write "' + personObject.type + ' birthDate" or "exit" to return \n');
      }
    }
  }
}

function enrollStudent(argv) {

  argv = parseInt(argv)
  function exit() {

    enrollStudentState = false;
    enrollStudentObject = {};
    mainMenu();
  }

  function displayStudentList() {

    process.stdout.write('Select Student Number \n');
    students.forEach(function (student, index) {
      process.stdout.write('(' + index + 1 + '). ' + student.getName() + '\n');
    });
    process.stdout.write('"exit" to return \n');
  }

  function getStudentById(id) {

    return students[id - 1];
  }


  if (argv === 'exit') {
    exit();
  } else {

    enrollStudentState = true;
    if (!enrollStudentObject.student && argv === 3) {
      displayStudentList();
    } else if (!enrollStudentObject.student) {
      enrollStudentObject.student = getStudentById(argv);
      displayCoursesList()
    } else if (!enrollStudentObject.course) {
      enrollStudentObject.course = getCourseById(argv);
      enrollStudentObject.course.addStudent(enrollStudentObject.student);
      exit();
    }
  }
}

function addTeacherToCourse(argv) {

  argv = parseInt(argv)
  function exit() {

    enrollStudentState = false;
    enrollStudentObject = {};
    mainMenu();
  }

  function displayTeacherList() {

    process.stdout.write('Select Student Number \n');
    students.forEach(function (student, index) {
      process.stdout.write('('. index + 1 + '). ' + student.getName() + '\n');
    });
    process.stdout.write('"exit" to return \n');
  }

  function getTeacherById(id) {

    return teachers[id - 1];
  }

  if (argv === 'exit') {
    exit();
  } else {

    enrollStudentState = true;
    if (!teacherObject.teacher && argv === 3) {
      displayTeacherList();
    } else if (!teacherObject.teacher) {
      teacherObject.teacher = getTeacherById(argv);
      displayCoursesList()
    } else if (!teacherObject.course) {
      teacherObject.teacher.teachCourse(teacherObject.course);
      exit();
    }
  }
}

var mainMenu = function (firstRun) {

  var stdin = process.openStdin();
  process.stdout.write('1. Create Studet \n');
  process.stdout.write('2. Create Teacher \n');
  process.stdout.write('3. Enroll student to a course \n');
  process.stdout.write('4 Get teacher to teach a course \n');
  process.stdout.write('5 exit\n');

  if (firstRun) {

    stdin.addListener("data", function (d) {

      var userOption = d.toString().substring(0, d.length - 1);
      if (enrollStudentState || parseInt(userOption) === 3) {
        enrollStudent(userOption);
      } else if (newPersonState || parseInt(userOption) === 1 || parseInt(userOption) === 2) {
        newPerson(userOption);
      } else if (parseInt(userOption) === 5) {
        process.exit();
      }
    });
  }
}

mainMenu(true);
