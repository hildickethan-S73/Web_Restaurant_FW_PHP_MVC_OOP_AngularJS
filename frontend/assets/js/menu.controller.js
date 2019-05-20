restaurantangular.controller('menuCtrl', function($scope,CommonService,userdata,services,toastr){
    $scope.open = function(){
        CommonService.openModal('frontend/components/login/view/login.view.html','loginCtrl');
    }

    $scope.$on('login',function(){
        $scope.loggedin=true;
        userdata = response;
        $scope.user = userdata;
        console.log($scope.user);
    });

    services.getF('login','check').then(function(response){
        if (response != "notlogged"){
            $scope.loggedin=true;
            userdata = response;
            $scope.user = userdata;
            console.log($scope.user);
        } else {
            $scope.loggedin=false;
        }
    });

    $scope.logout = function(){
        services.deleteF('login','logout').then(function(response){
            if(response == "success"){
                $scope.loggedin=false;
                userdata = "";
                toastr.success('Logged out', 'Success',{
                    closeButton: true
                });
            }
        });
    }
});