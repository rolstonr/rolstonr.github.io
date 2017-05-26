(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);

MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.user = { };

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getFavorite = function(menuNumber) {
    return $http.get(ApiPath + '/menu_items/' + menuNumber + '.json');
  }

  service.saveProfile = function(user, data){
    angular.copy(user, service.user);
    service.user.data = data;
  }

  service.getUser = function(){
    return service.user;
  }

  service.getData = function(){
    return service.data;
  }
}

})();
