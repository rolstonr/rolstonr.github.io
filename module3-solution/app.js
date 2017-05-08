/*
Richard Rolston
Coursera Class: Single Page Web Applications with AngularJs
Module 3 Coding Assignment
Instructor: Yaakov Chaikin
Date: May 13, 2017
*/
(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.itemsInList = function () {
        return (list.found ? ((!list.found.length != 0) ? true : false) : false);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm, foundItems)
  {
      var promise = $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json')
              });

      promise.then(function (result)
              {
                  // process result and only keep items that match
                  if (searchTerm && searchTerm.length > 0)
                  {
                    for (var i = 0; i < result.data.menu_items.length; i++)
                    {
                          if (result.data.menu_items[i].description.indexOf(searchTerm) != -1)
                          {
                            // console.log(result.data.menu_items[i].name, "(",
                            // result.data.menu_items[i].short_name, ")",
                            // result.data.menu_items[i].description);

                            foundItems.push(result.data.menu_items[i].name + ", (" +
                            result.data.menu_items[i].short_name + "), " +
                            result.data.menu_items[i].description);
                          }
                    }
                  }

                  // return processed items wrapped in a promise
                  return foundItems;
              }); // end of promise.then
        };  // end of service.getMatchedMenuItems
}     // end of MenuSearchService

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.addItem = function () {
    var results = [];
    MenuSearchService.getMatchedMenuItems(list.itemName, results);
    list.found = results;
  };

  list.removeItem = function(index) {
    list.found.splice(index, 1);
  }
}

})();
