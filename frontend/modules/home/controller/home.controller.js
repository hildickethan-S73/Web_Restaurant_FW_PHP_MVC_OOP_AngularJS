restaurantangular.controller('mainCtrl', function($scope,restaurants,searchdata){
  $scope.restaurants = restaurants;
  $scope.numPerPage = 3;
  $scope.currentPage = 1;

  $scope.filteredRestaurants = $scope.restaurants.slice(0, 3);
  $scope.pageChanged = function() {
      var startPos = ($scope.currentPage - 1) * 3;
      $scope.filteredRestaurants = $scope.restaurants.slice(startPos, startPos + 3);
  };
  $scope.set = function(data) {
    searchdata.search.searchname = data['searchname'];
    searchdata.search.searchtastes = data['searchtastes'];
    searchdata.search.searchtype = data['searchtype'];
  }
  
  
  var filteredArray = [];
  $scope.autocompleteRestaurants = {};

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

  $scope.fillTextbox = function (string, event) {
    var id = event.target.parentNode.parentNode.parentNode.children[0].id;
    $scope.searchform[id] = string;
    $scope.autocompleteRestaurants[id] = null;
  }
});