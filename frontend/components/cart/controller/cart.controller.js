restaurantangular.controller('cartCtrl', function($scope,$rootScope,services,toastr){
    // PROFILE     
    $scope.totalPurchases = function() {
        $scope.$watch('loggedin',function(){
            if ($rootScope.loggedin) {
                services.get('cart',`groupby-pid/uid-${$rootScope.user.id}`).then(function(response){
                    $scope.totalpurchases = response.length;
                });
            }
        });
    };

    // TAB
    $scope.loadPurchases = function() {
        $scope.$watch('loggedin',function(){
            if ($rootScope.loggedin) {
                services.get('cart',`uid-${$rootScope.user.id}`).then(function(response){
                    $scope.purchases = {};
                    var num = 1;
                    var prev;
                    
                    services.get('restaurants').then(function(response2){
                        angular.forEach(response, function(e){
                            if ($scope.purchases[num] == undefined){
                                $scope.purchases[num] = {
                                    "restaurants": [e],
                                    "totalprice": e.quantity*e.price
                                };                            
                            } else {
                                $scope.purchases[num].restaurants.push(e);
                                $scope.purchases[num].totalprice += e.quantity*e.price;
                            }
    
                            
                            if (e.pid != prev)
                                num++;
                            prev = e.pid;

                            var index = response2.findIndex( r => r.id === e.rid );
                            e.name = response2[index].name;
                        });  
                    });
                });
            }
        });
    }

    // CART page
    var cart = JSON.parse(localStorage.getItem('cart'));
    
    var totalprice = 0;
    angular.forEach(cart.restaurants,function(r){
        totalprice += (r.quantity*r.price)
    });
    
    $scope.cart = {
        restaurants: cart.restaurants,
        totalprice: totalprice
    };

    $scope.plus = function(r) {
        r.quantity += 1;
        $rootScope.totalitems += 1;
        $scope.cart.totalprice += parseInt(r.price);
        localStorage.setItem('cart',JSON.stringify(cart));
    };

    $scope.minus = function(r) {
        r.quantity -= 1;  
        $rootScope.totalitems -= 1;
        $scope.cart.totalprice -= parseInt(r.price);
        localStorage.setItem('cart',JSON.stringify(cart));
    };

    $scope.remove = function(r,index) {
        $scope.cart.totalprice -= parseInt(r.price * r.quantity);
        $rootScope.totalitems -= parseInt(r.quantity);
        if (cart.restaurants.length == 1){
            cart.restaurants.pop();
        } else {
            cart.restaurants.splice(index, 1);
        }
        
        localStorage.setItem('cart',JSON.stringify(cart));
    };

    $scope.checkout = function() {
        var data = {
            "cart":$scope.cart.restaurants
        };

        if ($rootScope.loggedin) {
            services.postF('cart',data,'checkout').then(function(response){
                // should check if no error
                if (response) {
                    toastr.success('Thank you for purchasing.','Success');
                    $scope.empty();
                }
            });
        } else {
            toastr.warning('You must log in to checkout.','Notice');
        }
    }

    $scope.empty = function() {
        $scope.cart.restaurants = [];
        $scope.cart.totalprice = 0;
        $rootScope.totalitems = 0;
        localStorage.setItem('cart',JSON.stringify({"restaurants":[]}));
    }
});