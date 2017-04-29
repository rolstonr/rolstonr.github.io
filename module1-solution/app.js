/*
Richard Rolston
Coursera Class: Single Page Web Applications with AngularJs
Module 1 Coding Assignment
Instructor: Yaakov Chaikin
Date: April 28, 2017
*/
(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.input = "";
  $scope.msg = "";

  $scope.displayMessage = function() {
    var count = countItems($scope.input);
    if (count == 0) {
      $scope.msg = "Please enter data first";
    }
    else if (count <= 3) {
      $scope.msg = "Enjoy!";
    }
    else {
      $scope.msg = "Too much!"
    }
  };
}

/*
Count the comma separated items in the string.
Do not count blank items.
*/
function countItems(string){
  var arrayOfStrings = string.split(',');
  var totalItems = arrayOfStrings.length;
  var empty = 0;
  for (var i = 0; i < totalItems; i++) {
    if (arrayOfStrings[i].length == 0)
      ++empty;
  }
  return totalItems - empty;
};

})();
