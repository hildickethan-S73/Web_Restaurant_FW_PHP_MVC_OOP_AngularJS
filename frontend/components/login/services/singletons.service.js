/**
  * @ngdoc service
  * @name restaurantangular.userdata
  * 
  * @description
  * Place to save the users data
  * I think this is looked down upon as not being the Angular way
  * Could probably use rootScope instead
**/
restaurantangular.factory("userdata", [function () {
    return {
      user: {}
    }
}]);