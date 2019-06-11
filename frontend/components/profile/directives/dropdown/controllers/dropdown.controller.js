restaurantangular.controller('DropdownCtrl',['$scope','services',function($scope,services){
    $scope.loadDependentPicklist = function(){
        if($scope.dependentField){
            if ($scope.model.value.filename){
                services.getResource(`countries/${$scope.model.value.filename}.json`).then(function(response){
                    $scope.dependentField.values = response;
                });
            } else {
                $scope.dependentField.values = [];
            }
        }
    };
    // to fix asynchrony between the promise in the profile controller and this
    // state sometimes doesnt enable? not sure how to fix 
    $scope.$watch('model.value', function(){        
        if ($scope.model != null && $scope.model.value != null)
            $scope.loadDependentPicklist();
    });
}]);