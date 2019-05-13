restaurantangular.controller('menuCtrl', function($scope,CommonService){
    $scope.open = function(){
        CommonService.openModal();
    }
});