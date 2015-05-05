'use strict'

var times = require('./modules/times');
times.init();
var theString = "theString";
theString.times(5);


(function () {
  console.log(one(3));

  var test = 5;
  function one(value) {
        if (value > 2) {
          return one(value - 1);
        }
        return value - 1;
      };

  console.log(one(test));

  var identity = function one(value) {
    return value;
  }(4);
}());
