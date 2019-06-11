restaurantangular.controller('menuCtrl', function($scope,CommonService,userdata,services,toastr,$rootScope){
    var cart = JSON.parse(localStorage.getItem('cart'));
    $rootScope.totalitems = 0;
    if (cart == null) {
        cart = {"restaurants":[]};
        localStorage.setItem('cart',JSON.stringify(makeshiftcart));
    }
    angular.forEach(cart.restaurants, function(r){
        $rootScope.totalitems += r.quantity;
    });
    $scope.open = function(){
        CommonService.openModal('frontend/components/login/view/login.view.html','loginCtrl');
    }

    services.getF('login','check').then(function(response){
        if (response != "notlogged"){
            if (response.admin == 1){
                $rootScope.admin = true;
            } else {
                $rootScope.admin = false;
            }
            userdata.user = response;
            // console.log(userdata.user);

            
            $rootScope.user = userdata.user;
            localStorage.setItem('token',userdata.user.token);
            $rootScope.loggedin=true;
            $rootScope.$broadcast('user-logged');
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