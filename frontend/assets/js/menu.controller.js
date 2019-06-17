/**
  * @this vm
  * @ngdoc controller
  * @name restaurantangular.controller:menuCtrl
  *
  * @description
  * Controller for the menu, started with an ng-include
*/
restaurantangular.controller('menuCtrl', function($scope,CommonService,userdata,services,toastr,$rootScope){
    // Gets cart to check for total items (shown in menu)
    var cart = JSON.parse(localStorage.getItem('cart'));
    $rootScope.totalitems = 0;
    if (cart == null) {
        cart = {"restaurants":[]};
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    angular.forEach(cart.restaurants, function(r){
        $rootScope.totalitems += r.quantity;
    });


    /**
      * @ngdoc method
      * @name menuCtrl#open
      *
      * @methodOf
      * restaurantangular.controller:menuCtrl
      *
      * @description
      * Opens the login/register modal
    */
    $scope.open = function(){
        CommonService.openModal('frontend/components/login/view/login.view.html','loginCtrl');
    }

    // checks if user is logged in to re-set the userdata service and rootScope
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

    /**
      * @ngdoc method
      * @name menuCtrl#logout
      *
      * @methodOf
      * restaurantangular.controller:menuCtrl
      *
      * @description
      * Logs the user out and redirects to home
    */
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