// shop
/**
  * @this vm
  * @ngdoc controller
  * @name restaurantangular.controller:shopCtrl
  *
  * @description
  * Controller for the shop page
*/
restaurantangular.controller('shopCtrl', function($scope,$rootScope,restaurants,services,searchdata){
    $scope.restaurants = restaurants;
    $scope.numPerPage = 3;
    $scope.currentPage = 1;
    
    $scope.filteredRestaurants = $scope.restaurants.slice(0, 3);
    /**
      * @ngdoc method
      * @name shopCtrl#pageChanged
      *
      * @methodOf
      * restaurantangular.controller:shopCtrl
      *
      * @description
      * Refilter pagination restaurants when page changed
    */
    $scope.pageChanged = function() {
        var startPos = ($scope.currentPage - 1) * 3;
        $scope.filteredRestaurants = $scope.restaurants.slice(startPos, startPos + 3);
    };

    // if there is searchdata from homepage 
    if (searchdata.search.searchname != "" ||
        searchdata.search.searchtastes != "" ||
        (searchdata.search.searchtype != "Type" && searchdata.search.searchtype != undefined)) {
            
        // console.log(searchdata.search);
        getRestaurants(
            searchdata.search.searchname,
            searchdata.search.searchtastes,
            searchdata.search.searchtype,
            services,
            $scope
        );
        searchdata.search.searchname = "";
        searchdata.search.searchtastes = "";
        searchdata.search.searchtype = "Type";
    }
    
    /**
      * @ngdoc method
      * @name shopCtrl#search
      *
      * @methodOf
      * restaurantangular.controller:shopCtrl
      *
      * @description
      * Searches for new restaurants
    */
    $scope.search = function() {
        // console.log($scope.searchform);
        getRestaurants(
            $scope.searchform.searchname,
            $scope.searchform.searchtastes,
            $scope.searchform.searchtype,
            services,
            $scope
        );
    };
    
    var filteredArray = [];
    $scope.autocompleteRestaurants = {};
    /**
      * @ngdoc method
      * @name shopCtrl#autocomplete
      *
      * @methodOf
      * restaurantangular.controller:shopCtrl
      *
      * @description
      * Autocomplete fields in the search bar
      * 
      * @param {object} searchform the search data
      * @param {object} event the event to know what field was clicked on
    */
    $scope.autocomplete = function (searchform, event) {
        var id = event.target.id;
        var output = [];
        searchform['searchname'] = searchform['searchname'] || "";
        searchform['searchtastes'] = searchform['searchtastes'] || "";
        target = id.substring(6);

        if (searchform[id] != ""){
            if (Object.keys($scope.autocompleteRestaurants).length == 0) {
            $scope.autocompleteRestaurants[id] = restaurants;
            } else {
            $scope.autocompleteRestaurants[id] = filteredArray;
            filteredArray = [];
            }
            
            angular.forEach(restaurants,function(r){
                if (searchform['searchtype'] == "Type" || searchform['searchtype'] ==  undefined){
                    if (r['name'].toLowerCase().startsWith(searchform['searchname'].toLowerCase()) && 
                        r['tastes'].toLowerCase().startsWith(searchform['searchtastes'].toLowerCase())) {
                    filteredArray.push(r);
                    output.push(r[target]);
                    }
                } else {
                    if (r['name'].toLowerCase().startsWith(searchform['searchname'].toLowerCase()) &&
                        r['type'] == searchform['searchtype'] &&
                        r['tastes'].toLowerCase().startsWith(searchform['searchtastes'].toLowerCase())) {
                    filteredArray.push(r);
                    output.push(r[target]);
                    }
                }
            });
            $scope.autocompleteRestaurants[id] = output;
        } else {
            $scope.autocompleteRestaurants[id] = null;
        }
    }

    /**
      * @ngdoc method
      * @name shopCtrl#fillTextbox
      *
      * @methodOf
      * restaurantangular.controller:shopCtrl
      *
      * @description
      * Fills the field with the autocompleted info
      * 
      * @param {string} string the autocompleted string
      * @param {object} event the field in question
    */
    $scope.fillTextbox = function (string, event) {
        var id = event.target.parentNode.parentNode.parentNode.children[0].id;
        $scope.searchform[id] = string;
        $scope.autocompleteRestaurants[id] = null;
    }

    /**
      * @ngdoc method
      * @name shopCtrl#addToCart
      *
      * @methodOf
      * restaurantangular.controller:shopCtrl
      *
      * @description
      * Add the restaurant the cart
      * 
      * @param {object} r the restaurant
    */
    $scope.addToCart = function(r) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        var exists = false;
        angular.forEach(cart.restaurants, function(res){
            if (res.id == r.id){
                res.quantity += 1;
                $rootScope.totalitems += 1;
                exists = true;
            }
        });
        if (!exists){
            r.quantity = 1;
            $rootScope.totalitems += 1;
            cart.restaurants.push(r);
        }
        console.log(cart);
        localStorage.setItem('cart',JSON.stringify(cart));
    }
});

// details
/**
  * @this vm
  * @ngdoc controller
  * @name restaurantangular.controller:detailsCtrl
  *
  * @description
  * Controller for the shop details page
*/
restaurantangular.controller('detailsCtrl', function($scope,data){
    $scope.data = data[0];
});


// functions

/**
  * @ngdoc method
  * @name shopCtrl#buildURL
  *
  * @methodOf
  * restaurantangular.controller:shopCtrl
  *
  * @description
  * Builds the get variables to send to PHP
  * based on the param array
  *
  * @param {array} array the search info
  * @return {string} url completed extension
*/
function buildURL(array){
    var url = "";
    for (const field in array) {
        if (array.hasOwnProperty(field)) {
            const value = array[field];
            if (value != undefined && value != 'Type' && value != '')
                url += `${field}-${value}/`;
        }
    }
    return url;
}

/**
  * @ngdoc method
  * @name shopCtrl#getRestaurants
  *
  * @methodOf
  * restaurantangular.controller:shopCtrl
  *
  * @description
  * Sends GET request to restaurants depending on search info
  *
  * @param {string} name restaurant name
  * @param {string} tastes restaurant tastes
  * @param {string} type restaurant type
  * @param {object} services the services functions, since this is outside of the controller (im not sure why)
  * @param {object} $scope same as above
*/
function getRestaurants(name,tastes,type,services,$scope){
    var data = {
        "name": name, 
        "tastes": tastes, 
        "type": type
    };
    // console.log(data);
    var extension = buildURL(data);
    // console.log(extension);
    services.get('restaurants', extension).then(function (response) {
        $scope.restaurants = response;
        $scope.filteredRestaurants = $scope.restaurants.slice(0, 3);
        if (response.length == 1)
            location.href = `#/shop/${response[0].id}`
        // console.log(extension);
    });
}