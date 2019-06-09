// shop
restaurantangular.controller('shopCtrl', function($scope,$rootScope,restaurants,services,searchdata){
    $scope.restaurants = restaurants;
    $scope.numPerPage = 3;
    $scope.currentPage = 1;
    
    $scope.filteredRestaurants = $scope.restaurants.slice(0, 3);
    $scope.pageChanged = function() {
        var startPos = ($scope.currentPage - 1) * 3;
        $scope.filteredRestaurants = $scope.restaurants.slice(startPos, startPos + 3);
    };

    // if there is searchdata from homepage 
    if (searchdata.search.searchname != "" ||
        searchdata.search.searchtastes != "" ||
        (searchdata.search.searchtype != "Type" && searchdata.search.searchtype != undefined)) {
            
        // console.log(searchdata.search);
        getRestaurants(searchdata.search.searchname,searchdata.search.searchtastes,searchdata.search.searchtype,services,$scope);
        searchdata.search.searchname = "";
        searchdata.search.searchtastes = "";
        searchdata.search.searchtype = "Type";
    }
    
    
    $scope.search = function() {
        // console.log($scope.searchform);
        getRestaurants($scope.searchform.searchname,$scope.searchform.searchtastes,$scope.searchform.searchtype,services,$scope);
    };
    
    var filteredArray = [];
    $scope.autocompleteRestaurants = {};
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

    $scope.fillTextbox = function (string, event) {
        var id = event.target.parentNode.parentNode.parentNode.children[0].id;
        $scope.searchform[id] = string;
        $scope.autocompleteRestaurants[id] = null;
    }

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
restaurantangular.controller('detailsCtrl', function($scope,data){
    $scope.data = data[0];
});


// functions
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