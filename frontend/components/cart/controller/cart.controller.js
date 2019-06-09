restaurantangular.controller('cartCtrl', function($scope,$rootScope,services,toastr){
    var restaurants = [];
    restaurants.push({
        "name":"jordilg13",
        "quantity":1,
        "price":3,
        "img":"frontend/assets/img/bgrestaurant.jpg",
        "id":9
    });
    restaurants.push({
        "name":"raulojeda22",
        "quantity":8,
        "price":10,
        "img":"frontend/assets/img/bgrestaurant2.jpg",
        "id":10
    });
    
    localStorage.setItem('cart',JSON.stringify({"restaurants":restaurants}));

    var cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart.restaurants);

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
        $scope.cart.totalprice += r.price;
    };

    $scope.minus = function(r) {
        r.quantity -= 1;  
        $scope.cart.totalprice -= r.price;
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
        localStorage.setItem('cart',JSON.stringify({"restaurants":[]}));
    }
});