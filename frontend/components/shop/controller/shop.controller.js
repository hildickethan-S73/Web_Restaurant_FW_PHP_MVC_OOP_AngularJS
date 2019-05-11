// shop
restaurantangular.controller('shopCtrl', function($scope,restaurants,services,searchdata){
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
        // console.log(extension);
    });
}