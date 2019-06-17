/**
  * @this vm
  * @ngdoc controller
  * @name restaurantangular.controller:cartCtrl
  *
  * @description
  * Controller for the cart
*/
restaurantangular.controller('cartCtrl', function($scope,$rootScope,services,toastr){
    // PROFILE

    /**
      * @ngdoc method
      * @name cartCtrl#totalPurchases
      *
      * @methodOf
      * restaurantangular.controller:cartCtrl
      *
      * @description
      * Calculates the total purchases of the user 
      * with a GROUP BY query
    */
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
    /**
      * @ngdoc method
      * @name cartCtrl#loadPurchases
      *
      * @methodOf
      * restaurantangular.controller:cartCtrl
      *
      * @description
      * Loads the purchases, called in the My Purchases tab
      * - Gets the users purchases
      * - Gets all restaurants for naming purposes
      * - Sorts the purchases into a new JSON object
      * - Adds the name to each relevant ID
    */ 
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
    // Gets the total price of items in the cart
    var cart = JSON.parse(localStorage.getItem('cart'));
    
    var totalprice = 0;
    angular.forEach(cart.restaurants,function(r){
        totalprice += (r.quantity*r.price)
    });
    
    $scope.cart = {
        restaurants: cart.restaurants,
        totalprice: totalprice
    };

    /**
      * @ngdoc method
      * @name cartCtrl#plus
      *
      * @methodOf
      * restaurantangular.controller:cartCtrl
      *
      * @description
      * Adds 1 to the quantity
      * 
      * @param {object} r the restaurant to add to
    */
    $scope.plus = function(r) {
        r.quantity += 1;
        $rootScope.totalitems += 1;
        $scope.cart.totalprice += parseInt(r.price);
        localStorage.setItem('cart',JSON.stringify(cart));
    };

    /**
      * @ngdoc method
      * @name cartCtrl#minus
      *
      * @methodOf
      * restaurantangular.controller:cartCtrl
      *
      * @description
      * Subtracts 1 from the quantity
      * 
      * @param {object} r the restaurant to subtract from
    */
    $scope.minus = function(r) {
        r.quantity -= 1;  
        $rootScope.totalitems -= 1;
        $scope.cart.totalprice -= parseInt(r.price);
        localStorage.setItem('cart',JSON.stringify(cart));
    };

    /**
      * @ngdoc method
      * @name cartCtrl#remove
      *
      * @methodOf
      * restaurantangular.controller:cartCtrl
      *
      * @description
      * Removes the restaurant from the cart
      * 
      * @param {object} r the restaurant to remove
      * @param {int} index the restaurant index to splice from the array
    */
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

    /**
      * @ngdoc method
      * @name cartCtrl#checkout
      *
      * @methodOf
      * restaurantangular.controller:cartCtrl
      *
      * @description
      * Checks if the user is logged in
      * and checks out if true
    */
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

    /**
      * @ngdoc method
      * @name cartCtrl#empty
      *
      * @methodOf
      * restaurantangular.controller:cartCtrl
      *
      * @description
      * Empties the cart
    */
    $scope.empty = function() {
        $scope.cart.restaurants = [];
        $scope.cart.totalprice = 0;
        $rootScope.totalitems = 0;
        localStorage.setItem('cart',JSON.stringify({"restaurants":[]}));
    }
});