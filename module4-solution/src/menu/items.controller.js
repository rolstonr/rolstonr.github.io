(function() {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['$stateParams', 'items'];
function ItemsController($stateParams, items) {
  var itemsController = this;

  itemsController.items = items.menu_items;
  itemsController.category = $stateParams.category;
}

})();
