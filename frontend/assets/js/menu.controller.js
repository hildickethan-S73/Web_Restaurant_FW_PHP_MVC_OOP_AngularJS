restaurantangular.controller('menuCtrl', function($scope,CommonService,userdata,services,toastr,$rootScope){
    $scope.open = function(){
        CommonService.openModal('frontend/components/login/view/login.view.html','loginCtrl');
    }

    services.getF('login','check').then(function(response){
        if (response != "notlogged"){
            $rootScope.loggedin=true;
            if (response.admin == 1){
                $rootScope.admin = true;
            } else {
                $rootScope.admin = false;
            }
            userdata.user = response;
            $rootScope.user = userdata.user;
            localStorage.setItem('token',userdata.user.token);
            // console.log(userdata);
        } else {
            $rootScope.loggedin=false;
        }
    });

    $scope.logout = function(){
        services.deleteF('login','logout').then(function(response){
            if(response == "success"){
                $rootScope.loggedin=false;
                delete $rootScope.user;
                userdata = "";
                localStorage.removeItem('token');
                toastr.success('Logged out', 'Success',{
                    closeButton: true
                });
                location.href="#/";
            }
        });
    };
});