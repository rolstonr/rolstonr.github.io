(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['MenuService'];
function InfoController(MenuService, ApiPath) {
  var $ctrl = this;

  $ctrl.profile = MenuService.getUser();
  $ctrl.basePath = ApiPath;
}

})();
