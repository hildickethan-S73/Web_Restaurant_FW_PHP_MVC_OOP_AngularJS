restaurantangular.controller('menuCtrl', function($scope,CommonService){
    $scope.open = function(){
        CommonService.openModal('frontend/components/login/view/login.view.html','loginCtrl');
    }

});