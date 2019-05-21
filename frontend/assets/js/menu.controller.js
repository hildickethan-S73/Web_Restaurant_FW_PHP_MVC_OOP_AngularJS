restaurantangular.controller('menuCtrl', function($scope,CommonService,userdata,services,toastr,$rootScope){
    $scope.open = function(){
        CommonService.openModal('frontend/components/login/view/login.view.html','loginCtrl');
    }

    services.getF('login','check').then(function(response){
        if (response != "notlogged"){
            $rootScope.loggedin=true;
            userdata = response;
            $rootScope.user = userdata;
            // console.log($rootScope.user);
        } else {
            $rootScope.loggedin=false;
        }
    });

    $scope.logout = function(){
        services.deleteF('login','logout').then(function(response){
            if(response == "success"){
                $rootScope.loggedin=false;
                userdata = "";
                localStorage.removeItem('token');
                toastr.success('Logged out', 'Success',{
                    closeButton: true
                });
            }
        });
    }
});