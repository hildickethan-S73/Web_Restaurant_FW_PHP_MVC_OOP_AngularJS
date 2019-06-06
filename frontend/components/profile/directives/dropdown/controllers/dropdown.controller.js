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
}]);