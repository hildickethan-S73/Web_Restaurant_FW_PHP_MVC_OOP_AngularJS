/**
  * @this vm
  * @ngdoc controller
  * @name restaurantangular.controller:mainCtrl
  *
  * @description
  * Controller for the home or "main" page
*/
restaurantangular.controller('mainCtrl', function($scope,restaurants,searchdata){
  $scope.restaurants = restaurants;
  $scope.numPerPage = 3;
  $scope.currentPage = 1;

  $scope.filteredRestaurants = $scope.restaurants.slice(0, 3);
  /**
    * @ngdoc method
    * @name mainCtrl#pageChanged
    *
    * @methodOf
    * restaurantangular.controller:mainCtrl
    *
    * @description
    * Refilter pagination restaurants when page changed
  */
  $scope.pageChanged = function() {
      var startPos = ($scope.currentPage - 1) * 3;
      $scope.filteredRestaurants = $scope.restaurants.slice(startPos, startPos + 3);
  };
  
  /**
    * @ngdoc method
    * @name mainCtrl#set
    *
    * @methodOf
    * restaurantangular.controller:mainCtrl
    *
    * @description
    * Set the searchdata in the service
  */
  $scope.set = function(data) {
    searchdata.search.searchname = data['searchname'];
    searchdata.search.searchtastes = data['searchtastes'];
    searchdata.search.searchtype = data['searchtype'];
  }
  
  
  var filteredArray = [];
  $scope.autocompleteRestaurants = {};

  /**
    * @ngdoc method
    * @name mainCtrl#autocomplete
    *
    * @methodOf
    * restaurantangular.controller:mainCtrl
    *
    * @description
    * Autocomplete fields in the search bar
    * 
    * @param {object} searchform the search data
    * @param {object} event the event to know what field was clicked on
  */
  $scope.autocomplete = function (searchform, event) {
    var id = event.target.id;
    var output = [];
    searchform['searchname'] = searchform['searchname'] || "";
    searchform['searchtastes'] = searchform['searchtastes'] || "";
    target = id.substring(6);

    if (searchform[id] != ""){
      if (Object.keys($scope.autocompleteRestaurants).length == 0) {
        $scope.autocompleteRestaurants[id] = restaurants;
      } else {
        $scope.autocompleteRestaurants[id] = filteredArray;
        filteredArray = [];
      }
      
      angular.forEach(restaurants,function(r){
        if (searchform['searchtype'] == "Type" || searchform['searchtype'] ==  undefined){
          if (r['name'].toLowerCase().startsWith(searchform['searchname'].toLowerCase()) && 
              r['tastes'].toLowerCase().startsWith(searchform['searchtastes'].toLowerCase())) {
            filteredArray.push(r);
            output.push(r[target]);
          }
        } else {
          if (r['name'].toLowerCase().startsWith(searchform['searchname'].toLowerCase()) &&
              r['type'] == searchform['searchtype'] &&
              r['tastes'].toLowerCase().startsWith(searchform['searchtastes'].toLowerCase())) {
            filteredArray.push(r);
            output.push(r[target]);
          }
        }
      });
      $scope.autocompleteRestaurants[id] = output;
    } else {
      $scope.autocompleteRestaurants[id] = null;
    }
  }

  /**
      * @ngdoc method
      * @name mainCtrl#fillTextbox
      *
      * @methodOf
      * restaurantangular.controller:mainCtrl
      *
      * @description
      * Fills the field with the autocompleted info
      * 
      * @param {string} string the autocompleted string
      * @param {object} event the field in question
    */
  $scope.fillTextbox = function (string, event) {
    var id = event.target.parentNode.parentNode.parentNode.children[0].id;
    $scope.searchform[id] = string;
    $scope.autocompleteRestaurants[id] = null;
  }
});