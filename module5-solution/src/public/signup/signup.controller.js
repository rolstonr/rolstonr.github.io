(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var $ctrl = this;
  var message = "";
  //console.log("Signup Controller()");

  $ctrl.submit = function () {
    //console.log("submit(), menu number " + $ctrl.user.menunumber);
    var promise = MenuService.getFavorite($ctrl.user.menunumber);
    promise.then(function(response){
      MenuService.saveProfile($ctrl.user, response.data);
      $ctrl.message = "Your information has been saved";
    })
    .catch(function(error){
      $ctrl.message = "No such menu number exists";
    });
  };
}

})();
