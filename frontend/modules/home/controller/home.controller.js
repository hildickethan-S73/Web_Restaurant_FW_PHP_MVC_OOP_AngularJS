restaurantangular.controller('mainCtrl', function($scope,restaurants){
  // r = JSON.parse(restaurants);
  $scope.restaurants = restaurants;
  $scope.numPerPage = 3;
  $scope.currentPage = 1;
  $scope.test = true;

  $scope.filteredRestaurants = $scope.restaurants.slice(0, 3);
	$scope.pageChanged = function() {
	  var startPos = ($scope.currentPage - 1) * 3;
	  $scope.filteredRestaurants = $scope.restaurants.slice(startPos, startPos + 3);
	//   console.log($scope.currentPage);
	};
  // console.log(restaurants);
  
  var filteredArray = [];
  $scope.searchRestaurants = {};

  $scope.complete = function (searched, event) {
    var id = event.target.id;
    var output = [];
    searched['searchname'] = searched['searchname'] || "";
    //  searched['product_name'] = searched['product_name'] || "";
    //  searched['available_until'] = searched['available_until'] || "";
    console.log(searched['searchname']);
    console.log(id);
    
    if (Object.keys($scope.searchRestaurants).length == 0) {
      $scope.searchRestaurants[id] = restaurants;
    } else {
      $scope.searchRestaurants[id] = filteredArray;
      filteredArray = [];
    }
    
    angular.forEach(restaurants,function(r){
      if (r['name'].toLowerCase().startsWith(searched['searchname'].toLowerCase()) 
      //  product['product_name'].toLowerCase().startsWith(searched['product_name'].toLowerCase()) &&
      //  product['available_until'].toLowerCase().startsWith(searched['available_until'].toLowerCase())
      ) {
        filteredArray.push(r);
        output.push(r['name']);
      }
    });
    console.log(filteredArray);
    
    $scope.searchRestaurants[id] = output;
    
    console.log($scope.searchRestaurants[id]);
  }
  // $scope.fillTextbox = function (string, event) {
  //    var id = event.target.parentNode.parentNode.children[0].id;
  //    $scope.searched[id] = string;
  //    $scope.searchRestaurants[id] = null;
  // }
});