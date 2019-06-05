restaurantangular.controller('DropdownCtrl',['$scope','$http',function($scope,$http){
    var data = {
      'India' : ['Mumbai','Kolkata','Chennai','Delhi'],
      'USA' : ['San Francisco','Los Angeles'],
      'Mumbai':['Boriwali','Kandiwali']
    };
    
    $scope.loadDependentPicklist = function(){
      if($scope.dependentField){
        $scope.dependentField.values = data[$scope.model.value]; 
      
        // load data through $http
      }
    };
}]);