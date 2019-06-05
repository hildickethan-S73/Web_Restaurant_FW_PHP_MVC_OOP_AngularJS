restaurantangular.controller('DropdownCtrl',['$scope',function($scope){
    var data = {
      'India' : ['Mumbai','Kolkata','Chennai','Delhi'],
      'USA' : ['San Francisco','Los Angeles'],
      'Mumbai':['Boriwali','Kandiwali']
    };
    
    $scope.loadDependentPicklist = function(){
        if($scope.dependentField){
            $scope.dependentField.values = data[$scope.model.value];
        }
    };
}]);