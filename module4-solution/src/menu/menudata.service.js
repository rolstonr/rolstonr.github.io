(function() {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
    return $http({
          url: (ApiBasePath + '/categories.json')
    }).then(function (response) {
      return response.data;
    })
  };

  service.getItemsForCategory = function(categoryShortName) {
     return $http({
       url: (ApiBasePath + '/menu_items.json'),
       params: {
         category: categoryShortName
       }
     }).then(function (response) {
       return response.data;
     })
  }
}
})();
