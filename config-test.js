'use strict'
module.exports = {
  dataDirectory: __dirname + '/data/',
  serverPORT: 7005,
  resources:{
    teachers:'teachers',
    students:'students',
    courses: 'courses',
    users: 'users'
  },
  mongoDb: "mongodb://localhost/cursoNode-test"
};