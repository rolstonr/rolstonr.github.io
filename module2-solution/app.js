/*
Richard Rolston
Coursera Class: Single Page Web Applications with AngularJs
Module 2 Coding Assignment
Instructor: Yaakov Chaikin
Date: May 6, 2017
*/
(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// 'To Buy' list controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  list1.items = ShoppingListCheckOffService.getItemsToBuy();

  list1.itemName = "";
  list1.itemQuantity = "";

  list1.addItem = function () {
    try {
      ShoppingListCheckOffService.addItemToBuy(list1.itemName, list1.itemQuantity);
    } catch (error) {
      list2.errorMessage = error.message;
    }
  }

  list1.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItemBought(itemIndex);
  };
}

// 'Already bought' list controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  list2.items = ShoppingListCheckOffService.getItemsBought();

  list2.itemName = "";
  list2.itemQuantity = "";

  list2.addItem = function () {
    try {
      ShoppingListCheckOffService.addItemBought(list2.itemName, list2.itemQuantity);
    } catch (error) {
      list2.errorMessage = error.message;
    }
  }
}

// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
  { name: "pens", quantity: 5 },
  { name: "pencils", quantity: 10 },
  { name: "notepads", quantity: 5 },
  { name: "eraser", quantity: 1 },
  { name: "binders", quantity: 6 },
  { name: "pencil sharpeners", quantity: 1 },
  { name: "protractor", quantity: 1 },
  { name: "box of crayons", quantity: 1 }
  ];

  var itemsBought = [];

  service.addItemToBuy = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsToBuy.push(item);
  };

  service.removeItemBought = function (itemIndex) {
    itemsBought.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };
}

})();
