// Test JSON data to simulate localstorage 
// Testing all the cart functions before filling the cart in other pages

restaurantangular.controller('cartCtrl', function($scope,$rootScope){
    var restaurants = [];
    restaurants.push({
        "name":"jordilg13",
        "quantity":1,
        "price":3,
        "img":"frontend/assets/img/bgrestaurant.jpg"
    });
    restaurants.push({
        "name":"raulojeda22",
        "quantity":8,
        "price":10,
        "img":"frontend/assets/img/bgrestaurant.jpg"
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
});