'use strict'

/*
 Define the times method for the String objects, which receives a number and returns the string repeated that number of
 times:
 i.e: “*”.times(5) ///prints “*****”
 */
module.exports = {

  init: function() {
    String.prototype.times = function (number) {
      var i = 0;
      var output = ''
      for (i; i < number; i++) {
        output += this;
      }
      console.log(output);
    }
  }
}
